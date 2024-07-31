import { useEffect, useState } from "react";
import axios from "axios"


function Repos({repos_url}) {

    const [repos,setRepos]=useState([])

    const fetchRepos= async()=>{
        try {
            let response= await axios.get(repos_url)
            let repositories=response.data;

            console.log(repositories)

        setRepos(repositories);

        } catch (error) {
            console.log(error);
        }
    }   
    useEffect(()=>{
        if(repos_url){
            fetchRepos();
        }
    
    },[repos_url])
    
    return(
        <>
           <div className=" dark:text-white w-3/5 flex justify-center">
    <ul className="divide-y ">
        {repos.map((item) => (
            <li key={item.id} className="py-4 border-2 border-gray-600 dark:border-green-500 p-3 rounded-md my-3">
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <a href={item.html_url} target="_blank"><div className="text-lg  dark:text-green-400 font-bold hover:underline">{item.name}</div></a>
                        <div className="flex space-x-2">
                            <span className="text-sm bg-slate-600 text-white dark:bg-emerald-800 rounded-md p-1">Language: {item.language || "unknown"}</span>
                            <span className="text-sm">Stars: {item.stargazers_count}</span>
                            <span className="text-sm">Forks: {item.forks}</span>
                            <span className="text-sm">Watchers: {item.watchers}</span>
                        </div>
                    </div>
                    <div className="text-sm">Description: {item.description || "none"}</div>
                </div>
            </li>
        ))}
    </ul>
</div>

        </>
    )
}

export default Repos