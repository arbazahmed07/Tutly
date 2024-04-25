
import getCurrentUser from "@/actions/getCurrentUser";
import UserProfile from "./Profile";


const formatDate = (e: string) => {
    const date = new Date(e);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
}

const Page = async () => {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return <div className="text-center">Sign in to view profile!</div>
    }

    return (
        <UserProfile currentUser={currentUser} />
    );
}

export default Page;