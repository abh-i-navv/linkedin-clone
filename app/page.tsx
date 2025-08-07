"use client"
import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import UserInfo from "@/components/UserInfo";
import UserPost from "@/components/UserPost";
import { useSession } from "next-auth/react";


export default function Home() {
  const session = useSession();
  const user = session?.data?.user

  if(!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Please log in to view your profile</h1>
      </div>
    );
  }

  const data = {
    name: user.name!,
    bio: user.bio!
  }

  return (
    <>
      <header className="border-b sticky top-0 z-50 bg-white">
        <Header />
      </header>

      <main>
        <div className="grid grid-cols-8 mt-5 ">
          <section className="hidden md:inline md:col-span-2">
            {<UserInfo user={data}/>}
          </section>

          <section className="col-span-full md:col-span-4 mx-auto w-full">
            
            <PostForm />
            <UserPost />

          </section>
        </div>
      </main>
      <div>
      </div>
    </>
  );
}
