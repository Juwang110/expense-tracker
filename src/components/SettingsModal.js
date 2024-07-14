import React from "react";
import { EditUserForm } from "../components/EditUserForm";
import { Button, Modal, Checkbox, Label, Radio } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function SettingsModal({ onClose, darkMode, toggleDarkMode }) {
  const [option, setOption] = useState("default");
  const [consent, setConsent] = useState(true);
  const navigate = useNavigate();

  function handleConsent(e) {
    setConsent(e.target.checked);
    axios
      .put("http://localhost:5000/api/update_consent", {
        consent: e.target.checked,
        id: localStorage.getItem("id"),
      })
      .then((response) => {
        console.log("Consent updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating consent:", error);
      });
  }

  function handleOption(option) {
    setOption(option);
  }

  function handleDelete() {
    const user_data = { id: localStorage.getItem("id") };
    axios
      .post(`http://localhost:5000/api/delete_user`, user_data)
      .then((response) => {
        console.log("Account deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });

    navigate("/LogIn");
  }

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

                <div className="flex gap-2">
                  <div className="flex h-5 items-center">
                    <Checkbox
                      id="shipping"
                      checked={consent}
                      onChange={handleConsent}
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="shipping">Comparison consent</Label>
                    <div className="text-gray-500 dark:text-gray-300">
                      <span className="text-xs font-normal">
                        Allow your data to be factored into the comparison tool
                        for other userss
                      </span>
                    </div>
                  </div>
                </div>
                <Button color="failure" onClick={handleDelete}>
                  Delete Account
                </Button>
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
                  <legend className="mb-4">Choose your display mode</legend>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="light"
                      name="display-mode"
                      checked={!darkMode}
                      onChange={() => {
                        localStorage.setItem("dark", false);
                        console.log(localStorage.getItem("dark"));
                        toggleDarkMode(false);
                      }}
                    />
                    <Label htmlFor="light">Light mode</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="dark"
                      name="display-mode"
                      checked={darkMode}
                      onChange={() => {
                        localStorage.setItem("dark", true);
                        console.log(localStorage.getItem("dark"));
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
