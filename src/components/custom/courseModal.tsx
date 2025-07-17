import React from 'react';
import { formatMoney } from '../../utils/format';
import FavButton from './favButton';

interface ModalProps {
  isOpen: boolean;
  isFavorite: boolean;
  onClose: () => void;
  course: Course | null;
  fetchFavCourses: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, course, isFavorite, fetchFavCourses }) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-800/50">
      <div className="bg-white rounded-2xl w-[90vw] max-w-2xl p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{course.name}
          <FavButton isFavorite={isFavorite} courseId={course.id} fetchFavCourses={fetchFavCourses} />
        </h2>
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-2"><strong>Description:</strong> {course.description}</p>
        <p className="text-gray-700 mb-2"><strong>Detail:</strong> {course.detail}</p>
        <p className="text-gray-700 mb-2"><strong>Teacher:</strong> {course.author}</p>
        <p className="text-gray-700 mb-2"><strong>Duration:</strong> {course.length} slots</p>
        <p className="text-gray-700 mb-2"><strong>Price:</strong> {formatMoney(course.price)}</p>
      </div>
    </div>
  );
};

export default Modal;