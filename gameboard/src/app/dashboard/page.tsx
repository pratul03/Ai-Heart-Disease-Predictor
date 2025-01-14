import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";

export default async function DashboardPage() {
  // Get the user session
  const session = await getServerSession(authOptions);

  // Redirect to login if the user is not authenticated
  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Welcome to the Dashboard, {session.user?.name}!</h1>
      <p>Your email: {session.user?.email}</p>

      <div>
        <h2>Your Badges</h2>
        {/* Add badge display logic here */}
      </div>

      <div>
        <h2>Your Profile</h2>
        {/* Add profile information here */}
      </div>
      <LogoutButton />
    </div>
  );
}
