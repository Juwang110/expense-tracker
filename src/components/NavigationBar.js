import React from "react";
import { MegaMenu, Navbar, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  return (
    <div className="border-b border-gray-400 dark:border-gray-800">
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
                  img="https://cdn-icons-png.freepik.com/256/149/149071.png?uid=R151848132&ga=GA1.1.1507691374.1717099387&semt=ais_hybrid"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{username}</span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => navigate("/FinancialProfile")}>
                Financial Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/Settings")}>
                Settings
              </Dropdown.Item>
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
              <MegaMenu.Dropdown toggle={<>Tools</>}>
                <ul className="grid grid-cols-3">
                  <div className="space-y-4 p-4">
                    <li>
                      <a
                        href="/Comp"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Comparison Calculator
                      </a>
                    </li>
                  </div>
                  <div className="space-y-4 p-4">
                    <li>
                      <a
                        href="/Wealth"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Wealth Calculator
                      </a>
                    </li>
                  </div>
                  <div className="space-y-4 p-4">
                    <li>
                      <a
                        href="/Breakdown"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Budget Breakdown
                      </a>
                    </li>
                    <li>
                      <a
                        href="/Resources"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Resources
                      </a>
                    </li>
                  </div>
                </ul>
              </MegaMenu.Dropdown>
            </Navbar.Link>
            <Navbar.Link href="/License">License</Navbar.Link>
            <Navbar.Link href="/Contact">Contact</Navbar.Link>
          </Navbar.Collapse>
        </div>
      </MegaMenu>
    </div>
  );
}
