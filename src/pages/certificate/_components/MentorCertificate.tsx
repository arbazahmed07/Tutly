'use client'

import { useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Loader2 } from 'lucide-react';

type GenerateProps = {
  user: { username: string; name: string };
};

export default function MentorCertificate({ user }: GenerateProps) {
  const [isLoading, setIsLoading] = useState(false);

  const downloadCertificate = () => {
    const certificateElement = document.getElementById("certificate");
    if (!certificateElement) return;

    setIsLoading(true);
    html2canvas(certificateElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${user?.name}_Certificate.png`;
        link.click();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <AlertDialog open={isLoading}>
        <AlertDialogContent className="flex items-center justify-center">
          <AlertDialogDescription className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            Download in progress...
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        onClick={downloadCertificate}
        className="mb-4"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Downloading...
          </>
        ) : (
          "Download Certificate"
        )}
      </Button>

      <div
        id="certificate"
        className="relative w-[800px] h-[566px] mx-auto"
      >
        <img
          src="/mentor_template.png"
          alt="Certificate"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold uppercase text-black w-[70%]">
          {user?.name}
        </div>
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-lg font-medium text-[#333] w-[75%] leading-relaxed">
          This certificate is proudly presented to{" "}
          <span className="font-bold">{user?.name}</span>, 
          for their exceptional mentorship and guidance. 
          Their dedication and support have played a vital 
          role in empowering students and fostering their learning journey.
        </div>

        <div className="absolute top-[70%] left-16 flex flex-col items-center">
          <img src="/signature.png" alt="Signature" className="w-40 h-auto" />
          <p className="text-sm font-bold text-gray-600">Rajesh Thappeta</p>
          <p className="text-xs text-gray-600">Course Instructor</p>
        </div>
        <div className="absolute top-[88%] left-1/2 transform -translate-x-1/2 text-center text-sm font-semibold text-[#555]">
          Presented by <span className="text-blue-900">Tutly</span>
        </div>
      </div>
    </div>
  );
}

