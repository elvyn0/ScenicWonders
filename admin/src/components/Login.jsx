import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <button className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
          <X className="size-5" />
        </button>
        <div className="flex flex-col items-center">
          <div>
            <h1>Admin panel</h1>
          </div>
          <form onClick={submitHandler}>
            <div>
              <p>Email adress</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your@gmail.com"
                value={email}
                required
              />
            </div>
            <div>
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="email"
                placeholder="Password"
                value={Password}
                required
              />
            </div>
            <div>
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
