import React from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Log in</h1>
      <label className="text-xs text-gray-400">
        User name:
        <input
          type="text"
          placeholder="Usser name"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <div className="flex flex-col gap-4 justify-center mt-4 items-center">
        <button
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-md py-2 px-8 max-w-[60%]"
        >
          Login
        </button>
        <Link
          to={"/register"}
          className="flex justify-center items-center text-xs text-white"
        >
          Registration
        </Link>
      </div>
    </form>
  );
};
