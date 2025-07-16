import { useState } from "react";
import { formatMoney, shortenText } from "../../utils/format";
import Modal from "./courseModal";

interface CourseCardPProps {
  course: Course;
  isFavorite: boolean;
}

function CourseCard({ course, isFavorite }: CourseCardPProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        key={course.id}
        className="relative group flex flex-col lg:w-[15vw] lg:h-[45vh] md:w-[45vw] md:h-[40vh] m-5 mb-4 border p-4 bg-white rounded-2xl shadow-md text-center 
             items-center justify-between transition-all duration-300 ease-in-out hover:shadow-xl overflow-hidden cursor-pointer"
      >
        <div className="absolute top-2 right-2 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={`${isFavorite ? 'red' : 'none'}`}
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-red-500"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={course} isFavorite={isFavorite} />
    </>
  );
}

export default CourseCard;
