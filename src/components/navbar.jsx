import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

const navigation = [

  { name: "Users", to: "/users" },
  { name: "Inactive Users", to: "/inactive-users" },
  { name: "Top Users Frequency", to: "/top-users-frequency" },
];

const userNavigation = [{ name: "Sign out", to: "/login" }];

const linkClass = ({ isActive }) =>
  isActive
    ? " bg-black text-white  rounded-md px-3 py-2"
    : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Disclosure as="nav" className="bg-indigo-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-8"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <NavLink key={item.name} to={item.to} className={linkClass}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">

              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none   focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <FaRegUser className="h-8 w-8  text-white" />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <NavLink
                        to={item.to}
                        onClick={Logout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.name}
                      </NavLink>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
     
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6 block" />
              <XMarkIcon aria-hidden="true" className="h-6 w-6 hidden" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.to}
              aria-current={item.current ? "page" : undefined}
              className={linkClass}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
   
            <button
              type="button"
              className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.to}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
