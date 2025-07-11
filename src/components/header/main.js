import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import MobileMenu from './menu';
import NavigationBar from './navBar';
import Notification from './noti';
import ProfileDropdown from './proDrop';
function Header() {
  return (
    <div className='md:h-[8vh] w-full'>
      <Disclosure as="nav" className="bg-green-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <NavigationBar />
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Notification />
                <ProfileDropdown />
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>
        <MobileMenu />

      </Disclosure>
    </div>

  )
}

export default Header;