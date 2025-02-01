'use client'

import React, { useState } from 'react'

interface Task {
    item: string
    id: string
}

export default function Page() {
    const [task, setTask] = useState<string>('')
    const [tasks, setTasks] = useState<Task[]>([])

    const addTask = () => {
        if (task.trim() === '') return;

        const newTask: Task = {
            item: task,
            id: Date.now().toString()
        }
        setTasks([...tasks, newTask])
        setTask('')
    }

    const deleteTask = (id: string) => {
        const updatedTask = tasks.filter((i) => i.id !== id)
        setTasks(updatedTask)
    }

    return (
        <div className="m-2 p-2 flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl font-bold mb-4">Todo List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
                className="w-96 h-10 p-2 rounded-full border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4"
            />
            <button
                onClick={addTask}
                className="mb-4 p-2 border border-teal-500 w-40 rounded-full hover:bg-teal-700 transition-colors cursor-pointer"
            >
                Add Task
            </button>
            <h2 className="text-2xl font-bold mt-5 mb-2">Your Tasks:</h2>
            <ul className="w-full max-w-xl">
                {tasks.map((item: Task) => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between text-xl bg-gray-700 rounded-lg p-3 mb-2"
                    >
                        <span>{item.item}</span>
                        <button
                            onClick={() => deleteTask(item.id)}
                            className="p-2 border border-teal-500 rounded-full hover:bg-teal-700 transition-colors cursor-pointer"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
