import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { getCoursesByName, getPaginatedCoursesAndSort } from '../../apis/courses';
import { formatMoney } from '../../utils/format';

interface PriceRangeProps {
  searchQuery: string;
  limit: number;
  setCourses: (courses: Map<number, Course>) => void;
  setLoading: (loading: boolean) => void;
  setFiltering: (filtering: boolean) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  searchQuery,
  setFiltering,
  setCourses,
  setLoading,
  setPage,
  setTotalPages,
}) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5000000);
  const minRangeRef = useRef<HTMLInputElement>(null);
  const maxRangeRef = useRef<HTMLInputElement>(null);
  const rangeTrackRef = useRef<HTMLDivElement>(null);

  const min = 0;
  const max = 5000000;
  const minGap = 100000;

  const handleRangeUpdate = () => {
    let minVal = parseInt(minRangeRef.current?.value || '0');
    let maxVal = parseInt(maxRangeRef.current?.value || '5000000');

    if (maxVal - minVal < minGap) {
      if (minVal === minValue && minRangeRef.current) {
        minVal = maxVal - minGap;
        minRangeRef.current.value = minVal.toString();
      } else if (maxRangeRef.current) {
        maxVal = minVal + minGap;
        maxRangeRef.current.value = maxVal.toString();
      }
    }

    setMinValue(minVal);
    setMaxValue(maxVal);

    const minPercent = (minVal / max) * 100;
    const maxPercent = (maxVal / max) * 100;

    if (rangeTrackRef.current) {
      rangeTrackRef.current.style.left = `${minPercent}%`;
      rangeTrackRef.current.style.right = `${100 - maxPercent}%`;
    }
  };

  const searchByQuery = async (query: string): Promise<Map<number, Course>> => {
    try {
      const results = await getCoursesByName(query);
      const courseMap = new Map<number, Course>();
      results.forEach((course: Course) => {
        courseMap.set(course.id, course);
      });
      return courseMap;
    } catch (error) {
      console.error("Error searching courses:", error);
      return new Map(); // Return empty map on error
    }
  };

  const filterByPrice = async () => {
    setLoading(true);
    const searchedCourses = await searchByQuery(searchQuery);
    if (searchedCourses.size > 0) {
      const filteredCourses = Array.from(searchedCourses.values()).filter((course) => {
        return course.price >= minValue && course.price <= maxValue;
      });

      if (filteredCourses.length > 0) {
        const courseMap = new Map<number, Course>();
        filteredCourses.forEach((course) => {
          courseMap.set(course.id, course);
        });
        setCourses(courseMap);
        setTotalPages(1);
      } else {
        toast.error("No courses found in this price range.", {
          position: "top-center",
        });
      }
    }
    setFiltering(true);
    setPage(1);
    setLoading(false);
  };


  const resetFilter = async () => {
    if (minValue === min && maxValue === max) return;
    minRangeRef.current!.value = min.toString();
    maxRangeRef.current!.value = max.toString();
    setMinValue(min);
    setMaxValue(max);
    setFiltering(false);
  };

  useEffect(() => {
    handleRangeUpdate();
  }, [minValue, maxValue]);

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="lg:w-[30vw] md:[40vw] bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">PRICE RANGE</h2>

        <div className="relative mt-4 h-[18px]">
          <input
            type="range"
            min={min}
            max={max}
            defaultValue={minValue}
            onInput={handleRangeUpdate}
            ref={minRangeRef}
            className="absolute w-full appearance-none bg-transparent pointer-events-auto z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#23a9f7] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-30 [&::-webkit-slider-thumb]:translate-y-[-30%] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#23a9f7] [&::-moz-range-thumb]:cursor-pointer"
          />
          <input
            type="range"
            min={min}
            max={max}
            defaultValue={maxValue}
            onInput={handleRangeUpdate}
            ref={maxRangeRef}
            className="absolute w-full appearance-none bg-transparent pointer-events-auto z-20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#23a9f7] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-30 [&::-webkit-slider-thumb]:translate-y-[-30%] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#23a9f7] [&::-moz-range-thumb]:cursor-pointer"
          />

          <div className="relative w-full h-2 bg-gray-200 rounded-md">
            <div
              ref={rangeTrackRef}
              className="absolute h-2 bg-gradient-to-r from-blue-900 to-blue-400 rounded-md"
              style={{ left: '0%', right: '0%' }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col justify-between mt-3 text-gray-600 text-sm">
          <span>Min: {formatMoney(minValue)}</span>
          <span>Max: {formatMoney(maxValue)}</span>
          <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => {
              filterByPrice();
            }}
          >
            Filter
          </button>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => {
              resetFilter();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
