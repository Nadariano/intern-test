import { useEffect, useState } from "react";
import { getAllCourses } from "../../apis/courses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatMoney } from "../../utils/format";
import SearchBar from "../custom/searchBar";

function Home() {
  const [courses, setCourses] = useState<Map<number, Course>>(new Map());
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      const courseMap = new Map<number, Course>();
      response.forEach((course: Course) => {
        courseMap.set(course.id, course);
      });
      setCourses(courseMap);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses();
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div>
      <header className="flex flex-col items-center justify-center bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Welcome to Course Dealers</h1>
        </div>
        <SearchBar setCourses={setCourses} setLoading={setLoading} />
      </header>
      <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap w-full justify-center">
          {loading ?
            <>
              <div className="lg:w-[25vw] lg:h-[40vh] md:w-[45vw] md:h-[40vh] m-5 mb-4 border p-4 bg-white shadow text-center hover:shadow-lg items-center justify-center
                md:mx-2 md:my-4">
                <span><Skeleton count={3} width="100%" /></span>
                <h2 className="text-xl font-semibold"><Skeleton height="15vh" width="10vw" /></h2>
                <span><Skeleton count={5} width="100%" /></span>
              </div>
              <div className="lg:w-[25vw] lg:h-[40vh] md:w-[45vw] md:h-[40vh] m-5 mb-4 border p-4 bg-white shadow text-center hover:shadow-lg items-center justify-center
                md:mx-2 md:my-4">
                <span><Skeleton count={3} width="100%" /></span>
                <h2 className="text-xl font-semibold"><Skeleton height="15vh" width="10vw" /></h2>
                <span><Skeleton count={5} width="100%" /></span>
              </div>
              <div className="lg:w-[25vw] lg:h-[40vh] md:w-[45vw] md:h-[40vh] m-5 mb-4 border p-4 bg-white shadow text-center hover:shadow-lg items-center justify-center
                md:mx-2 md:my-4">
                <span><Skeleton count={3} width="100%" /></span>
                <h2 className="text-xl font-semibold"><Skeleton height="15vh" width="10vw" /></h2>
                <span><Skeleton count={5} width="100%" /></span>
              </div>
            </>
            :
            <>
              {courses.values().map(course => (
                <div key={course.id} className="flex flex-col lg:w-[25vw] lg:h-[40vh] md:w-[45vw] md:h-[40vh] m-5 mb-4 border p-4 bg-white shadow 
                text-center hover:shadow-lg items-center justify-center
                md:mx-2 md:my-4 overflow-y-scroll">
                  <h2 className="text-xl font-semibold">{course.name}</h2>
                  <p>{course.description}</p>
                  <img src={course.image} alt={course.name} className="w-[80%] h-[40%]" />
                  <p>Teacher: {course.author}</p>
                  <p>Duration: {course.length} slots</p>
                  <p>Price: {formatMoney(course.price)}</p>
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Home