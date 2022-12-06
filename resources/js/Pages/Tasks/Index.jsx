import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from '@inertiajs/inertia-react';
import Input from '@/Components/Input';

export default function TaskIndex(props) {
    const { tasks } = usePage().props

    const isVisibleTask = (task) => {
        const taskName = task.title.toLocaleLowerCase()
        return taskName.includes(searchName)
    }
    
    const [searchName, setSearchName] = useState('')

    const handleTermSearch = (e) => {
        console.log(e)
        const valueTerm = e.target.value.toLocaleLowerCase()
        setSearchName(valueTerm)
    }

    function destroy(e) {
        if (confirm("Are you sure you want to delete this record?")) {
            Inertia.delete(route("tasks.destroy", e.currentTarget.id));
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                            <Input
                                type="text"
                                className="w-full px-4 py-2"
                                label="Search"
                                name="search"
                                value={searchName}
                                handleChange={handleTermSearch}
                                placeholder="Search Title"
                             />
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={ route("tasks.create") }
                                >
                                    Create Task
                                </Link>
                            </div>
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Todo</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => isVisibleTask(task) &&  (
                                        <tr>
                                            <td className="border px-4 py-2">{ task.title }</td>
                                            <td className="border px-4 py-2">{ task.todo }</td>
                                            <td className="border px-4 py-2">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("tasks.edit", task.id)}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={destroy}
                                                    id={task.id}
                                                    tabIndex="-1"
                                                    type="button"
                                                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {tasks.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No record found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
