// HotCourses.tsx
import { SetStateAction, useEffect, useRef, useState } from "react";
import { getCoursesByViews } from "../../apis/courses";

const HotCourses = () => {
  const [hotCourses, setHotCourses] = useState<Map<number, Course>>(new Map());

  const fetchHotCourses = async () => {
    try {
      const response = await getCoursesByViews(5);
      const courseMap = new Map<number, Course>();
      response.forEach((course: Course) => {
        courseMap.set(course.id, course);
      });
      if (courseMap.size > 0) {
        setHotCourses(courseMap);
      }
    } catch (error) {
      console.error("Error fetching hot courses:", error);
    }
  };
  useEffect(() => {
    fetchHotCourses();
  }, []);

const platformRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const courses = Array.from(hotCourses.values());
  const maxIndex = courses.length - 1;

  const scrollTo = (newIndex: SetStateAction<number>) => {
    if (!platformRef.current) return;
    const container = platformRef.current;
    const frameWidth = container.clientWidth;

    container.scrollTo({
      left: frameWidth * Number(newIndex),
      behavior: "smooth",
    });
    setIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, index - 1);
    scrollTo(newIndex);
  };

  const handleNext = () => {
    const newIndex = index === maxIndex ? 0 : index + 1;
    scrollTo(newIndex);
  };

  // ⏱ Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);
  return (
    <div
      className="w-[45vw] allery border-2 rounded mx-auto my-6 bg-white shadow-lg"
    >
      <div className="top flex p-2 border-b select-none items-center">
        <div className="heading text-gray-800 font-semibold pl-3">
          Featured Courses
        </div>
        <div className="buttons ml-auto flex text-gray-600 mr-1">
          <svg
            onClick={handlePrev}
            className="w-7 border-2 rounded-l-lg p-1 cursor-pointer border-r-0 hover:bg-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <svg
            onClick={handleNext}
            className="w-7 border-2 rounded-r-lg p-1 cursor-pointer hover:bg-gray-100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>

      <div className="relative w-full h-96 overflow-hidden">
        <div
          className="flex transition-all duration-500 ease-in-out"
          ref={platformRef}
          style={{ scrollSnapType: "x mandatory", overflowX: "auto", scrollBehavior: "smooth" }}
        >
          {hotCourses.values().map((course, idx) => (
            <div
              key={course.id}
              className="w-full min-w-full flex-none h-full snap-start"
              title={course.name}
            >
              <div className="flex w-full h-full p-8">
                <div className="w-full flex items-center justify-center">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="rounded-xl shadow-md w-full p-4 object-contain max-h-64"
                  />
                </div>
                <div className="w-full flex flex-col justify-center pl-6">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">{course.name}</h2>
                  <p className="text-lg text-gray-600">{course.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotCourses;
