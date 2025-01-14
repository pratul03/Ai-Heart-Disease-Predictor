import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Fetch all users from the database
async function fetchUsers() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function DashboardPage() {
  // Get the user session
  const session = await getServerSession(authOptions);

  // Redirect to login if the user is not authenticated
  if (!session) {
    redirect("/login");
  }

  // Fetch all users
  const users = await fetchUsers();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Welcome to the Global Dashboard, {session.user?.name}!</h1>
        {/* Profile Button */}
        <Link href="/profile">
          <Avatar style={{ cursor: "pointer" }}>
            <AvatarImage
              src={session.user?.image || "/avatars/default1.png"}
              alt={session.user?.name || "User"}
            />
            <AvatarFallback>
              {session.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>

      {/* User Table */}
      <Table>
        <TableCaption>List of all users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user._id} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.sex}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Logout Button */}
      <div style={{ marginTop: "20px" }}>
        <LogoutButton />
      </div>
    </div>
  );
}
