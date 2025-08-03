import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Cookies from 'js-cookie';
import { supabase } from '@/components/context/SupabaseContext';



const PaymentSuccessPage = () => {
  const location = useLocation();
  const [message, setMessage] = useState('🔄 Verifying your payment...');

  // Extract order_id from query param
  const queryParams = new URLSearchParams(location.search);
  const order_id = queryParams.get('orderId');

  useEffect(() => {
    if (!order_id) {
      setMessage('❌ No order ID found.');
      return;
    }

    const verifyPayment = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();

        if (error || !sessionData?.session?.access_token) {
          setMessage('❌ Not authenticated.');
          return;
        }

        const token = sessionData.session.access_token;

        const response = await fetch(
          `https://vibgjtjlevdtvqlbntlr.supabase.co/functions/v1/get-order-service?order_id=${order_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              // CORS headers (generally handled by the Supabase function)
            },
          }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data?.error || 'Unknown error occurred');
        }

        if (data?.status === 'success') {
          setMessage('✅ Payment verified successfully! Redirecting...');
          Cookies.remove('order_id');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1500);
        } else {
          setMessage('❌ Payment failed or not completed.');
        }
      } catch (err) {
        console.error('Verification error:', err.message);
        setMessage('❌ Failed to verify payment.');
      }
    };

    verifyPayment();
  }, [order_id]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.2rem',
      }}
    >
      <h2>{message}</h2>
    </div>
  );
};

export default PaymentSuccessPage;
