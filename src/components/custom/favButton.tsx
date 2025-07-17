import { useState } from "react";
import { updateFavoriteCourse } from "../../apis/courses";

interface FavButtonProps {
  isFavorite: boolean,
  courseId: number,
  fetchFavCourses: () => void;
}
const FavButton: React.FC<FavButtonProps> = ({ isFavorite, courseId, fetchFavCourses }) => {
  const [showPing, setShowPing] = useState(false);
  const handleFavorite = async () => {
    await updateFavoriteCourse(courseId);
    fetchFavCourses();
  }
  const handleClick = () => {
    setShowPing(true);
    setTimeout(() => setShowPing(false), 300);
  };
  return (
    <div className="relative w-fit z-10 group cursor-pointer" onClick={handleClick}>
      {showPing && (
        <span className="absolute inset-0 w-6 h-6 rounded-full bg-red-400 opacity-75 animate-ping" />
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorite ? 'red' : 'none'}
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={handleFavorite}
        className="relative w-6 h-6 text-red-500 transition-transform duration-200 ease-in-out group-hover:scale-125 group-hover:animate-pulse drop-shadow-md"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                 4.5 2.09C13.09 3.81 14.76 3 
                 16.5 3 19.58 3 22 5.42 
                 22 8.5c0 3.78-3.4 6.86-8.55 
                 11.54L12 21.35z" />
      </svg>
    </div>
  )
}

export default FavButton;