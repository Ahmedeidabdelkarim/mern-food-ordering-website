"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState("");

  const params = useSearchParams();
  const oauthError = params.get("error");

  async function handleFormSubmit(e) {
    e.preventDefault();

    setLoginInProgress(true);
    setLoginError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError("Invalid email or password");
        setLoginInProgress(false);
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong. Please try again.");
      setLoginInProgress(false);
    }
  }

  async function handleGoogleLogin() {
    setLoginInProgress(true);

    await signIn("google", {
      callbackUrl: "/",
      redirect: true,
    });
  }

  return (
    <section className="my-8">
      <h1 className="text-4xl text-center text-primary mb-4">
        Login
      </h1>

      {oauthError === "OAuthAccountNotLinked" && (
        <div className="text-red-500 text-center mb-4">
          This email is already registered with email and password.
          Please login using your email and password.
        </div>
      )}

      {loginError && (
        <div className="text-red-500 text-center mb-4">
          {loginError}
        </div>
      )}

      <form
        className="block max-w-xs mx-auto"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          disabled={loginInProgress}
          value={email}
          id="email"
          placeholder="Email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          disabled={loginInProgress}
          value={password}
          id="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loginInProgress}
        >
          {loginInProgress ? "Logging in..." : "Login"}
        </button>

        <div className="my-4 text-center text-gray-400">
          or login with provider
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loginInProgress}
          className="flex gap-4 justify-center"
        >
          <Image
            src="/google.png"
            alt="Google logo"
            width={24}
            height={24}
            style={{ width: "auto", height: "24px" }}
          />

          Login with google
        </button>
      </form>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
