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

export const getFavCourseByCourseId = async (courseId: number) => {
  try {
    const response = await axios.get(
      `https://6537443cbb226bb85dd30234.mockapi.io/my_favorites?courseId=${courseId}`
    );

    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    console.error("Error fetching favorite course:", error.response?.data || error.message);
    return []; // fail safely
  }
};


export const updateFavoriteCourse = async (courseId: number) => {
  const favorites = await getFavCourseByCourseId(courseId);

  if (favorites.length > 0) {
    const favId = favorites[0].id; // assume 1 favorite per course
    await axios.delete(`https://6537443cbb226bb85dd30234.mockapi.io/my_favorites/${favId}`);
    toast.info('Removed from favorites');
  } else {
    await axios.post(`https://6537443cbb226bb85dd30234.mockapi.io/my_favorites`, { courseId });
    toast.success('Added to favorites');
  }
};
