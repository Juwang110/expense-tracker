import React from "react";
import { Button, MegaMenu, Navbar, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import LogIn from "../pages/LogIn";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <MegaMenu>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
        <Navbar.Brand href="/">
          <img
            alt="App Icon"
            src="https://cdn-icons-png.freepik.com/256/6204/6204408.png?uid=R151848132&ga=GA1.1.1507691374.1717099387&semt=ais_hybrid"
            className="mr-3 h-6 sm:h-9"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Money
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => navigate("/LogIn")}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/About">About</Navbar.Link>
          <Navbar.Link>
            <MegaMenu.Dropdown toggle={<>Resources</>}>
              <ul className="grid grid-cols-3">
                <div className="space-y-4 p-4">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Comparison Calculator
                    </a>
                  </li>
                </div>
                <div className="space-y-4 p-4">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Wealth Calculator
                    </a>
                  </li>
                </div>
                <div className="space-y-4 p-4">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary-600 dark:hover:text-primary-500"
                    >
                      Budget Breakdown
                    </a>
                  </li>
                </div>
              </ul>
            </MegaMenu.Dropdown>
          </Navbar.Link>
          <Navbar.Link href="#">License</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
