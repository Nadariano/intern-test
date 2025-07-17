import { useState } from "react";
import { formatMoney, shortenText } from "../../utils/format";
import Modal from "./courseModal";
import FavButton from "./favButton";

interface CourseCardPProps {
  course: Course;
  isFavorite: boolean;
  fetchFavCourses: () => void;
}

function CourseCard({ course, isFavorite, fetchFavCourses }: CourseCardPProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        key={course.id}
        className="relative group flex flex-col lg:w-[15vw] lg:h-[45vh] md:w-[45vw] md:h-[40vh] m-5 mb-4 border p-4 bg-white rounded-2xl shadow-md text-center 
             items-center justify-between transition-all duration-300 ease-in-out hover:shadow-xl overflow-hidden cursor-pointer"
      >
        <FavButton isFavorite={isFavorite} courseId={course.id}
          fetchFavCourses={fetchFavCourses} />
        <h2 className="lg:text-lg text-xl font-bold text-gray-800 mb-2">{course.name}</h2>
        <p className="text-gray-600 text-sm mb-2">{shortenText(course.description, 45)}</p>

        <img
          src={course.image}
          alt={course.name}
          className="w-80 h-40 object-cover rounded-lg mb-2"
        />

        <div className="text-gray-700 text-sm space-y-1">
          <p><span className="font-medium">Teacher:</span> {course.author}</p>
          <p><span className="font-medium">Duration:</span> {course.length} slots</p>
          <p><span className="font-medium">Price:</span> {formatMoney(course.price)}</p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-full bg-transparent group-hover:bg-gray-900/50
                  transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out
                  flex flex-col items-center justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-6 px-5 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
          >
            View Details
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={course} isFavorite={isFavorite}
        fetchFavCourses={fetchFavCourses} />
    </>
  );
}

export default CourseCard;
