import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Link2, Users, Sparkles, Share2, Heart } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/components/context/SupabaseContext";
import { toast, Toaster } from "sonner";
import BackButton from "../components/BackButton";

const CreateLinkScreen = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = async () => {
    setLoading(true);
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user?.email) {
      toast("Session not found");
      setLoading(false);
      return;
    }
    
    const userEmail = session.user.email;
    const { data: authuser, error: authError } = await supabase
      .from("authuser")
      .select("authuser_id")
      .eq("email", userEmail)
      .single();
      
    if (authError || !authuser) {
      toast("User not found");
      setLoading(false);
      return;
    }
    
    const uuid = uuidv4();
    const finalUrl = `${window.location.origin}/user-name?requestId=${uuid}`;
    setRequestId(uuid);
    setLink(finalUrl);
    
    const { error: insertError } = await supabase.from("usersimilarity").insert([
      {
        initiated_by: authuser.authuser_id,
        for_whom: null,
        similarity_result: null,
        response: null,
        order_id: null,
        request_id: uuid,
      },
    ]);
    
    if (insertError) {
      toast("Failed to insert record");
    } else {
      toast("Your unique link is ready ✨");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast("Link copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 p-6 relative overflow-hidden">
      <Toaster />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-indigo-500/10 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        
        {/* Moving gradient lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-indigo-400/30 to-transparent animate-pulse animation-delay-1500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-pink-400/40 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-16 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce animation-delay-500"></div>
        <div className="absolute bottom-32 left-20 w-2.5 h-2.5 bg-indigo-400/40 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-bounce animation-delay-1500"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Link2 className="w-8 h-8 text-pink-400 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Create Your Vibe Link ✨
            </h1>
          </div>
          <p className="text-pink-300/80 text-lg mb-6">
            Generate that main character energy and see who's really compatible with your personality 💅
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center space-x-2 bg-pink-900/30 backdrop-blur-sm border border-pink-500/30 rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-pink-400" />
              <span className="text-pink-300 text-sm">Find Your Twin</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2">
              <Heart className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm">Instant Match</span>
            </div>
            <div className="flex items-center space-x-2 bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/30 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-300 text-sm">AI Powered</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="w-full text-white bg-pink-900/20 backdrop-blur-sm border border-pink-500/30 shadow-2xl hover:shadow-pink-500/10 transition-all duration-500">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-white flex items-center justify-center space-x-2">
              <Share2 className="w-6 h-6 text-pink-400" />
              <span>Generate Your Link</span>
            </CardTitle>
            <p className="text-pink-300/70 text-sm mt-2">
              One click to create, one link to rule them all 👑
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Generate Button */}
            <Button
              onClick={generateLink}
              className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold py-4 text-lg rounded-full shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
              disabled={loading}
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating that perfect link...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Create Your Unique Link</span>
                  </>
                )}
              </div>
            </Button>

            {/* Link Display Section */}
            {link && (
              <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-pink-500/20">
                <div className="text-center">
                  <p className="text-pink-300 text-sm mb-2">Your link is ready to slay! ✨</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Input 
                    readOnly 
                    value={link} 
                    className="flex-1 text-black bg-white/95 border-pink-300/50 rounded-lg font-mono text-sm"
                  />
                  <Button 
                    variant="ghost" 
                    onClick={copyToClipboard}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      copied 
                        ? 'bg-green-500/20 border-green-400/50 text-green-400' 
                        : 'hover:bg-pink-500/20 border-pink-400/30 text-pink-400 hover:text-pink-300'
                    } border`}
                  >
                    <Copy size={18} className={copied ? 'animate-pulse' : ''} />
                  </Button>
                </div>
                
                {/* Success message */}
                <div className="text-center">
                  <p className="text-pink-300/80 text-xs">
                    Share this with your bestie and see if y'all are actually compatible 💫
                  </p>
                </div>
              </div>
            )}

            {/* How it works section */}
            <div className="mt-8 p-4 bg-purple-900/20 rounded-2xl border border-purple-500/20">
              <h3 className="text-purple-300 font-semibold mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>How it works bestie:</span>
              </h3>
              <div className="space-y-2 text-sm text-purple-300/80">
                <div className="flex items-start space-x-2">
                  <span className="text-pink-400 font-bold">1.</span>
                  <span>Generate your unique personality link</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-pink-400 font-bold">2.</span>
                  <span>Send it to whoever you want to vibe check</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-pink-400 font-bold">3.</span>
                  <span>Get instant personality compatibility results</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom floating text */}
        <div className="text-center mt-6 opacity-60">
          <p className="text-pink-300/60 text-sm">
            no cap, this is about to be iconic fr fr ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkScreen;