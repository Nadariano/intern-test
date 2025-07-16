import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import AllCourses from "../custom/allCourse";
import HotCourses from "../custom/hotCourses";
import SearchBar from "../custom/searchBar";
import PriceRange from "../custom/priceRange";

function Home() {
  const [courses, setCourses] = useState<Map<number, Course>>(new Map());
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favCourseIds, setFavCourseIds] = useState<Map<number, number>>(new Map());
  return (
    <div>
      <header className="flex flex-col items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Welcome to Course Dealers</h1>
        </div>
        <HotCourses />
      </header>
      <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
        <SearchBar setCourses={setCourses} setLoading={setLoading}
          setPage={setPage} limit={limit} loading={loading}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <PriceRange limit={limit} searchQuery={searchQuery} setFiltering={setFiltering}
        setCourses={setCourses} setLoading={setLoading} setPage={setPage} />
        <div className="flex flex-wrap w-full justify-center">
          <AllCourses courses={courses} loading={loading} filtering={filtering} setCourses={setCourses} 
            favCourseIds={favCourseIds} setFavCourseIds={setFavCourseIds} setLoading={setLoading}
            page={page} setPage={setPage} limit={limit} setLimit={setLimit} totalPages={totalPages} setTotalPages={setTotalPages}
            searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}

export default Home