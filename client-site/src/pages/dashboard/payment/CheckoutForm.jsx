/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
  const CheckoutForm = ({refetch,payInfo, setIsModalOpen}) => {
    const {user} = useAuth()
    const [clientSecret, setClientSecret] = useState("");
    const [transactionsId, setTransactionsId] = useState('')
    const {_id,campName,campFees,participantName,participantEmail,confirmationStatus} = payInfo;
    const axiosSecure = useAxiosSecure()
    const [error,setError] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const [paymentLoading,setPaymentLoading] = useState(false)


   const price = campFees
    useEffect(() => {
    // Create PaymentIntent as soon as the page loads
     axiosSecure.post('/create-payment-intent', {price})
     .then(res=>{
      setClientSecret(res.data.clientSecret)
     })
    }, [axiosSecure,price]);


  
    const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
      setPaymentLoading(true)
      setError('')

  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        setPaymentLoading(false)
        setError(error.message);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }
        // Confirm Payment Method =============
         const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || participantName || 'anonymous',
                name: user?.displayName || participantEmail || 'anonymous' ,
              }
            }
         }); 
         if (confirmError) {
          console.log(confirmError);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          setPaymentLoading(true)
          toast.success('Your payment has been processed.')
          setTransactionsId(paymentIntent.id)
          const paymentData = {
            paymentId: _id,
            campName: campName,
            campFees: campFees,
            name: user?.displayName || participantName,
            email: user?.email || participantEmail,
            transactionsId: paymentIntent.id,
            paymentStatus: 'paid',
            confirmationStatus: confirmationStatus,
            notifyDate: new Date()
          }
          setTimeout(async()=>{
            await axiosSecure.post('/payments', paymentData) 
            await axiosSecure.patch(`/payments/${_id}`,{paymentStatus: 'paid'})
            .then(()=> refetch())
            setIsModalOpen(false)
          },1000)
        } 
    };
  
  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
        <CardElement
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
        <p className="text-red-500 text-left text-sm mt-4">{error}</p>
        {transactionsId && 
          <p className="text-green-500 text-left text-sm mt-4">Your transaction id:   {transactionsId}</p>
        }
         <div className="flex justify-end gap-5 mt-2 pt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded border"
          >
            Cancel
          </button>
          <button  
            type="submit"
            disabled={!stripe || !clientSecret || paymentLoading}
            className={`px-2 md:px-4 py-1 text-sm  font-medium  rounded  outline-none ${!stripe || !clientSecret ? 'bg-slate-400 text-slate-50' : 'text-white bg-primary hover:bg-secondary'}`}
          >
            {paymentLoading? 'Please wait...': 'Go to Payment'}
          </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CheckoutForm;
