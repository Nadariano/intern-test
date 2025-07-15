import { formatMoney, shortenText } from "../../utils/format";

interface CourseCardPProps {
  course: Course;
}
function CourseCard({ course }: CourseCardPProps) {
  return (
    <div
      key={course.id}
      className="flex flex-col lg:w-[15vw] lg:h-[40vh] md:w-[45vw] md:h-[40vh] m-5 mb-4 border p-4 bg-white shadow 
              text-center hover:shadow-lg items-center justify-center
              md:mx-2 md:my-4"
    >
      <h2 className="text-xl font-semibold">{course.name}</h2>
      <p>{shortenText(course.description, 60)}</p>
      <img src={course.image} alt={course.name} className="w-[80%] h-[40%]" />
      <p>Teacher: {course.author}</p>
      <p>Duration: {course.length} slots</p>
      <p>Price: {formatMoney(course.price)}</p>
    </div>
  )
}

export default CourseCard;