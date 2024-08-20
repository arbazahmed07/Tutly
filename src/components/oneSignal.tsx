"use client"
import OneSignal from "react-onesignal";
import { useEffect } from "react";

function Onesignal() {
        useEffect(() => {
        const loadOneSignal = async () => {
        try {
            console.log("Loading OneSignal SDK...");
            await OneSignal.init({
            appId: process.env.NEXT_PUBLIC_ONE_SIGNAL!,
            allowLocalhostAsSecureOrigin: true,
            });

            console.log("OneSignal has been successfully initialized.");
            OneSignal.Slidedown.promptPush();
        } catch (error) {
            console.error("Error initializing OneSignal:", error);
        }
        };

        // Check if OneSignal SDK is already loaded
        if (!window.OneSignal) {
        const script = document.createElement('script');
        script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
        script.async = true;
        script.onload = loadOneSignal;
        script.onerror = () => console.error("Error loading OneSignal SDK script.");
        document.head.appendChild(script);
        } else {
        loadOneSignal();
        }

        // Cleanup function
        return () => {
        console.log("Cleaning up OneSignal...");
        // Optionally, you can call OneSignal.logout() if you need to clear the user session
        // OneSignal.logout();
        };
    }, []);
  return (
    <div>
    </div>
  )
}

export default Onesignal