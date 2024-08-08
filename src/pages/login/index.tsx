import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setOtp] = useState("");
  const [login_mode, setLoginMode] = useState(false);
  const [codeemail, setCodeEmail] = useState(false);

  const route = useRouter();

  const handleLoginMode = () => {
    setLoginMode(!login_mode);
  };

  const handleSignIn = async (event: any) => {
    event.preventDefault(); // Prevent the default form submit behavior

    // Prepare data to be sent in the POST request
    const loginData = {
      loginmode: login_mode ? "email_only" : "email_password",
      username: email,
      password: login_mode ? null : password,
      code: login_mode ? code : null,
    };

    // Making the POST request to the login endpoint
    if (!login_mode) {
      const response = await fetch("/api/auth/login/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // Redirect or perform further actions here
      } else {
        console.error("Login failed:", data);
        // Handle errors here, such as showing an error message to the user
      }
    } else {
      const response = await fetch("/api/auth/verify/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        // Redirect or perform further actions here
        setCodeEmail(true);
      } else {
        console.error("Login failed:", data);
        // Handle errors here, such as showing an error message to the user
      }
    }
  };

  const handleVerifyOTP = async (event: any) => {
    event.preventDefault(); // Prevent the default form submit behavior

    // Prepare data to be sent in the POST request
    const otpData = {
      loginmode: login_mode ? "email_only" : "email_password",
      username: email,
      code: code,
    };

    // Making the POST request to the OTP verification endpoint
    const response = await fetch("/api/auth/login/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otpData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("OTP verification successful:", data);
      // Redirect or perform further actions here
    } else {
      console.error("OTP verification failed:", data);
      // Handle errors here, such as showing an error message to the user
    }
  };

  if (codeemail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-primary_light ">
            Verify OTP
          </h2>
          <p className="mb-6 text-gray-500">
            Please enter the OTP sent to {email}.
          </p>
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                OTP
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <FaKey className="ml-2 text-gray-400" />
                <input
                  type="text"
                  id="otp"
                  placeholder="123456"
                  className="p-2 w-full focus:outline-none"
                  value={code}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary_light text-white p-3 rounded hover:bg-primary_light/70"
            >
              Verify OTP
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Need a new OTP?{""}
            <a href="/resend-otp" className="text-blue-500 hover:underline">
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <div className="flex justify-between text-primary_dark font-bold bg-white rounded-lg border-b-2 border-primary_dark ">
          {/* <div
            className={`text-center m-auto hover:text-white hover:bg-primary_light w-full h-full py-4 rounded-lg `}
          >
            {" "}
            Email & Password{" "}
          </div> */}
          <div
            className={`text-center m-auto hover:text-white hover:bg-primary_light/70 px-4 h-full py-4 rounded-3xl hover:cursor-pointer ${
              login_mode ? " text-white bg-primary_light " : ""
            }  `}
            onClick={handleLoginMode}
          >
            Email Only
          </div>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 ">Sign In</h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600 mb-2"
              >
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <FaUser className="ml-2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  placeholder="user@example.com"
                  className="p-2 w-full focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Managing Login mode */}
            <input
              type="hidden"
              name="login"
              value={login_mode ? "email_password" : "email_only"}
            />

            {!login_mode ? (
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-600 mb-2"
                >
                  Password
                </label>
                <div className="flex items-center border border-gray-300 rounded">
                  <FaLock className="ml-2 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="p-2 w-full focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="w-full bg-primary_light text-white p-3 rounded hover:bg-primary_light/70"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
