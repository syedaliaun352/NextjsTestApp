'use client'
import React, { useEffect, useState } from 'react'
import { getOptimalTurn } from 'tic-tac-toe-optimal-turn'

export default function Tictactoe() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    const handleClick = (n: number) => {
        if (squares[n] || calculateWinner(squares)) return
        const newSquares = [...squares]
        newSquares[n] = xIsNext ? "X" : "O"
        setSquares(newSquares)
        setXIsNext(false)
    }

    const calculateWinner = (squares: (string | null)[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
                return squares[a]
        }
        return null
    }

    const isDraw = squares.every(square => square !== null) && !calculateWinner(squares)

    const resetGame = () => {
        setSquares(Array(9).fill(null))
        setXIsNext(true)
    }

    const winner = calculateWinner(squares)
    const status = winner ? `Winner: ${winner}` : isDraw ? "Game Drawn!" : ''

    useEffect(() => {
        if (!xIsNext && !calculateWinner(squares) && squares.includes(null)) {
            const oi = getOptimalTurn({ playerSymbol: 'O', gameField: squares, boardSize: 3 })
            if (oi !== undefined && squares[oi] === null) {
                const newSquares = [...squares]
                newSquares[oi] = 'O'
                setSquares(newSquares)
                setXIsNext(true)
            }
        }
    }, [xIsNext, squares])

    return (
        <div className="flex flex-col justify-center items-center m-2 p-2 text-white bg-gray-transparent">
            <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text">Tic</span>
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Tac</span>
                <span className="bg-gradient-to-b from-green-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text">Toe</span>
            </h1>
            {[0, 1, 2].map(r => (
                <div key={r} className="flex row-center-3 w-auto h-auto justify-center text-2xl">
                    {[0, 1, 2].map(c => {
                        const i = r * 3 + c
                        return (
                            <button
                                key={i}
                                onClick={() => handleClick(i)}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded m-1 w-16 h-16 text-xl flex items-center justify-center"
                            >
                                {squares[i]}
                            </button>
                        )
                    })}
                </div>
            ))}
            <h1 className="text-3xl text-white mb-2 mt-4">{status}</h1>
            <button
                onClick={resetGame}
                className="mt-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
            >
                Reset
            </button>
        </div>
    )
}
