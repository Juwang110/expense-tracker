import React from "react";
import { MegaMenu, Navbar, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SettingsModal from "./SettingsModal";

// Navigation bar present on all pages with access to settings modal
// and page navigation to all different site pages
export default function NavigationBar({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const [settingsModal, setSettingsModal] = useState(false);

  // Renders a Flowbite MegaMenu with page navigation to all pages
  // And a user section to open settings modal
  return (
    <div className="border-b border-gray-400 dark:border-gray-800">
      <MegaMenu>
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
          <Navbar.Brand href="/Landing">
            <img
              alt="App Icon"
              src="https://cdn-icons-png.freepik.com/256/6204/6204408.png?uid=R151848132&ga=GA1.1.1507691374.1717099387&semt=ais_hybrid"
              className="mr-3 h-6 sm:h-9"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              SpendTrack
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
              <Dropdown.Item
                onClick={() => setSettingsModal(true)}
                onClose={() => setSettingsModal(false)}
              >
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
                        Savings Rate Comparison
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
                        href="/Goals"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Budget Goals
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
      <div>
        {/*Passes down state to SettingsModal*/}
        {settingsModal && (
          <SettingsModal
            onClose={() => setSettingsModal(false)}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </div>
    </div>
  );
}
