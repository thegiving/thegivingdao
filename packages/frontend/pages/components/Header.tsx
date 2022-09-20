import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";


const navigation = [
  { name: 'How it Works', href: '#', current: true },
  { name: 'Projects', href: '#2', current: false },
  ]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <header>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-50 flex justify-between py-4">
              <div className="container-fluid relative z-10 flex items-center lg:gap-16">
                <Disclosure.Button className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-[3rem] w-[3rem]" aria-hidden="true" />
                  )}
                </Disclosure.Button>

                <div className="container-fluid">
                  <a className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 lg:mt-0 mr-1" href="#">
                    <Image
                      className="mr-2 font-extrabold"
                      src={"/2022_giving_logo_v01-01.png"}
                      alt="The Giving Dao"
                      width={75}
                      height={75}
                      >
                    </Image>
                    <span className='font-bold text-lg'>TheGivingDao</span>
                  </a>
                </div>


                <div className="hidden lg:flex lg:gap-[4.5rem]">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-lg transition-colors delay-150 hover:text-gray-900 hover:delay-[0ms]"
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:block">
                  <div className="ml-4 mt-4 justify-right flex items-center md:ml-6">
                    <ConnectButton/>
                  </div>
                </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </header>
  )
}