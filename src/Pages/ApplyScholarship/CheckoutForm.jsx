import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm({ applicationData, scholarship, user }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate form data
    if (!applicationData.phone || !applicationData.applicantPhoto || !applicationData.gender || 
        !applicationData.applyingDegree || !applicationData.sscResult || !applicationData.hscResult ||
        !applicationData.village || !applicationData.district || !applicationData.country) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
        setIsLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful, now save the application
        await saveApplication(paymentIntent.id);
      }
    } catch (error) {
      toast.error('An error occurred during payment processing');
      console.error(error);
      setIsLoading(false);
    }
  };

  const saveApplication = async (paymentIntentId) => {
    try {
      // Fetch user data to get user_id
      const userResponse = await fetch(`https://schoolarship-management-system-serv.vercel.app/users/${user.email}`);
      const userData = await userResponse.json();

      // Prepare application data
      const completeApplicationData = {
        // Form data
        phone: applicationData.phone,
        applicantPhoto: applicationData.applicantPhoto,
        address: {
          village: applicationData.village,
          district: applicationData.district,
          country: applicationData.country
        },
        gender: applicationData.gender,
        applyingDegree: applicationData.applyingDegree,
        sscResult: parseFloat(applicationData.sscResult),
        hscResult: parseFloat(applicationData.hscResult),
        studyGap: applicationData.studyGap || 'No gap',
        
        // Scholarship details (read-only fields)
        universityName: scholarship.university_name,
        scholarshipCategory: scholarship.scholarship_category,
        subjectCategory: scholarship.subject_category,
        
        // User information
        userName: user.displayName || user.email,
        userEmail: user.email,
        userId: userData._id,
        
        // Scholarship ID
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.scholarship_name,
        
        // Application metadata
        applicationDate: new Date().toISOString(),
        status: 'pending',
        applicationFee: scholarship.application_fees,
        paymentIntentId: paymentIntentId,
        paymentStatus: 'paid'
      };

      // Save to database
      const response = await fetch('https://schoolarship-management-system-serv.vercel.app/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeApplicationData),
      });

      if (!response.ok) {
        throw new Error('Failed to save application');
      }

      const result = await response.json();

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted Successfully!',
        text: 'Your scholarship application has been submitted. You will be notified once it is reviewed.',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'View My Applications'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user-dashboard/my-applications');
        } else {
          navigate('/scholarships');
        }
      });

      setIsLoading(false);
    } catch (error) {
      toast.error('Payment succeeded but failed to save application. Please contact support.');
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe Payment Card Element */}
      <div className="bg-white p-6 rounded-lg border-2 border-gray-300 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Card Information
        </label>
        <PaymentElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all duration-200 ${
          isLoading || !stripe || !elements
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
            Processing Payment...
          </div>
        ) : (
          `Pay $${scholarship.application_fees} and Submit Application`
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to pay the application fee and submit your application for review.
      </p>
    </form>
  );
}
