import { getAttachmentByID } from "@/actions/attachments";
import Loader from "@/components/Loader";
import React, { Suspense } from "react";
import EditAttachmentPage from "../_components/EditAssignment";

export default async function Page({ params }: { params: { id: string } }) {
  const attachment = await getAttachmentByID(params.id);

  return (
    <Suspense fallback={<Loader />}>
      <EditAttachmentPage attachment={attachment} />
    </Suspense>
  );
}
