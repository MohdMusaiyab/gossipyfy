import { getUser } from "@/actions/user/getUser";
import UpdateUsernameForm from "../../components/profile/UpdateUsernameForm";
import UpdateUserEmailForm from "../../components/profile/UpdateUserEmailForm";
import UpdateUserPasswordForm from "../../components/profile/UpdateUserPasswordForm";
import YourNotes from "../../components/profile/YourNotes";
import SingleVoiceNote from "../../components/Notes/SingleVoiceNote";
const ProfilePage = async () => {
  const user = await getUser(); // Fetch the user data
  
  if (!user) {
    return <div>No user data found</div>; // Handle case where user is not found
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">Profile Page</h1>

      {/* Display user's basic information */}
      <p className="mt-4">
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      {/* Render the UpdateUsernameForm and pass the current username */}
      <UpdateUsernameForm currentUsername={user.username} />
      <UpdateUserEmailForm currentEmail={user.email} />
      <UpdateUserPasswordForm />
      <YourNotes />
      </div>
  );
};

export default ProfilePage;