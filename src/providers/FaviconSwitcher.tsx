"use client";

import { useEffect } from "react";

const FaviconSwitcher = () => {
  useEffect(() => {
    const handleFocusBlur: (event: Event) => void = (event: Event) => {
      const favicon = document.querySelector(
        "link[rel~='icon']",
      ) as HTMLLinkElement;
      if (!favicon) return;

      if (event.type === "blur") {
        favicon.href = "/images/inActiveLogo.png";
      } else if (event.type === "focus") {
        // is active === true
        favicon.href = "/images/activeLogo.png";
      }
    };

    window.addEventListener("focus", handleFocusBlur);
    window.addEventListener("blur", handleFocusBlur);

    return () => {
      window.removeEventListener("focus", handleFocusBlur);
      window.removeEventListener("blur", handleFocusBlur);
    };
  }, []);

  return null;
};

export default FaviconSwitcher;
