import { Outlet } from "react-router-dom";
function Body() {
  return (
    <div className="h-[83vh] overflow-y-scroll bg-slate-400">
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Body;