import { useEffect } from "react";
import { getPaginatedCoursesAndSort } from "../../apis/courses";
import CourseCard from "./courseCard";
import CourseLoadingSkeleton from "./courseLoadingSkeleton";
import Pagination from "./pagination";

interface AllCoursesProps {
  courses: Map<number, Course>;
  setCourses: (courses: Map<number, Course>) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
}
function AllCourses({ courses, setCourses, loading, setLoading, page, setPage, limit, setLimit, totalPages, setTotalPages, searchQuery }: AllCoursesProps) {
  const fetchCourses = async () => {
    try {
      const response = await getPaginatedCoursesAndSort(page, limit, 'name', searchQuery);
      const courseMap = new Map<number, Course>();
      response.forEach((course: Course) => {
        courseMap.set(course.id, course);
      });
      if (courseMap.size > 0) {
        setCourses(courseMap);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    fetchCourses();
  }, [page, limit]);
  return (
    <>
      {(loading || !courses) ?
        <>
          {Array.from({ length: limit }).map((_, index) => (
            <CourseLoadingSkeleton key={index} />
          ))}
        </>
        :
        <>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Courses</h1>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1); // reset to page 1 on limit change
                }}
                className="border rounded px-2 py-1"
              >
                {[5, 10, 20, 50].map((val) => (
                  <option key={val} value={val}>
                    Show {val}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap justify-center">
              {courses.values().map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              courses={courses}
            />
          </div>
        </>
      }
    </>
  )
}

export default AllCourses