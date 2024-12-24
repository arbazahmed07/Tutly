import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { FaCertificate, FaRegCheckCircle } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

type GenerateProps = {
  user: { username: string; name: string };
};

export default function Generate({ user }: GenerateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const images = Array.from(document.querySelectorAll("img"));
    const imagePromises = images.map((img) => {
      return new Promise<void>((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
        }
      });
    });

    Promise.all(imagePromises).then(() => setIsImageLoaded(true));
  }, []);

  const downloadImage = async () => {
    if (!certificateRef.current) {
      console.error("Certificate reference not found.");
      return;
    }

    if (!isImageLoaded) {
      console.log("Images not fully loaded yet.");
      return;
    }

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "Certificate.png";
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <div>
      <div className="relative">
        <div
          onClick={downloadImage}
          className="absolute top-0 right-0 bg-blue-900 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#3949ab] transition duration-200 space-x-2"
        >
          <span>
            <FaDownload />
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div
          ref={certificateRef}
          id="certificate"
          className="relative w-full max-w-4xl aspect-[1.414/1] border-2 bg-white border-gray-300 rounded-lg overflow-hidden shadow-lg p-8"
        >
          <div className="absolute bottom-8 left-8 text-4xl text-gray-300 font-bold opacity-80 transform">
            <span>Tutly</span>
          </div>

          <div className="absolute inset-0 p-5">
            <div className="absolute -top-80 -left-40 w-1/3 h-full bg-blue-900 rotate-45"></div>
            <div className="absolute -top-96 -left-40 w-1/3 h-full bg-yellow-500 rotate-45"></div>

            <div className="text-center space-y-6">
              <img src="/logo.png" alt="Tutly Logo" className="w-40 mx-auto mb-6 mt-10" />
              <h1 className="text-4xl font-extrabold text-blue-900 flex items-center justify-center">
                <FaCertificate className="mr-3 text-4xl" /> CERTIFICATE OF COMPLETION
              </h1>
              <p className="text-xl font-semibold text-gray-600">Presented by Tutly</p>
              <p className="text-lg text-gray-800 font-semibold md:mx-10 md:my-5">
                This certificate is awarded to{" "}
                <span className="font-bold text-xl uppercase text-blue-900">{user?.name}</span> for
                successfully completing the MERN Full Stack Development course. We congratulate his
                accomplishment and wish them success in their future endeavors as a skilled MERN
                stack developer.
              </p>
              <div className="mt-4 text-green-600 flex justify-center items-center space-x-2">
                <FaRegCheckCircle className="text-3xl" />
                <p className="font-semibold text-xl">Course Completion Verified</p>
              </div>
            </div>
            <div className="absolute -bottom-80 -right-40 w-1/3 h-full bg-yellow-500 rotate-45"></div>
            <div className="absolute -bottom-96 -right-40 w-1/3 h-full bg-blue-900 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
