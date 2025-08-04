import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Crown, Sparkles, ArrowRight, Shield, Clock, CreditCard, X } from "lucide-react";
import { load } from "@cashfreepayments/cashfree-js";
import { useState, useEffect } from "react";
import { supabase } from "@/components/context/SupabaseContext";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid'
import BackButton from "./BackButton";

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

// Order Modal Component
const OrderModal = ({ 
  plan, 
  isOpen, 
  onClose 
}: { 
  plan: ProcessedPlan | null; 
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen]);

  const handleCheckout = async () => {
    if (!plan) return;
    
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

  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl shadow-2xl border border-purple-500/20 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group"
        >
          <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
              <Sparkles className="w-4 h-4" />
              Complete Your Order
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Almost There!</h2>
            <p className="text-purple-200">You're just one step away from getting started</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Order Summary
              </h3>
              
              {/* Selected Plan */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-5 text-white mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold">{plan.title}</h4>
                    {plan.recommended && (
                      <div className="flex items-center gap-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                        <Crown className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                  </div>
                  <p className="text-purple-100 mb-3">{plan.totalAttempts} attempts included</p>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">₹{plan.price}</span>
                 
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                <h5 className="font-semibold text-white mb-3">What's included:</h5>
                {plan.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {feature.included ? (
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-purple-100' : 'text-purple-300 line-through'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
                {plan.features.length > 4 && (
                  <p className="text-xs text-purple-300 mt-2">+{plan.features.length - 4} more features</p>
                )}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t border-white/10">
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-xs text-purple-200">Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-xs text-purple-200">Instant</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <span className="text-xs text-purple-200">Flexible</span>
                </div>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-400" />
                Your Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-white placeholder-purple-300 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-white placeholder-purple-300 text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-white placeholder-purple-300 text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Payment total */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/30">
                  <div className="flex justify-between items-center text-lg font-bold text-white">
                    <span>Total Amount:</span>
                    <span className="text-purple-300">₹{plan.price}</span>
                  </div>
                  <p className="text-xs text-purple-200 mt-1">Billed monthly • Cancel anytime</p>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Complete Payment - ₹{plan.price}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                <p className="text-xs text-purple-300 text-center leading-relaxed">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy. 
                  Your payment is secured by 256-bit SSL encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Pricing Card Component
const PricingCard = ({ plan }: { plan: ProcessedPlan }) => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={`relative group cursor-pointer transition-all duration-300 ease-out transform ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowOrderModal(true)}
      >
        {/* Glow effect for recommended plan */}
        {plan.recommended && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300 animate-pulse"></div>
        )}
        
        <div
          className={`relative h-full rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
            plan.recommended
              ? "border-purple-400/50 bg-gradient-to-br from-slate-900/90 via-purple-950/90 to-slate-900/90 text-white shadow-xl shadow-purple-500/20"
              : "border-white/10 bg-gradient-to-br from-slate-900/80 via-purple-950/50 to-slate-900/80 text-white shadow-lg hover:shadow-xl hover:border-purple-400/30"
          } ${isHovered ? 'shadow-2xl shadow-purple-500/30' : ''}`}
        >
          {/* Recommended badge */}
          {plan.recommended && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                <Crown className="w-3 h-3" />
                Popular
              </div>
            </div>
          )}

          <div className="relative p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2 text-white">
                {plan.title}
              </h3>
              <p className="text-sm text-purple-300">
                {plan.totalAttempts} attempts
              </p>
            </div>

            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center">
                <span className={`text-3xl font-bold ${
                  plan.recommended 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent' 
                    : 'text-purple-300'
                }`}>
                  ₹{plan.price}
                </span>
              
              </div>
            </div>

            {/* Features - Show only first 3 */}
            <div className="space-y-2 mb-6">
              {plan.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  {feature.included ? (
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
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
              {plan.features.length > 3 && (
                <p className="text-xs text-purple-400 text-center mt-2">
                  +{plan.features.length - 3} more features
                </p>
              )}
            </div>

            {/* CTA Button */}
            <Button
              className={`w-full text-sm py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                plan.recommended
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>
            
            <p className="text-xs text-center mt-3 text-purple-400">
              Cancel anytime
            </p>
          </div>
        </div>
      </div>

      <OrderModal 
        plan={plan}
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      />
    </>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <Button 
            onClick={fetchPlans}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 py-8 px-4">
   
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            Pricing Plans
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Select the perfect plan for your needs and start your journey today
          </p>
        </div>
        
        {plans.length > 0 ? (
          <div className={`grid gap-6 ${
            plans.length === 1 ? 'max-w-sm mx-auto' :
            plans.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' :
            'md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
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