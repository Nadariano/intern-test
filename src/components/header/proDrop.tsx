import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { user, userNavigation } from "../../dummyData/header/dummyData";

function ProfileDropdown() {
  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3 border-l border-gray-700 pl-3">
        <div>
          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-green-300 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform 
          data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in
          border border-gray-500 text-gray-700"
        >
          {userNavigation.map((item) => (
            <MenuItem key={item.name}>
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                {item.name}
              </a>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </>
  )
}

export default ProfileDropdown;