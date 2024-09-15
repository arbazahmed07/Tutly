"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useRouter();
  router.push("/instructor/statistics/0878eafa-880d-4cea-b647-e1656df1cc9d");
  return <div>No course found</div>;
}

export default page;
