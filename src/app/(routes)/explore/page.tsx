import React from "react";
import SideBar from "../../components/SideBar";
import { getServerSession } from "next-auth"; // Import getServerSession
import { NextPage } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Premium from "@/app/components/Premium";
import Free from "@/app/components/Free";

const page = async() => {
  const session =  await getServerSession(authOptions);
  const isPremium = session?.user?.isPremium || false;



  return (
    <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar */}
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <SideBar />
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-8">
      {isPremium ? <Premium /> : <Free />}
    </main>
  </div>
  );
};

export default page;
