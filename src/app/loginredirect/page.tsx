import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const LoginRedirect = dynamic(() => import("./LoginRedirect"), {
  ssr: false,
});

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginRedirect />
    </Suspense>
  );
};

export default page;
