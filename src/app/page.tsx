'use client'
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [divColor, setDivColor] = useState("");
  const [password, setPassword] = useState(false);
  const [typed, setTyped] = useState("");

  const showPassword = () => {
    setPassword(!password);
  };

  const changeColor = (e: any) => {
    setDivColor(e.target.value);
  };
  const typefunc = (e: any) => {
    setTyped(e.target.value);
  }

  return (
    <>
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
            className="w-48 h-10 border-2 border-teal-500 rounded-lg px-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
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
              type={password ? "text" : "password"}
              placeholder="Enter Password"
              aria-label="Password"
            />
            <div
              className="absolute top-2 right-3 text-teal-500 cursor-pointer"
              onClick={showPassword}
              aria-label="Toggle Password Visibility"
            >
              {password ? <Eye /> : <EyeOff />}
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
            onChange={typefunc}
            placeholder="Type anything"
            className="w-48 h-10 border-2 border-teal-500 rounded-lg px-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </label>
        <p className="text-white text-2xl">You Typed: {typed}</p>
      </div>
    </>
  );
}
