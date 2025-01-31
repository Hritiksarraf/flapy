"use client";

import { useState, useEffect, useCallback } from "react";
import { Trophy, Crown, Medal } from "lucide-react";
import axios from "axios";

export default function Home() {
const [visibleUsers, setVisibleUsers] = useState(5);
const [users, setUsers] = useState([]);

const getUsers= useCallback(async()=>{
    try {
        const response = await axios.get("/api/getAllUser");
        if(!response.data.success){
            console.log("failed to fetch user")
            return;
        }
        setUsers(response.data.users);
        console.log(response.data.users);
    } catch (error) {
        console.log("failed to fetch user")
    }
},[])   

useEffect(() => {
    getUsers();
}, [getUsers]);

const getRankIcon = (rank) => {
    switch (rank) {
    case 1:
        return <Trophy className="w-6 h-6 text-yellow-500 animate-pulse" />;
    case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
    default:
        return null;
    }
};
let i=0;

return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <Crown className="w-16 h-16 text-red-500 animate-bounce" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent animate-gradient">
                    Leaderboard
                </h1>
                <p className="text-gray-400">Compete with the players of NITK</p>
            </div>

            {users.length > 0 && (
                <div className="hidden md:flex justify-center items-end gap-4 mb-12 h-48">
                {/* Second Place */}
                    <div className="w-1/4 h-32 bg-gradient-to-t from-gray-800 to-gray-700 rounded-t-lg relative group hover:cursor-pointer">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-gray-400 text-white text-3xl font-bold uppercase bg-gradient-to-r from-gray-500 to-gray-300 group-hover:scale-110 transition-transform">
                                {users[1].name[0]}
                            </div>
                        </div>
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                            <p className="font-bold text-gray-300">{users[1].name}</p>
                            <p className="text-gray-400">{users[1].score.toLocaleString()}</p>
                        </div>
                    </div>
                
                    {/* First Place */}
                    <div className="w-1/3 h-40 bg-gradient-to-t from-red-900 to-red-700 rounded-t-lg relative group hover:cursor-pointer">
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                            <div className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-yellow-500 text-white text-4xl font-bold uppercase bg-gradient-to-r from-yellow-500 to-yellow-300 group-hover:scale-110 transition-transform">
                                {users[0].name[0]}
                            </div>
                        </div>
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                            <p className="font-bold text-white">{users[0].name}</p>
                            <p className="text-yellow-300">{users[0].score.toLocaleString()}</p>
                        </div>
                    </div>
                
                    {/* Third Place */}
                    <div className="w-1/4 h-24 bg-gradient-to-t from-amber-900 to-amber-800 rounded-t-lg relative group hover:cursor-pointer">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                            <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-amber-600 text-white text-3xl font-bold uppercase bg-gradient-to-r from-amber-600 to-amber-400 group-hover:scale-110 transition-transform">
                            {users[2].name[0]}
                            </div>
                        </div>
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                            <p className="font-bold text-amber-200">{users[2].name}</p>
                            <p className="text-amber-300">{users[2].score.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Leaderboard Table */}
            <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-red-900/20 rounded-lg text-sm font-semibold backdrop-blur-sm">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-7">Player</div>
                    <div className="col-span-4 text-right">Score</div>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                    <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        Loading leaderboard...
                    </div>
                )}

                {users.slice(0, visibleUsers).map((user) => (
                    <div
                        key={i++}
                        className={`
                            grid grid-cols-12 gap-4 px-6 py-4 rounded-lg
                            ${user.rank <= 3 
                            ? `bg-gradient-to-r ${
                                user.rank === 1 
                                    ? 'from-red-950/50 to-red-900/30' 
                                    : user.rank === 2 
                                    ? 'from-gray-900/50 to-gray-800/30'
                                    : 'from-amber-950/50 to-amber-900/30'
                                }`
                            : 'bg-zinc-900/50'
                            }
                            hover:bg-red-900/20 transition-all duration-300
                            border border-transparent hover:border-red-500
                            backdrop-blur-sm
                            transform hover:scale-102 hover:-translate-y-1
                            hover:cursor-pointer
                        `}
                    >
                        {/* Rank */}
                        <div className="col-span-1 flex items-center gap-2">
                            {getRankIcon(user.rank)}
                            <span className={`
                                ${user.rank === 1 ? 'text-yellow-500' : ''}
                                ${user.rank === 2 ? 'text-gray-400' : ''}
                                ${user.rank === 3 ? 'text-amber-600' : ''}
                                font-bold text-lg
                            `}>
                                #{user.rank}
                            </span>
                        </div>

                        {/* Player Info */}
                        <div className="col-span-7 flex items-center space-x-4">
                            <div
                                className={`
                                    w-12 h-12 rounded-full flex items-center justify-center text-white
                                    font-bold text-lg uppercase shadow-md
                                    ${user.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                                    user.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-300' :
                                    user.rank === 3 ? 'bg-gradient-to-r from-amber-600 to-amber-500' :
                                    'bg-gradient-to-r from-red-500 to-red-400'}
                                `}
                                >
                                {user.name[0]}
                            </div>
                            <div>
                                <span className="font-semibold block">{user.name}</span>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="col-span-4 flex items-center justify-end">
                            <span className="font-mono text-lg font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                                {user?.score ? user.score.toLocaleString() : "0"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {users?.length > 0 && visibleUsers < users?.length && (
            <button
                onClick={() => setVisibleUsers(prev => prev + 5)}
                className="
                mt-8 w-full py-3 rounded-lg
                bg-gradient-to-r from-red-700 to-red-600
                hover:from-red-600 hover:to-red-500
                text-white font-semibold
                transition-all duration-300
                focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black
                transform hover:scale-105
                flex items-center justify-center space-x-2
                shadow-lg shadow-red-500/20
                "
            >
                <span>Show More</span>
                <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            )}
        </div>
    </div>
);
}