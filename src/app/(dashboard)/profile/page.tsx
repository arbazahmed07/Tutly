import getCurrentUser from "@/actions/getCurrentUser";
import UserProfile from "./Profile";
import Image from "next/image";

const formatDate = (e: string) => {
  const date = new Date(e);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12;

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
};

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <div className="">
        <div className="mt-16 text-center text-3xl font-semibold">
          Sign in to view profile!
        </div>
        <div className="px-5 py-3 contrast-100 saturate-150">
          <Image
            unoptimized
            alt="sign in image"
            src="https://i.postimg.cc/hGR0Vw8f/forgot-password-concept-illustration-114360-1123.jpg"
            width={500}
            height={500}
            className="mx-auto mt-4 rounded-md"
          />
        </div>
      </div>
    );
  }

  return <UserProfile currentUser={currentUser} />;
};

export default Page;
