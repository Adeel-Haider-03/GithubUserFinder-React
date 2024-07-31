import Repos from "./Repos";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const savedTheme=localStorage.getItem('darkMode')==='true';;

  const [darkMode, setDarkMode] = useState(savedTheme);
  

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  let toggleTheme=()=>{
      setDarkMode((prev)=>{
        const newMode=!prev;
        localStorage.setItem('darkMode',newMode)
        return newMode;
        })
    }
  


  const searchProfile = async () => {
    try {
      setLoading(true);
      let url = `https://api.github.com/users/${username}`;
      let response = await axios.get(url);

      let user = response.data;
      if (user === null) {
        throw new Error('No user found');
      }

      console.log(user);
      setUserData(user);
      toast.success("User Found", {
        theme: "light",
        autoClose: 2000,
      });

    } catch (error) {
      console.log(error.response.data.message);
      toast.error("User Not Found");
    } finally {
      setLoading(false);
    }
    setUsername("")
  };

  return (
    <>
      <div className="min-h-screen text-black dark:text-white flex flex-col items-center mb-0 dark:bg-black">
        <div className="flex items-center ">
          <img src="./GitHub_(4).png" alt="GitHub Logo" className="w-20 h-20 rounded-full dark:bg-white mr-4 my-3" />
          <h1 className="text-4xl dark:text-white font-bold my-3">GitHub User Finder</h1>
        </div>
        <div className="mt-5 flex flex-col items-center max-w-md text-center">
          <input
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 px-36 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 text-white dark:focus:ring-emerald-500"
            onKeyDown={(event)=>{if(event.key==='Enter'){searchProfile()}}}
          />
          <button
            onClick={searchProfile}
            className="mt-3 px-6 py-2 bg-black text-white dark:bg-green-700 hover:bg-slate-600 dark:hover:bg-emerald-500 rounded-md focus:outline-none focus:ring-2"
          >
            Search
          </button>
        </div>
        
        {loading && (
          <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
          <svg className="h-20 w-20 animate-spin stroke-black dark:stroke-white" viewBox="0 0 256 256">
              <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
              <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
              <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
              <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="24"></line>
              <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
              <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
              </line>
          </svg>
          <span class="text-4xl font-medium text-gray-500">Loading...</span>
      </div>
        )}
        
          {userData && (
        <div className="mt-10 w-full max-w-2xl border-2 border-gray-600 dark:border-emerald-500 rounded-lg">
            <div className="p-5 rounded-lg shadow-lg">
              <div className="flex">
                <div className="flex flex-col items-center">
                  <img src={userData.avatar_url} alt="User Avatar" className="w-40 h-40 rounded-full my-2" />
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-4 py-2 bg-black text-white dark:bg-green-700 hover:bg-slate-600 dark:hover:bg-green-600 rounded-md"
                  >
                    View Profile
                  </a>
                </div>
                <div className="ml-6 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row sm:gap-4 mb-2">
                    <span className="text-white bg-slate-500 dark:bg-emerald-800 rounded-md p-2">Followers: {userData.followers}</span>
                    <span className="text-white bg-slate-500 dark:bg-emerald-800 rounded-md p-2">Following: {userData.following}</span>
                    <span className="text-white bg-slate-500 dark:bg-emerald-800 rounded-md p-2">Repos: {userData.public_repos}</span>
                    <span className="text-white bg-slate-500 dark:bg-emerald-800 rounded-md p-2">Gists: {userData.public_gists}</span>
                  </div>
                  <h5><span className="text-black dark:text-green-400 font-bold">Name: </span>{userData.name || "Not Specified"}</h5>
                  <h5><span className="text-black dark:text-green-400 font-bold">Bio: </span>{userData.bio || "Not Specified"}</h5>
                  <h5><span className="text-black dark:text-green-400 font-bold">Company: </span>{userData.company || "Not specified"}</h5>
                  <h5><span className="text-black dark:text-green-400 font-bold">Created At: </span>{new Date(userData.created_at).toLocaleDateString()}</h5>
                  <h5><span className="text-black dark:text-green-400 font-bold">Location: </span>{userData.location || "Not specified"}</h5>
                  <h5><span className="text-black dark:text-green-400 font-bold">Blog: </span>{userData.blog ? <a href={`${"https://"+userData.blog}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{userData.blog}</a> : "Not specified"}</h5>
                </div>
              </div>
            
            </div>
        </div>
          )}
      </div>
      {userData && (
                <div className="flex flex-col items-center dark:bg-black">
                <h1 className="sm:text-4xl font-bold dark:text-white mb-8">Repositories</h1>
                  <Repos repos_url={userData.repos_url} />
                            </div>
          
      )}
          
              
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

<button className=" absolute w-16 h-16 top-10 right-10 bg-black dark:bg-white rounded-full text-white dark:text-black font-semibold"
  onClick={toggleTheme}
>{darkMode?"light":"dark"}</button>
    </>
  );
}

export default Search;
