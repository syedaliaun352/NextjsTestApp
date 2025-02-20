'use client';

import { Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { User } from "firebase/auth";
import { onAuthStateChange, firebaseSignOutUser } from "./firebase";
import { GlobalContext } from "./GlobalContext";

export default function Home() {
  const { data: githubUser } = useSession();
  const [divColor, setDivColor] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const { isLoading, setIsLoading } = useContext(GlobalContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDivColor(e.target.value);
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyped(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChange((user) => {
      setFirebaseUser(user)
      setIsLoading(false)
    })


  }, [])

  return (
    <>
      {/* firebase login info */}
      {!isLoading && firebaseUser && (
        <div className="flex items-center space-x-4 p-2">
          <div>
            <p className="text-base font-semibold text-white">
              User ID: {firebaseUser?.uid}
            </p>
            <p className="text-sm text-gray-300">
              Email: {firebaseUser?.email}
            </p>
            <button
              onClick={() => firebaseSignOutUser()}
              className="mt-2 duration-300 cursor-pointer hover:bg-gray-800 p-2 w-full text-white rounded border border-teal-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* github login info */}
      {githubUser && (
        <div className="flex items-center space-x-4 p-2">
          <Image
            src={githubUser?.user?.image || ""}
            alt="User Profile"
            width={54}
            height={54}
            className="rounded-full"
          />
          <div>
            <p className="text-base font-semibold text-white">
              {githubUser?.user?.name}
            </p>
            <p className="text-sm text-gray-300">
              {githubUser?.user?.email}
            </p>
            <button
              onClick={() => signOut()}
              className="mt-2 duration-300 cursor-pointer hover:bg-gray-800 p-2 w-full text-white rounded border border-teal-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      <div className="p-4 m-4 flex flex-col justify-center items-center space-y-4">
        <label
          htmlFor="divcolor"
          className="text-white font-medium flex flex-col items-start"
        >
          Color:
          <input
            type="text"
            name="divcolor"
            value={divColor}
            onChange={changeColor}
            placeholder="Enter Color"
            className="w-48 h-10 border-2 border-teal-500 rounded-lg px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </label>
        <div
          className="w-52 h-52 border-2 border-teal-400 duration-300 shadow-lg shadow-teal-500 rounded-lg"
          style={{ backgroundColor: divColor }}
        ></div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 mt-6">
        <label
          htmlFor="password"
          className="text-white font-medium flex flex-col items-start"
        >
          Password:
          <div className="relative w-96">
            <input
              className="w-full h-10 border-2 border-teal-500 rounded-lg px-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter Password"
              aria-label="Password"
            />
            <div
              className="absolute top-2 right-3 text-teal-500 cursor-pointer"
              onClick={togglePasswordVisibility}
              aria-label="Toggle Password Visibility"
            >
              {passwordVisible ? <Eye /> : <EyeOff />}
            </div>
          </div>
        </label>
      </div>

      <div className="p-4 m-4 flex flex-col justify-center items-center space-y-4">
        <label
          htmlFor="typed"
          className="text-white font-medium flex flex-col items-start"
        >
          Type:
          <input
            type="text"
            name="typed"
            value={typed}
            onChange={handleType}
            placeholder="Type anything"
            className="w-48 h-10 border-2 border-teal-500 rounded-lg px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </label>
        <p className="text-white text-2xl">You Typed: {typed}</p>
      </div>
    </>
  );
}
