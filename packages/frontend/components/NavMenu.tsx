import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import joinClassNames from "../utils/joinClassNames";
import { useDisconnect } from "wagmi";
import { getSession, signOut } from 'next-auth/react';

interface INavProps {
    address: string;
}
export default function Navmenu({ address }: INavProps) {
  const { disconnect } = useDisconnect();
  
  function handleDisconnect() {
    signOut();
    disconnect();
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="max-w-min text-white bg-alt_secondary focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-alt_secondary dark:hover:bg-alt_secondary dark:focus:ring-blue-100">
          <span className="w-5 h-5 mr-1 bg-gray-300 rounded-full"></span>
          <p className="w-32 text-ellipsis overflow-hidden">{address}</p>
          <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {(
                <a
                  href={`/my-account/`}
                  className={joinClassNames(
                    address ? "hover:bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  My Account
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {(
                <a
                  onClick={handleDisconnect}
                  className={joinClassNames(
                    address ? "hover:bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  Log Out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
