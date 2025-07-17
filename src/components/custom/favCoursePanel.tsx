import { useState } from 'react';


interface Props {
    favCourseIds: Map<number, number>;
    courses: Map<number, Course>;
    setFavCourseIds: (favCourseIds: Map<number, number>) => void;
}

export default function FavoritePanel({ favCourseIds, courses, setFavCourseIds }: Props) {
    const [open, setOpen] = useState(false);

    const favCourses = Array.from(courses.values()).filter((course) =>
        favCourseIds.has(course.id)
    );
    const onRemoveFavorite = (courseId: number) => {
        return;
    }
    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
            >
                ❤️ Favorites ({favCourseIds.size})
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 bg-white border rounded-lg shadow-lg overflow-auto p-4 space-y-3 animate-fade-in">
                    {favCourseIds.size === 0 ? (
                        <p className="text-gray-500 text-sm">No favorites yet.</p>
                    ) : (
                        favCourses.map((course) => (
                            <div
                                key={course.id}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <h4 className="font-semibold text-sm">{course.name}</h4>
                                    <p className="text-xs text-gray-500">${course.price}</p>
                                </div>
                                <button
                                    onClick={() => onRemoveFavorite(course.id)}
                                    className="text-red-500 text-xs hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
