import axios from "axios";
import { toast } from "react-toastify";
import { formatMoney } from "../utils/format";

export const getAllCourses = async () => {
    const response = await axios.get('https://6537443cbb226bb85dd30234.mockapi.io/courses');
    return response.data;
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

export const getCourseById = async (id: string) => {
    const response = await axios.get(`https://6537443cbb226bb85dd30234.mockapi.io/courses/${id}`);
    return response.data;
}
