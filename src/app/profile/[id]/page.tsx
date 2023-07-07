import Link from "next/link";
import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p2-2">
      <h1 className="text-center text-2xl">
        Profile Page <span className="p-2 rounded bg-orange-300 ml-2">{params.id}</span>
      </h1>
      <hr />
      <p className="text-4xl"></p>
      <Link href={"/login"}>Login</Link>
      <Link href={"/signup"}>Visit Signup</Link>
    </div>
  );
}
