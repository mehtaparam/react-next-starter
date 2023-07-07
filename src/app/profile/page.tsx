import Link from "next/link";
import React from "react";

export default function ProfilePage() {
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p2-2">
      <h1 className="text-center text-2xl">Profile Page</h1>
      <hr />

      <Link href={"/login"}>Login</Link>
      <Link href={"/signup"}>Visit Signup</Link>
    </div>
  );
}
