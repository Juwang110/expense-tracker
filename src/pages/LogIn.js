import React, { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
      email: email,
    };

    axios
      .post("http://localhost:5000/api/get_user", userData)
      .then((response) => {
        if (response.data.message === "exists") {
          console.log("exists");
        } else if (response.data.message === "wrong password") {
          console.log("wrong");
        } else {
          console.log(response.data.message);
          axios
            .post("http://localhost:5000/api/add_user", userData)
            .then((response) => {
              console.log(response.data.message);
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
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
