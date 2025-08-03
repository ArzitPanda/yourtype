import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Crown, Sparkles, ArrowRight, Shield, Clock, CreditCard } from "lucide-react";
import { load } from "@cashfreepayments/cashfree-js";
import { useState, useEffect } from "react";
import { supabase } from "@/components/context/SupabaseContext";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid'

function generateOrderId(prefix = "order") {
  const rawId = uuidv4().replace(/-/g, '') // remove hyphens from UUID
  const shortId = rawId.slice(0, 20) // trim to desired length
  return `${prefix}-${shortId}` // example: order-5e2b0cf3b2e445bc8c29
}

type Feature = {
  text: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  price: string;
  total_attempt: number;
  features: string;
  recommended?: boolean;
};

type ProcessedPlan = {
  id: string;
  title: string;
  price: string;
  features: Feature[];
  recommended?: boolean;
  totalAttempts: number;
};

// Order/Checkout Page Component
const OrderPage = ({ plan, onBack }: { 
  plan: ProcessedPlan; 
  onBack: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
console.log(plan)
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data && data.user) {
        setCustomerDetails({
          name: data.user.user_metadata?.full_name || "",
          email: data.user.email || "",
          phone: data.user.phone || ""
        });
      }
    };
    fetchUser();
  }, []);

  const handleCheckout = async () => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      alert("Please fill in all required details");
      return;
    }

    setIsLoading(true);
    
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      if (!token) {
        alert("Please log in to proceed with payment.");
        setIsLoading(false);
        return;
      }
        const orderID = generateOrderId()
      const response = await fetch(
        "https://vibgjtjlevdtvqlbntlr.supabase.co/functions/v1/CASHFREE-ORDER",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: orderID,
            customer_id: "cust_" + Date.now(),
            customer_name: customerDetails.name,
            customer_email: customerDetails.email,
            customer_phone: customerDetails.phone,
            return_url:window.location.origin+ "/return-url?orderId="+orderID,
            plan_id: plan.id,
          }),
        }
      );
        console.log(response)
      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const   data = await response.json();
      console.log(data)

      const cashfree = await load({ mode: "sandbox" });

     
      const {payment_session_id,order_id}  = data;

      Cookies.set('order-id',order_id)
      
      cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_self",

      });


    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white mb-4 transition-colors"
          >
            ← Back to Plans
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Complete Your Order</h1>
          <p className="text-purple-200">You're just one step away from getting started</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            
            {/* Selected Plan */}
            <div className="bg-gradient-to-r from-pink-500 to-violet-600 rounded-xl p-6 text-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{plan.title}</h3>
                {plan.recommended && (
                  <div className="flex items-center gap-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                    <Crown className="w-3 h-3" />
                    Popular
                  </div>
                )}
              </div>
              <p className="text-pink-100 mb-4">{plan.totalAttempts} attempts included</p>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                <span className="text-pink-200">/month</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white mb-3">What's included:</h4>
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  {feature.included ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                  <span className={feature.included ? 'text-purple-100' : 'text-purple-300 line-through'}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="w-6 h-6 text-green-400" />
                  <span className="text-xs text-purple-200">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <span className="text-xs text-purple-200">Instant Access</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                  <span className="text-xs text-purple-200">Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Your Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-purple-200 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-white placeholder-purple-300"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-purple-200 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-white placeholder-purple-300"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-purple-200 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-white placeholder-purple-300"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Payment total */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                <div className="flex justify-between items-center text-lg font-bold text-white">
                  <span>Total Amount:</span>
                  <span className="text-pink-400">₹{plan.price}</span>
                </div>
                <p className="text-sm text-purple-200 mt-1">Billed monthly • Cancel anytime</p>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Complete Payment - ₹{plan.price}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>

              <p className="text-xs text-purple-300 text-center">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy. 
                Your payment is secured by 256-bit SSL encryption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Pricing Card Component
const PricingCard = ({ plan }: { plan: ProcessedPlan }) => {
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (showOrderPage) {
    return (
      <OrderPage 
        plan={plan} 
        onBack={() => setShowOrderPage(false)}
      />
    );
  }

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ease-out transform ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowOrderPage(true)}
    >
      {/* Glow effect for recommended plan */}
      {plan.recommended && (
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
      )}
      
      <div
        className={`relative h-full rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
          plan.recommended
            ? "border-pink-300/50 bg-gradient-to-br from-white/20 via-white/10 to-white/5 text-white shadow-2xl shadow-pink-500/25"
            : "border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white shadow-xl hover:shadow-2xl"
        } ${isHovered ? 'shadow-2xl' : ''}`}
      >
        {/* Recommended badge */}
        {plan.recommended && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm px-4 py-1.5 rounded-full font-bold shadow-lg">
              <Crown className="w-4 h-4" />
              Most Popular
            </div>
          </div>
        )}

        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 rounded-2xl"></div>
        
        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 text-white">
              {plan.title}
            </h3>
            <p className="text-sm text-purple-200">
              {plan.totalAttempts} attempts included
            </p>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center">
              <span className={`text-5xl font-extrabold ${
                plan.recommended 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent' 
                  : 'text-pink-400'
              }`}>
                ₹{plan.price}
              </span>
              <span className="text-lg ml-1 text-purple-200">
                /month
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                {feature.included ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                )}
                <span className={`text-sm ${
                  feature.included 
                    ? 'text-purple-100'
                    : 'text-purple-300 line-through'
                }`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            className={`w-full text-base py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
              plan.recommended
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black shadow-yellow-300"
                : "bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              Get Started with {plan.title}
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
          
          <p className="text-xs text-center mt-3 text-purple-200">
            No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const PricingScreen = () => {
  const [plans, setPlans] = useState<ProcessedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('plan')
        .select('*')
        .order('price', { ascending: true });

      if (error) {
        throw error;
      }

      const processedPlans: ProcessedPlan[] = data?.map((plan: Plan, index: number) => {
        // Split features by period and create feature objects
        const featureTexts = plan.features.split('.').filter(f => f.trim() !== '');
        const features: Feature[] = featureTexts.map(text => ({
          text: text.trim(),
          included: true // Assuming all features from DB are included
        }));

        return {
          id: plan.id || `plan_${index}`,
          title: plan.name,
          price: plan.price.toString(),
          features,
          totalAttempts: plan.total_attempt,
          recommended: index === 1, // Mark middle plan as recommended
        };
      }) || [];

      setPlans(processedPlans);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to load plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <Button 
            onClick={fetchPlans}
            className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-xl text-purple-200">Select the perfect plan for your needs</p>
        </div>
        
        {plans.length > 0 ? (
          <div className={`grid gap-8 ${
            plans.length === 1 ? 'max-w-md mx-auto' :
            plans.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
            'md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white">
            <p className="text-lg">No plans available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingScreen;