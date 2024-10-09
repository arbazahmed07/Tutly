import React, { Suspense } from "react";
import NewAttachmentPage from "./_components/NewAttachmentPage";
import Loader from "@/components/Loader";

const page = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <NewAttachmentPage />
    </Suspense>
  );
};

export default page;
