import Header from "@/components/Header";
import UserProfile from "./(components)/UserProfile";


export default async function UserProfilePage({params}: {params: Promise<{username: string}>}){

    try {
      const username = (await params).username
  
      console.log(username)
      return(
  
          <div>
              <div>
                  <Header />
              </div>
              
              <UserProfile username={username}/>
              
          </div>
      )
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">User not found</h1>
        </div>
      );
      
    }

}