"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error signing up!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.email.length > 1 &&
      user.password.length > 1
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  return (
    <div className="h-full">
      <section className="rounded-md h-[500px] w-[400px] p-2 my-[100px] mx-[450px] bg-zinc-600">
        <div className="flex items-center justify-center my-3">
          <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2"></div>
            <h2 className="text-2xl font-bold leading-tight">
              {setLoading ? "Processing" : "Sign Up"}
            </h2>
            <p className="mt-2 text-base text-black">
              Already have an account ?{" "}
              <Link href="/login" className="text-blue-500">
                Sign In
              </Link>
            </p>
            <form className="mt-5">
              <div className="space-y-4">
                <div>
                  <label className="text-base font-medium text-white">
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Full Name"
                      type="text"
                      value={user.username}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      name="username"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-base font-medium text-white">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Email"
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      name="email"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-white">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Password"
                      type="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      name="password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={signup}
                    className="inline-flex w-full items-center justify-center rounded-md bg-sky-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    type="button"
                  >
                    {buttonDisabled ? "Fill the details" : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
