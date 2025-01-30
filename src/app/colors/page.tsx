'use client'
import React, { useState } from 'react'

export default function Colors() {
    const [color, setColor] = useState("#000000");
    const [mode, setMode] = useState("hex");
    const colorarr = ['A', 'B', 'C', 'D', 'E', 'F', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const changeColor = () => {
        if (mode === "hex") {
            hexcolorgen();
        } else {
            rgbacolorgen();
        }
    }
    const changeMode = () => {
        if (mode === "hex") {
            setMode("rgba");
        } else {
            setMode("hex");
        }
    }

    const hexcolorgen = () => {
        let hex = "#";
        for (let i = 0; i < 6; i++) {
            hex += colorarr[Math.floor(Math.random() * colorarr.length)];
        }
        setColor(hex);
        console.log(hex);
    }
    const rgbacolorgen = () => {
        let r = Math.abs(Math.round(Math.random() * 255));
        let g = Math.abs(Math.round(Math.random() * 255));
        let b = Math.abs(Math.round(Math.random() * 255));
        let hex = `rgba(${r}, ${g}, ${b}, 1)`;
        setColor(hex);
        console.log(hex);

    }
    return (
        <>
            <div className='text-white m-2 p-2 flex flex-col items-center justify-center' style={{ backgroundColor: color }}>
                <h1 className='mb-10 text-4xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent'>Ramdom Color Changer</h1>
                <h1 className='text-2xl font-bold'>Current Color Mode: {mode}</h1>
                <h1 className='text-2xl font-bold'>Current Color: {color}</h1>
                <button className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={changeMode}>Change Mode</button>
                <button className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={changeColor}>Change Color</button>
            </div>
        </>
    )
}
