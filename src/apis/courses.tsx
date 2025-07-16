import axios from "axios";
import { toast } from "react-toastify";

export const countAllCourses = async (limit: number) => {
    const response = await axios.get('https://6537443cbb226bb85dd30234.mockapi.io/courses');
    return Math.floor(response.data.length / limit);
}

export const getCoursesByName = async (name: string) => {
    const url = new URL('https://6537443cbb226bb85dd30234.mockapi.io/courses');
    url.searchParams.append('name', name);
    const response = await axios.get(url.toString());

    if (response.status === 200) {
        return response.data;
    }
    else {
        toast.error(`No course with name = ${name} found!`,
            {
                position: "top-center",
            }
        );
    }
}

export const getPaginatedCoursesAndSort = async (page: number, limit: number, fieldname: string, value: string) => {
    const url = new URL('https://6537443cbb226bb85dd30234.mockapi.io/courses');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append(fieldname, value);

    const response = await axios.get(url.toString());

    if (response.status === 200) {
        return response.data;
    }
    else {
        toast.error(`No course with ${fieldname} = ${value} found!`,
            {
                position: "top-center",
            }
        );
    }
}

export const getCoursesByViews = async (limit: number) => {
    const url = new URL('https://6537443cbb226bb85dd30234.mockapi.io/courses');
    url.searchParams.append('sortBy', 'views');
    url.searchParams.append('order', 'desc');
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('page', "1");

    const response = await axios.get(url.toString());

    if (response.status === 200) {
        return response.data;
    }
    else {
        toast.error("Error fetching courses by views",
            {
                position: "top-center",
            }
        );
    }
}
export const getCourseById = async (id: string) => {
    const response = await axios.get(`https://6537443cbb226bb85dd30234.mockapi.io/courses/${id}`);
    return response.data;
}

export const getFavoriteCourses = async () => {
    const response = await axios.get(`https://6537443cbb226bb85dd30234.mockapi.io/my_favorites`);
    return response.data;
}

export const checkFavoriteCourse = async (courseId: number) => {
    const url = new URL('https://6537443cbb226bb85dd30234.mockapi.io/my_favorites');
    url.searchParams.append('courseId', courseId.toString());
    const response = await axios.get(url.toString());

    if (response.status === 200) {
        return true;
    }
    else return false;
}