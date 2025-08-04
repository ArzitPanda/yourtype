import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsAndPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <Card className="bg-black/40 backdrop-blur-xl border-purple-700/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-light text-purple-300">
              Terms & Conditions — urtype.fun
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p><strong>Last Updated:</strong> August 4, 2025</p>
                <p>Welcome to <strong>urtype.fun</strong>! By using our website and services, you agree to these Terms & Conditions. Please read them carefully.</p>

                <Separator className="bg-purple-700/30" />

                <h3 className="text-lg font-semibold text-purple-200">1. About urtype.fun</h3>
                <p>urtype.fun is an entertainment-based web application where users can answer fun questions to discover their personality type and compare results with others. This service is for fun only and is not a substitute for professional advice.</p>

                <h3 className="text-lg font-semibold text-purple-200">2. Eligibility</h3>
                <p>You must be at least 13 years old to use urtype.fun. If under 18, you must have a parent or guardian’s consent.</p>

                <h3 className="text-lg font-semibold text-purple-200">3. User Conduct</h3>
                <p>You agree not to use the site for unlawful purposes, upload harmful content, or attempt to hack the service.</p>

                <h3 className="text-lg font-semibold text-purple-200">4. Results & Accuracy</h3>
                <p>Our quizzes are for fun only and have no scientific validity. We do not guarantee accuracy.</p>

                <h3 className="text-lg font-semibold text-purple-200">5. Accounts & Security</h3>
                <p>Some features may require an account. You are responsible for keeping your credentials secure.</p>

                <h3 className="text-lg font-semibold text-purple-200">6. Intellectual Property</h3>
                <p>All content is owned by urtype.fun. You may not copy or reuse without permission.</p>

                <h3 className="text-lg font-semibold text-purple-200">7. Disclaimer & Limitation of Liability</h3>
                <p>We provide urtype.fun “as is” without warranties. We are not liable for damages from use.</p>

                <h3 className="text-lg font-semibold text-purple-200">8. Changes</h3>
                <p>We may update these Terms at any time. Check this page for the latest version.</p>

                <h3 className="text-lg font-semibold text-purple-200">9. Contact</h3>
                <p>Email us at <a href="mailto:support@urtype.fun" className="text-purple-400 underline">support@urtype.fun</a></p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border-purple-700/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-light text-purple-300">
              Privacy Policy — urtype.fun
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p><strong>Last Updated:</strong> August 4, 2025</p>
                <p>At <strong>urtype.fun</strong>, your privacy matters to us. Here’s how we handle your information.</p>

                <Separator className="bg-purple-700/30" />

                <h3 className="text-lg font-semibold text-purple-200">1. Information We Collect</h3>
                <p>We may collect account details, your quiz answers, and technical data like IP addresses.</p>

                <h3 className="text-lg font-semibold text-purple-200">2. How We Use Your Information</h3>
                <p>We use your data to provide services, generate results, and improve urtype.fun.</p>

                <h3 className="text-lg font-semibold text-purple-200">3. Sharing Your Information</h3>
                <p>We do not sell your data. We may share with service providers or legal authorities if required.</p>

                <h3 className="text-lg font-semibold text-purple-200">4. Cookies & Tracking</h3>
                <p>We use cookies for login sessions, quiz progress, and traffic analytics.</p>

                <h3 className="text-lg font-semibold text-purple-200">5. Data Security</h3>
                <p>We take reasonable steps to protect data but cannot guarantee 100% security.</p>

                <h3 className="text-lg font-semibold text-purple-200">6. Your Choices</h3>
                <p>You can request account deletion, opt out of marketing, or disable cookies.</p>

                <h3 className="text-lg font-semibold text-purple-200">7. Children’s Privacy</h3>
                <p>We do not knowingly collect data from children under 13.</p>

                <h3 className="text-lg font-semibold text-purple-200">8. Changes</h3>
                <p>We may update this policy at any time. Check this page for the latest version.</p>

                <h3 className="text-lg font-semibold text-purple-200">9. Contact</h3>
                <p>Email us at <a href="mailto:privacy@urtype.fun" className="text-purple-400 underline">privacy@urtype.fun</a></p>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default TermsAndPolicy;
