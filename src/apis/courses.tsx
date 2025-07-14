import axios from "axios";

export const getAllCourses = async () => {
    const response = await axios.get('https://6537443cbb226bb85dd30234.mockapi.io/courses');
    return response.data;
}

export const getCourseById = async (id: string) => {
    const response = await axios.get(`https://6537443cbb226bb85dd30234.mockapi.io/courses/${id}`);
    return response.data;
}

export const searchCourses = async (fieldname: string, value: string) => {
    const url = new URL('https://6537443cbb226bb85dd30234.mockapi.io/courses');
    url.searchParams.append(fieldname, value);

    const response = await axios.get(url.toString());

    if (response.status === 200) {
        return response.data;
    }
    throw new Error(`Error fetching courses: ${response.statusText}`);
}