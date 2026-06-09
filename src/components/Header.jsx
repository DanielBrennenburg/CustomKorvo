export default function Header({

  onImport,

  onExport,

  onLibrary,

  user,

  onLogin,

  onLogout,

  onDashboard,
}) {

  return (

    <header
      className="
        border-b
        border-zinc-800

        bg-zinc-950/90

        px-6
        py-4

        backdrop-blur-md
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-[1800px]
          items-center
          justify-between
        "
      >

        {/* BRAND */}

        <div>

          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-white
            "
          >

            CustomKorvo

          </h1>

          <p
            className="
              mt-1
              text-sm
              text-zinc-500
            "
          >

            Корво спит с мальчиками

          </p>

        </div>

        {/* CENTER ACTIONS */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* LIBRARY */}

          <button

            onClick={
              onLibrary
            }

            className="
              rounded-2xl
              border
              border-zinc-700

              bg-zinc-900/70

              px-5
              py-3

              text-sm
              font-medium
              text-zinc-300

              transition-all

              hover:border-white/20
              hover:bg-zinc-800
              hover:text-white
            "
          >

            Библиотека

          </button>

          {/* IMPORT */}

          <label
            className="
              cursor-pointer

              rounded-2xl
              border
              border-zinc-700

              bg-zinc-900/70

              px-5
              py-3

              text-sm
              font-medium
              text-zinc-300

              transition-all

              hover:border-white/20
              hover:bg-zinc-800
              hover:text-white
            "
          >

            Импорт

            <input

              type="file"

              accept="
                .json,
                .storymaze,
                .storymaze.json
              "

              hidden

              onChange={
                onImport
              }
            />

          </label>

          {/* EXPORT */}

          <button

            onClick={
              onExport
            }

            className="
              rounded-2xl
              border
              border-emerald-500/30

              bg-emerald-500/10

              px-5
              py-3

              text-sm
              font-semibold
              text-emerald-300

              transition-all

              hover:border-emerald-400
              hover:bg-emerald-500/20
              hover:text-white
            "
          >

            Экспорт

          </button>

        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          {
            user ? (

              <>

                {/* DASHBOARD */}

                <button

                  onClick={
                    onDashboard
                  }

                  className="
                    rounded-2xl
                    border
                    border-zinc-700

                    bg-zinc-900/70

                    px-5
                    py-3

                    text-sm
                    font-medium
                    text-zinc-300

                    transition-all

                    hover:border-red-500/40
                    hover:bg-red-500/10
                    hover:text-white
                  "
                >

                  Борда

                </button>

                {/* USER */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-zinc-800

                    bg-zinc-900/70

                    px-4
                    py-3

                    text-sm
                    text-zinc-400
                  "
                >

                  {user.email}

                </div>

                {/* LOGOUT */}

                <button

                  onClick={
                    onLogout
                  }

                  className="
                    rounded-2xl
                    border
                    border-red-500/30

                    bg-red-500/10

                    px-5
                    py-3

                    text-sm
                    font-semibold
                    text-red-300

                    transition-all

                    hover:border-red-400
                    hover:bg-red-500/20
                    hover:text-white
                  "
                >

                  Выйти

                </button>

              </>

            ) : (

              <button

                onClick={
                  onLogin
                }

                className="
                  rounded-2xl
                  border
                  border-zinc-700

                  bg-zinc-900/70

                  px-5
                  py-3

                  text-sm
                  font-medium
                  text-zinc-300

                  transition-all

                  hover:border-red-500/40
                  hover:bg-red-500/10
                  hover:text-white
                "
              >

                Войти

              </button>
            )
          }

        </div>

      </div>

    </header>
  );
}