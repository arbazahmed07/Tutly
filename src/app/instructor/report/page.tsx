import { getEnrolledCourses } from '@/actions/courses'
import NoDataFound from '@/components/NoDataFound';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const courses = await getEnrolledCourses();

  if (!courses?.[0]?.id) {
    return <NoDataFound message="Oops! No enrolled courses found" />;
  }

  redirect(`/instructor/report/${courses[0].id}`);
};

export default page