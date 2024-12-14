import React from "react";
import { EditUserForm } from "../components/EditUserForm";
import { Button, Modal, Label, Radio, Alert } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiShoppingBag, HiUser } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// User settings menu which gets state from parent NavigationBar,
// Features a sidebar for different settings options and enables for control of
// Light/Dark mode, editing user information, deleting user
export default function SettingsModal({ onClose, darkMode, toggleDarkMode }) {
  const [option, setOption] = useState("default");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const navigate = useNavigate();

  // Handles navigation of settings modal
  function handleOption(option) {
    setOption(option);
  }

  // Handles user account deletion
  function handleDelete() {
    const user_data = { id: localStorage.getItem("id") };
    console.log(localStorage.getItem("id"));
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/delete_user`, user_data)
      .then((response) => {
        navigate("/LogIn");
      })
      .catch((error) => {
        setDeleteAlert(true);
        console.error("Error deleting account:", error);
      });
  }

  // Rerenders the modal based on the menu option chosen
  function renderModalContent() {
    switch (option) {
      case "default":
        return (
          <>
            <Modal.Header>Notice</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Navigate to your desired setting category by using the sidebar
                  on the right. Please note that this application is still in
                  development so your data might not be fully secure.
                </p>
              </div>
            </Modal.Body>
          </>
        );
      case "Profile":
        return (
          <>
            <Modal.Header>Profile</Modal.Header>
            <Modal.Body className="max-h-96 overflow-y-auto">
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Update your email, password, or username with the text inputs
                  below.
                </p>
              </div>
              <EditUserForm></EditUserForm>
            </Modal.Body>
          </>
        );
      case "Privacy":
        return (
          <>
            <Modal.Header>Privacy</Modal.Header>
            <Modal.Body className="max-h-96 overflow-y-auto">
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Update your privacy settings below
                </p>

                <Button color="failure" onClick={handleDelete}>
                  Delete Account
                </Button>
                {deleteAlert && (
                  <Alert
                    color={"dark" ? "dark" : "warning"}
                    onDismiss={() => setDeleteAlert(false)}
                    className="mb-4"
                  >
                    <span className="font-medium">Alert!</span> Something went
                    wrong please try again or refresh.
                  </Alert>
                )}
              </div>
            </Modal.Body>
          </>
        );
      case "Appearance":
        return (
          <>
            <Modal.Header>Appearance</Modal.Header>
            <Modal.Body className="max-h-96 overflow-y-auto">
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Update your appearance settings below
                </p>
                <fieldset className="flex max-w-md flex-col gap-4">
                  <legend className="mb-4 dark:text-white">
                    Choose your display mode
                  </legend>
                  <div className="flex items-center gap-2">
                    {/*Sets display to light mode and changes local storage record */}
                    <Radio
                      id="light"
                      name="display-mode"
                      checked={!darkMode}
                      onChange={() => {
                        localStorage.setItem("dark", false);
                        toggleDarkMode(false);
                      }}
                    />
                    <Label htmlFor="light">Light mode</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    {/*Sets display to dark mode and changes local storage record */}
                    <Radio
                      id="dark"
                      name="display-mode"
                      checked={darkMode}
                      onChange={() => {
                        localStorage.setItem("dark", true);
                        toggleDarkMode(true);
                      }}
                    />
                    <Label htmlFor="dark">Dark mode</Label>
                  </div>
                </fieldset>
              </div>
            </Modal.Body>
          </>
        );
    }
  }

  // Renders the settings modal with sidebar option navigation
  return (
    <Modal
      show={true}
      onClose={onClose}
      size="lg"
      style={{ minWidth: "800px" }}
    >
      <div className="flex">
        <Sidebar aria-label="Default sidebar example" className="w-1/3">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiChartPie}
                onClick={() => handleOption("Profile")}
              >
                Profile
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiUser}
                onClick={() => handleOption("Privacy")}
              >
                Privacy
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiShoppingBag}
                onClick={() => handleOption("Appearance")}
              >
                Appearance
              </Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
              <Sidebar.Item></Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="flex-1">{renderModalContent()}</div>
      </div>
    </Modal>
  );
}
