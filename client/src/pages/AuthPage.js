import React from "react";

import Login from "../components/Login.js";
import Signup from "../components/Signup.js";

export default function AuthPage() {
  return (
    <div>
      <h1>Hello from Auth Page</h1>
      <Login />
      <Signup />
    </div>
  );
}
