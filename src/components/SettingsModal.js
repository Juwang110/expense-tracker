import React from "react";
import { EditUserForm } from "../components/EditUserForm";
import { Button, Modal } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useState } from "react";

/*
Profile Settings: User information (name, email, profile picture). Change
      password. Account preferences (currency, language). Notification Settings:
      Manage notification preferences (email, push notifications). Customize
      notification types (budget alerts, transaction reminders). Theme and
      Appearance: Light mode/dark mode toggle. Customizable themes or color
      schemes. Budget Settings: Set default budget categories. Adjust budgeting
      periods (monthly, weekly, custom). Transaction Settings: Manage
      transaction categories (add, edit, delete). Currency settings (default
      currency, exchange rates). Security Settings: Two-factor authentication
      (2FA) setup. Data export/import options. Privacy Settings: Manage data
      sharing preferences. Clear data or delete account options. Backup and
      Sync: Backup data (local, cloud-based). Sync across devices (if
      applicable). Help and Support: Access app documentation or help guides.
      Contact support or provide feedback. About: App version and updates. Terms
      of service and privacy policy.
*/

export default function SettingsModal({ onClose }) {
  const [option, setOption] = useState("default");

  function handleOption(option) {
    setOption(option);
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
                  This app is still undergoing development and is not meant to
                  be used for real life purposes as of now. Please keep this in
                  mind but feel free to test the current features using fake
                  data.
                </p>
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
              <Sidebar.Item href="#" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
                label="Pro"
                labelColor="dark"
              >
                Kanban
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiInbox} label="3">
                Inbox
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Users
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Products
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
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="flex-1">{renderModalContent()}</div>
      </div>
    </Modal>
  );
}
