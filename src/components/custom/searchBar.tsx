import { useCallback, useEffect, useState } from "react";
import { searchCourses } from "../../apis/courses";

interface SearchBarProps {
  setCourses?: (courses: Map<number, Course>) => void;
  setLoading?: (loading: boolean) => void;
}

function SearchBar({ setCourses, setLoading }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchByQuery = useCallback(async (query: string) => {
    try {
      setLoading?.(true);
      const results = await searchCourses('name', query);
      const courseMap = new Map<number, Course>();
      results.forEach((course: Course) => {
        courseMap.set(course.id, course);
      });
      setCourses?.(courseMap);
    } catch (error) {
      console.error("Error searching courses:", error);
    } finally {
      setLoading?.(false);
    }
  }, [setCourses, setLoading]);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        searchByQuery(searchQuery);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, searchByQuery]);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.trim());
  }

  return (
    <div className="w-full px-[15vw] max-w-7xl py-6">
      <form className="flex items-center justify-center" onSubmit={(e) => {
        e.preventDefault();
        searchByQuery(searchQuery);
      }}>
        <input
          type="text"
          name="search"
          placeholder="Search for courses..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
          value={searchQuery}
        />
      </form>
    </div>
  )
}

export default SearchBar;