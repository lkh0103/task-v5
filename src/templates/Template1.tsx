import React, { useEffect, useState } from 'react'
import { RouteObject, useRoutes } from 'react-router';
import useRequestWithState from '../hooks/useRequest';
import useTitle from '../hooks/useTitle';
import Course from './layouts/Course';
import Courses from './layouts/Courses';
import CoursesIndex from './layouts/CoursesIndex';
import Home from './layouts/Home';
import Layout from './layouts/Layout';
import Nomatch from './layouts/Nomatch';

export default function Template1() {

    const { api, loading, error } = useRequestWithState()
    const [search, setSearch] = useState('')
    const [param, setParam] = useState('posts')

    useEffect(() => {
        loadUser()
    }, [param])

    useTitle('React project')

    const loadUser = () => {
        api('https://jsonplaceholder.typicode.com/', param)
            .then((e) => {
                console.log('success', e)
            })
            .catch(console.error)
    }

    if (loading) return <div>Loading</div>
    if (error) return <h1>{error}</h1>

    const routes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: "/courses",
                    element: <Courses />,
                    children: [
                        { index: true, element: <CoursesIndex /> },
                        { path: "/courses/:id", element: <Course /> },
                    ],
                },
                { path: "*", element: <Nomatch /> },
            ],
        },
    ];

    const element = useRoutes(routes);

    return (
        <div>
            <h1>Route Objects Example</h1>

            <p>
                ABC
            </p>

            <p>
                React Router exposes a <code>useRoutes()</code> hook that allows you to
                hook into the same matching algorithm that <code>&lt;Routes&gt;</code>{" "}
                uses internally to decide which <code>&lt;Route&gt;</code> to render.
                When you use this hook, you get back an element that will render your
                entire route hierarchy.
            </p>

            <input value={search} onChange={(e) => {
                setSearch(e.target.value)
            }} />
            <button onClick={(e) => {
                setParam(search)
            }}>Search</button>

            {element}

        </div>
    )
}
