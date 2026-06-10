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
        border-[#3b1b0d]

        bg-[#4a2414]/95

        px-6
        py-4

        shadow-[0_8px_30px_rgba(39,15,6,0.45)]

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
          gap-6
        "
      >

        {/* BRAND */}

        <div>

          <h1
            className="
              fantasy-title
              text-3xl
              font-black
              tracking-tight
            "
          >

            CustomKorvo

          </h1>

          <p
            className="
              mt-1
              text-sm
              text-[#e8c98d]/75
            "
          >

            Создавай интерактивные истории

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

          <button

            onClick={
              onLibrary
            }

            className="
              fantasy-button
              rounded-xl
              px-5
              py-3
              text-sm
              font-bold
            "
          >

            Библиотека

          </button>

          <label
            className="
              fantasy-button
              cursor-pointer
              rounded-xl
              px-5
              py-3
              text-sm
              font-bold
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

          <button

            onClick={
              onExport
            }

            className="
              fantasy-button
              fantasy-button-green
              rounded-xl
              px-5
              py-3
              text-sm
              font-bold
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

                <button

                  onClick={
                    onDashboard
                  }

                  className="
                    fantasy-button
                    rounded-xl
                    px-5
                    py-3
                    text-sm
                    font-bold
                  "
                >

                  Кабинет

                </button>

                <div
                  className="
                    max-w-[220px]
                    truncate

                    rounded-xl
                    border
                    border-[#e8c98d]/25

                    bg-[#2d160b]/70

                    px-4
                    py-3

                    text-sm
                    text-[#f5dfb2]
                  "
                >

                  {user.email}

                </div>

                <button

                  onClick={
                    onLogout
                  }

                  className="
                    fantasy-button
                    fantasy-button-red
                    rounded-xl
                    px-5
                    py-3
                    text-sm
                    font-bold
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
                  fantasy-button
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-bold
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