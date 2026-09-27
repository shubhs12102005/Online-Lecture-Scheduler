import axios from 'axios'
import React, { useEffect } from 'react'

const Courses = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_API;


    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${apiUrl}/course`)
            console.log(res);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [])

    return (
        <div>Courses</div>
    )
}

export default Courses