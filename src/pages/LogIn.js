import React, { useState } from "react";
import { Label, TextInput, Button, Alert, Modal } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
      email: email,
    };
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);

    axios
      .post("http://localhost:5000/api/get_user", userData)
      .then((response) => {
        if (response.data.message === "exists") {
          console.log("exists");
          localStorage.setItem("id", response.data.id);
          console.log(response.data.id);
          setOpenModal(true);
        } else if (response.data.message === "wrong password") {
          console.log("wrong");
          setShowAlert(true);
        } else {
          console.log(response.data.message);
          localStorage.setItem("id", response.data.id);
          console.log(response.data.id);
          setNewUser(true);
          axios
            .post("http://localhost:5000/api/add_user", userData)
            .then((response) => {
              console.log(response.data.message);
              setOpenModal(true);
            })
            .catch((error) => {
              console.error("Error adding user:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking user:", error);
      });
  }

  function handleAccept() {
    setOpenModal(false);
    if (newUser) {
      navigate("/Account");
    } else {
      navigate("/Landing");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">App title here</h1>
      </div>

      <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email4" value="Your email" />
          </div>
          <TextInput
            id="email4"
            type="email"
            icon={HiMail}
            placeholder="name@flowbite.com"
            required
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username3" value="Username" />
            </div>
            <TextInput
              id="username3"
              placeholder="Bonnie Green"
              icon={FaRegUser}
              required
              className="w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              icon={RiLockPasswordFill}
              required
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {showAlert && (
            <Alert color="warning" onDismiss={() => setShowAlert(false)}>
              <span className="font-medium">Password alert!</span> Wrong
              password for this account
            </Alert>
          )}
          {openModal && (
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>Notice</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    This app is still undergoing development and is not meant to
                    be used for real life purposes as of now. Please keep this
                    in mind but feel free to test the current features using
                    fake data.
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleAccept}>I accept</Button>
              </Modal.Footer>
            </Modal>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
