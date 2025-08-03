import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/components/context/SupabaseContext";
import { toast ,Toaster} from "sonner";


const CreateLinkScreen = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState("");

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
      toast("Your unique link is ready");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast("Link copied to clipboard.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1F002A] to-[#3B0066] p-6">
      <Toaster />
      <Card className="w-full max-w-lg text-white bg-[#2A003D] border border-purple-900 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">Generate Shareable Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={generateLink}
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? "Generating..." : "Create Unique Link"}
          </Button>
          {link && (
            <div className="flex items-center gap-2">
              <Input readOnly value={link} className="text-black bg-white" />
              <Button variant="ghost" onClick={copyToClipboard}>
                <Copy size={18} />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateLinkScreen;