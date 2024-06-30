import { Label, Textarea, TextInput, Button, Alert } from "flowbite-react";
import axios from "axios";
import React, { useState } from "react";

export function ContactMe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email: email,
      message: message,
    };

    axios
      .post("http://localhost:5000/api/send_email", userData)
      .then((response) => {
        if (response.data.message === "Success") {
          console.log("yay");
          setShowSuccessAlert(true);
        } else {
          console.log("nah");
          setShowFailAlert(true);
        }
      })
      .catch((error) => {
        console.error("Error checking user:", error);
        setShowFailAlert(true);
      });
  }

  return (
    <form
      className="w-full max-w-md flex flex-col gap-4 py-8"
      onSubmit={handleSubmit}
    >
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="joe@example.com"
          addon="@"
          required
          className="mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mb-2 block">
          <Label htmlFor="comment" value="Your message" />
        </div>
        <Textarea
          id="comment"
          placeholder="Leave a comment..."
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button type="submit">Submit</Button>
      {showSuccessAlert && (
        <Alert color="success" onDismiss={() => setShowSuccessAlert(false)}>
          <span className="font-medium">Alert!</span> Email successfully sent,
          please wait a couple of days for a response!
        </Alert>
      )}
      {showFailAlert && (
        <Alert color="warning" onDismiss={() => setShowFailAlert(false)}>
          <span className="font-medium">Alert!</span> For some reason this email
          could not be sent, please double check your information.
        </Alert>
      )}
    </form>
  );
}
