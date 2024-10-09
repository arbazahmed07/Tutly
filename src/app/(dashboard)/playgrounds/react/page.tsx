import getCurrentUser from "@/actions/getCurrentUser";
import ReactPlayground from "./ReactPlayground";

const page = async () => {
  const currentUser = await getCurrentUser();

  return <ReactPlayground currentUser={currentUser} />;
};

export default page;
