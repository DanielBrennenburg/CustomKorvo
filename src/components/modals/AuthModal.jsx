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
        bg-black/80
        backdrop-blur-md
      "
    >
      <div
        onMouseDown={(event) =>
          event.stopPropagation()
        }
        className="
          relative
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
            border-zinc-700
            bg-zinc-900
            text-zinc-400
            transition-all
            hover:border-red-500/40
            hover:bg-red-500/10
            hover:text-white
          "
        >
          ×
        </button>

        <div className="mb-8 pr-10">
          <h2 className="text-3xl font-black text-white">
            {isLogin ? "Вход" : "Регистрация"}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Доступ к редактору историй
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
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

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-400">
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

          {success && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm leading-relaxed text-emerald-300">
              {success}
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={switchMode}
              className="
                text-sm
                text-zinc-500
                transition-all
                hover:text-white
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