import { useState } from "react";
import html2canvas from "html2canvas";

type GenerateProps = {
  user: { username: string; name: string };
};

export default function Generate({ user }: GenerateProps) {
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
      {isLoading && (
        <div className="fixed inset-0 bg-black text-white font-bold text-lg bg-opacity-50 flex items-center justify-center z-50">
         Download in progreess...
        </div>
      )}
      <button
        onClick={downloadCertificate}
        className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Downloading..." : "Download Certificate"}
      </button>
      <div
        id="certificate"
        className="relative w-[800px] h-[566px] mx-auto border border-gray-400"
      >
        <img
          src="/gold_template.png"
          alt="Certificate"
          className="w-full h-full object-cover"
        />
        {/* <img src="/silver_template.png" alt="Certificate" className="w-full h-full object-cover" /> */}
        {/* <img src="/bronze_template.png" alt="Certificate" className="w-full h-full object-cover" /> */}
        <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold uppercase text-black w-[70%]">
          {user?.name}
        </div>
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-lg font-medium text-[#333] w-[75%] leading-relaxed">
          This certificate is awarded to{" "}
          <span className="font-bold">{user?.name}</span>, bearing roll number{" "}
          <span className="font-bold">{user?.username}</span>, for successfully
          completing the Web Development Course (MERN Stack). We recognize
          their dedication and hard work in acquiring the skills necessary for
          modern web development.
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
