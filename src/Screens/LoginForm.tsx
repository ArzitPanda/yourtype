import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2, FastForward } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/components/context/SupabaseContext';
import { useNavigate } from 'react-router';

// Assumes supabase client is already initialized and available globally
// Replace with your actual import: import { supabase } from './supabaseClient'


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user &&  user.is_anonymous===false  ) {
        // If already logged in, redirect
        setIsCheckingAuth(true);
        navigate('/dashboard');
      }
    };

    checkUser();
  }, [navigate]);

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess('Login successful! Redirecting to dashboard...');
        
        // Store remember me preference - using in-memory storage for demo
        if (rememberMe) {
          // localStorage.setItem('rememberMe', 'true');
          console.log('Remember me preference saved');
        }
        
        // Redirect to dashboard
        setTimeout(() => {
          // window.location.href = '/dashboard';
          console.log('Redirecting to dashboard...');
        }, 1500);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');
    setIsGoogleLoading(true);

    try {
       await supabase.auth.signOut(); 
    
    const { error:authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account', 
        }
      }
    });

      if (authError) {
        setError(authError.message);
      } else {
        setSuccess('Redirecting to Google...');
      }
    } catch (err) {
      setError('Failed to initialize Google login. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setError('');
    setSuccess('Password reset link will be sent to your email.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Modern geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-32 bg-gradient-to-b from-purple-400/20 to-transparent rotate-12"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-24 bg-gradient-to-b from-indigo-400/20 to-transparent -rotate-12"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      <Card className="w-full max-w-md border-0 bg-slate-900/80 backdrop-blur-xl shadow-2xl relative z-10">
        {/* Subtle border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-indigo-500/20 rounded-2xl blur-sm"></div>
        <div className="absolute inset-[1px] bg-slate-900/90 rounded-2xl"></div>
        
        <div className="relative z-10 p-8">
          <CardHeader className="space-y-6 text-center pb-8 px-0">
            {/* Type.fun Logo */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <div className="text-white font-bold text-xl">T</div>
            </div>
            
            <div className="space-y-3">
              <CardTitle className="text-3xl font-light tracking-wide text-white">
                Welcome to Type.fun
              </CardTitle>
              <CardDescription className="text-slate-400 font-light text-base">
                The fastest way to improve your typing skills
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8 px-0">
            {error && (
              <div className="flex items-start gap-3 p-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="flex items-start gap-3 p-4 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{success}</span>
              </div>
            )}

            {/* Primary Google Login Button */}
            <div className="space-y-4">
              <Button
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || isLoading}
                className="w-full h-14 bg-white hover:bg-gray-50 text-gray-900 font-medium transition-all duration-200 shadow-xl hover:shadow-2xl rounded-xl border-0 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg className="mr-3 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>
              
              <p className="text-center text-sm text-slate-400">
                Quick and secure - start typing in seconds
              </p>
            </div>

           
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;