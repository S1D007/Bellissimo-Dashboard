import React from "react";

const Pgae = () => {
  return (
    <div className="container">
      <header className="">
        <h1 className="text-8xl font-bold mb-4">Bellissimo India App</h1>
        <h1 className="text-4xl font-bold mb-4">Delete Your Account</h1>
        <h2 className="text-2xl font-bold mb-4">Type of Data we Collect</h2>
        <ul>
          <li>
            <p>Full Name (First Name + Last Name)</p>
          </li>
          <li>Email Address</li>
          <li>Your Home Address</li>
          <li>Phone Number</li>
        </ul>
        <br/>
        <p>
          To delete your account, please contact us at{" "}
          <a
            href="mailto:info@bellissimo.co.in"
            className="text-blue-500 hover:underline"
          >
            info@bellissimo.co.in
          </a>{" "}
          with your account details.
        </p>
        <p className="mt-4">
          Our support team will provide you with further instructions and may
          ask for additional information to verify your identity before
          processing the account deletion request.
        </p>
      </header>
    </div>
  );
};

export default Pgae;
