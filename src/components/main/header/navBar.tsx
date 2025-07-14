import { Link } from 'react-router-dom';
import { classNames, navigation } from '../../../dummyData/header/dummyData';
function NavigationBar() {
  return (
    <div className="flex items-center w-9/10 justify-center">
      <div className="shrink-0">
        <img
          alt="Your Company"
          src="./dummy-logo.png"
          className="size-12"
        />
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium',
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavigationBar;