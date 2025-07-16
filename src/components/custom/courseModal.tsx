import React from 'react';
import { formatMoney } from '../../utils/format';

interface ModalProps {
  isOpen: boolean;
  isFavorite: boolean;
  onClose: () => void;
  course: Course | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, course, isFavorite }) => {
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
        <div className="absolute top-2 left-2 z-10">
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
        <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
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