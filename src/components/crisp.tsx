'use client'
import React, { useEffect } from 'react';

function CrispChatIntegration() {
  useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
        window.$crisp=[];
        window.CRISP_WEBSITE_ID="0f6c8db7-1314-4057-b152-28ff30d1d935";
        (function(){
            var d=document;
            var s=d.createElement("script");
            s.src="https://client.crisp.chat/l.js";
            s.async=1;
            d.getElementsByTagName("head")[0].appendChild(s);
        })();
        `;
        document.head.appendChild(script);

        return () => {
        document.head.removeChild(script);
        };
    }, []);

    return <></>;
}

export default CrispChatIntegration;
