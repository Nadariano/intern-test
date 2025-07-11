import { Outlet } from "react-router-dom";
import { BearCounter, Controls } from "../../store/bear";
function Body() {
  return (
    <div className="h-[83vh] bg-gray-100">
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          <BearCounter/>
          <Controls/>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Body;