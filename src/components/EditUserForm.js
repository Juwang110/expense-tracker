import { Button, Label, TextInput, Alert } from "flowbite-react";
import axios from "axios";
import { useState } from "react";

// Edit info form present in settings section to update user email, pass, or username.
// Upon submission, the form sends the data to a Flask backend via a request.
export function EditUserForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showUsernameAlert, setUsernameAlert] = useState(false);
  const [showEmailAlert, setEmailAlert] = useState(false);
  const [showPasswordAlert, setPasswordAlert] = useState(false);
  const [showUsernameErrorAlert, setUsernameErrorAlert] = useState(false);
  const [showEmailErrorAlert, setEmailErrorAlert] = useState(false);
  const [showPasswordErrorAlert, setPasswordErrorAlert] = useState(false);

  // Handles updating username in database
  function handleUsernameSubmit() {
    const userData = {
      id: localStorage.getItem("id"),
      username: username,
    };
    localStorage.setItem("username", username);
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/update_user`, userData)
      .then((response) => {
        setUsernameAlert(true);
      })
      .catch((error) => {
        setUsernameErrorAlert(true);
        console.error("Error updating user:", error);
      });
  }

  // Handles updating email in database
  function handleEmailSubmit() {
    const userData = {
      id: localStorage.getItem("id"),
      email: email,
    };
    localStorage.setItem("email", email);
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/update_user`, userData)
      .then((response) => {
        setEmailAlert(true);
      })
      .catch((error) => {
        setEmailErrorAlert(true);
        console.error("Error updating user:", error);
      });
  }

  // Handles updating password in database
  function handlePasswordSubmit() {
    const userData = {
      id: localStorage.getItem("id"),
      password: password,
    };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/update_user`, userData)
      .then((response) => {
        setPasswordAlert(true);
      })
      .catch((error) => {
        setPasswordErrorAlert(true);
        console.error("Error updating user:", error);
      });
  }

  // Renders form to update email, username and password with conditional
  // email, username and password success alerts depending on Flask response
  return (
    <div>
      <form className="flex max-w-md flex-col gap-4">
        <div className="mb-2 block mt-4">
          <Label htmlFor="email1" value="Email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleEmailSubmit}>Update</Button>
        {showEmailAlert && (
          <Alert color="success" onDismiss={() => setEmailAlert(false)}>
            <span className="font-medium">Alert!</span> Successfully updated
            email
          </Alert>
        )}
        {showEmailErrorAlert && (
          <Alert
            color={"dark" ? "dark" : "warning"}
            onDismiss={() => setEmailErrorAlert(false)}
            className="mb-4"
          >
            <span className="font-medium">Alert!</span> Something went wrong
            please try again or refresh.
          </Alert>
        )}
      </form>
      <form className="flex max-w-md flex-col gap-4 py-4">
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handlePasswordSubmit}>Update</Button>
        {showPasswordAlert && (
          <Alert color="success" onDismiss={() => setPasswordAlert(false)}>
            <span className="font-medium">Alert!</span> Successfully updated
            password
          </Alert>
        )}
        {showPasswordErrorAlert && (
          <Alert
            color={"dark" ? "dark" : "warning"}
            onDismiss={() => showPasswordErrorAlert(false)}
            className="mb-4"
          >
            <span className="font-medium">Alert!</span> Something went wrong
            please try again or refresh.
          </Alert>
        )}
      </form>
      <form className="flex max-w-md flex-col gap-4">
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleUsernameSubmit}>Update</Button>
        {showUsernameAlert && (
          <Alert color="success" onDismiss={() => setUsernameAlert(false)}>
            <span className="font-medium">Alert!</span> Successfully updated
            username
          </Alert>
        )}
        {showUsernameErrorAlert && (
          <Alert
            color={"dark" ? "dark" : "warning"}
            onDismiss={() => showUsernameErrorAlert(false)}
            className="mb-4"
          >
            <span className="font-medium">Alert!</span> Something went wrong
            please try again or refresh.
          </Alert>
        )}
      </form>
    </div>
  );
}
