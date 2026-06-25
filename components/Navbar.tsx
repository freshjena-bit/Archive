import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto p-4 flex justify-between">

	<Link href="/admin">
	  Admin
	</Link>
	
	<Link href="/dashboard">
	  Dashboard
	</Link>
	
	<Link href="/upload">
	  Upload
	</Link>

        <Link
          href="/"
          className="font-bold text-2xl"
        >
          Repository
        </Link>

        <UserMenu />

      </div>
    </header>
  );
}
