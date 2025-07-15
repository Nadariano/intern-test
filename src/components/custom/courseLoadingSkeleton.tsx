import Skeleton from 'react-loading-skeleton'

function CourseLoadingSkeleton() {
  return (
    <div className="flex flex-col lg:w-[15vw] lg:h-[40vh] md:w-[45vw] md:h-[40vh] m-5 mb-4 border p-4 bg-white shadow text-center items-center justify-center
                    md:mx-2 md:my-4">
      <span className='w-full'><Skeleton count={2} width="60%" /></span>
      <h2 className="text-xl font-semibold"><Skeleton height="15vh" width="10vw" /></h2>
      <span className='w-full'><Skeleton count={3} width="40%" /></span>
    </div>
  )
}

export default CourseLoadingSkeleton