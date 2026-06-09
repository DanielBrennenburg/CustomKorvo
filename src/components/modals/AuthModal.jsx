import {
  useState,
} from "react";

import { supabase }
from "../../lib/supabase";

export default function AuthModal({

  isOpen,

  setIsOpen,
}) {

  const [
    isLogin,
    setIsLogin,
  ] = useState(true);

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(
    event
  ) {

    event.preventDefault();

    setLoading(true);

    setError("");

    try {

      if (isLogin) {

        const {
          error,
        } = await supabase.auth
          .signInWithPassword({

            email,
            password,
          });

        if (error) {
          throw error;
        }

      } else {

        const {
          error,
        } = await supabase.auth
          .signUp({

            email,
            password,
          });

        if (error) {
          throw error;
        }
      }

      setIsOpen(false);

    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[5000]

        flex
        items-center
        justify-center

        bg-black/80
        backdrop-blur-md
      "
    >

      <div
        className="
          w-full
          max-w-md

          rounded-3xl

          border
          border-zinc-800

          bg-zinc-950

          p-8

          shadow-[0_0_60px_rgba(0,0,0,0.7)]
        "
      >

        {/* TITLE */}

        <div className="mb-8">

          <h2
            className="
              text-3xl
              font-black
              text-white
            "
          >

            {
              isLogin

                ? "Welcome Back"

                : "Create Account"
            }

          </h2>

          <p
            className="
              mt-2
              text-sm
              text-zinc-500
            "
          >

            StoryMaze author access

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }

          className="
            space-y-5
          "
        >

          {/* EMAIL */}

          <div>

            <label
              className="
                mb-2
                block

                text-sm
                font-medium

                text-zinc-400
              "
            >

              Email

            </label>

            <input

              type="email"

              value={email}

              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }

              required

              className="
                w-full

                rounded-2xl

                border
                border-zinc-700

                bg-zinc-900

                px-4
                py-3

                text-white

                outline-none

                transition-all

                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/20
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label
              className="
                mb-2
                block

                text-sm
                font-medium

                text-zinc-400
              "
            >

              Password

            </label>

            <input

              type="password"

              value={password}

              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }

              required

              className="
                w-full

                rounded-2xl

                border
                border-zinc-700

                bg-zinc-900

                px-4
                py-3

                text-white

                outline-none

                transition-all

                focus:border-red-500
                focus:ring-2
                focus:ring-red-500/20
              "
            />

          </div>

          {/* ERROR */}

          {
            error && (

              <div
                className="
                  rounded-2xl

                  border
                  border-red-500/30

                  bg-red-500/10

                  px-4
                  py-3

                  text-sm
                  text-red-300
                "
              >

                {error}

              </div>
            )
          }

          {/* ACTIONS */}

          <div
            className="
              flex
              items-center
              justify-between

              pt-4
            "
          >

            <button

              type="button"

              onClick={() =>
                setIsLogin(
                  !isLogin
                )
              }

              className="
                text-sm
                text-zinc-500

                transition-all

                hover:text-white
              "
            >

              {
                isLogin

                  ? "Create account"

                  : "Already registered?"
              }

            </button>

            <button

              type="submit"

              disabled={loading}

              className="
                rounded-2xl

                border
                border-red-500/30

                bg-red-500/10

                px-6
                py-3

                text-sm
                font-semibold
                text-red-300

                transition-all

                hover:border-red-400
                hover:bg-red-500/20
                hover:text-white

                disabled:opacity-50
              "
            >

              {
                loading

                  ? "Please wait..."

                  : isLogin
                    ? "Login"
                    : "Register"
              }

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}