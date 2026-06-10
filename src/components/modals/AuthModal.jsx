import {
  useState,
} from "react";

import { supabase }
from "../../lib/supabase";

export default function AuthModal({

  isOpen,

  setIsOpen,
}) {

  const [isLogin, setIsLogin] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  if (!isOpen) {
    return null;
  }

  function closeModal() {
    setIsOpen(false);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        const { error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) {
          throw error;
        }

        closeModal();
      } else {
        const { error } =
          await supabase.auth.signUp({
            email,
            password,
          });

        if (error) {
          throw error;
        }

        setSuccess(
          "Письмо для подтверждения отправлено на вашу почту. Проверьте входящие сообщения и перейдите по ссылке, чтобы завершить регистрацию."
        );

        setPassword("");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  }

  return (
    <div
      onMouseDown={closeModal}
      className="
        fixed
        inset-0
        z-[5000]
        flex
        items-center
        justify-center
        bg-[#1d0d06]/80
        backdrop-blur-md
      "
    >
      <div
        onMouseDown={(event) =>
          event.stopPropagation()
        }
        className="
          fantasy-panel
          fantasy-paper-edge
          relative
          w-full
          max-w-md
          rounded-3xl
          p-8
        "
      >
        <button
          type="button"
          onClick={closeModal}
          className="
            absolute
            right-5
            top-5
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-[#7a4a24]/35
            bg-[#fff0c9]/55
            text-xl
            font-black
            text-[#6b2d19]
            transition-all
            hover:bg-[#7d2d1f]
            hover:text-[#fff1cf]
          "
        >
          ×
        </button>

        <div className="mb-8 pr-10">
          <h2
            className="
              fantasy-ink-title
              text-3xl
              font-black
            "
          >
            {isLogin ? "Вход" : "Регистрация"}
          </h2>

          <p
            className="
              mt-2
              text-sm
              font-semibold
              text-[#7a4a24]/70
            "
          >
            Доступ к редактору историй
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-black
                text-[#5a2b17]
              "
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              className="
                fantasy-input
                w-full
                rounded-2xl
                px-4
                py-3
                text-base
                font-semibold
              "
            />
          </div>

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-black
                text-[#5a2b17]
              "
            >
              Пароль
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              className="
                fantasy-input
                w-full
                rounded-2xl
                px-4
                py-3
                text-base
                font-semibold
              "
            />
          </div>

          {success && (
            <div
              className="
                rounded-2xl
                border
                border-emerald-900/25
                bg-emerald-800/15
                px-4
                py-3
                text-sm
                font-semibold
                leading-relaxed
                text-emerald-950
              "
            >
              {success}
            </div>
          )}

          {error && (
            <div
              className="
                rounded-2xl
                border
                border-red-900/25
                bg-red-900/15
                px-4
                py-3
                text-sm
                font-semibold
                text-red-950
              "
            >
              {error}
            </div>
          )}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              pt-4
            "
          >
            <button
              type="button"
              onClick={switchMode}
              className="
                text-sm
                font-bold
                text-[#7a4a24]/75
                transition-all
                hover:text-[#5a1f15]
              "
            >
              {isLogin
                ? "Создать аккаунт"
                : "Уже есть аккаунт?"}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                fantasy-button
                rounded-xl
                px-6
                py-3
                text-sm
                font-black
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Подождите..."
                : isLogin
                  ? "Войти"
                  : "Зарегистрироваться"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}