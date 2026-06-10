export default function SceneList({

  scenes,

  currentSceneId,

  setCurrentSceneId,

  addScene,

  deleteScene,
}) {

  return (

    <aside
      className="
        fantasy-panel
        fantasy-paper-edge

        rounded-3xl
        p-5
      "
    >

      <div
        className="
          mb-5
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <h2
            className="
              fantasy-ink-title
              text-2xl
              font-black
            "
          >
            Сцены
          </h2>

          <p
            className="
              mt-1
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#7a4a24]/70
            "
          >
            Главы истории
          </p>

        </div>

        <button
          onClick={() =>
            addScene()
          }
          className="
            fantasy-button
            rounded-xl
            px-4
            py-2
            text-lg
            font-black
            leading-none
          "
          title="Создать сцену"
        >
          +
        </button>

      </div>

      {
        scenes.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-[#7a4a24]/40
              bg-[#fff0c9]/45
              p-5
              text-sm
              leading-relaxed
              text-[#6a3a1d]
            "
          >
            В этой истории пока нет сцен.
          </div>

        ) : (

          <div
            className="
              max-h-[calc(100vh-230px)]
              space-y-3
              overflow-y-auto
              pr-1
            "
          >

            {
              scenes.map(
                (scene, index) => {

                  const isActive =
                    currentSceneId === scene.id;

                  return (

                    <div
                      key={scene.id}
                      className={`
                        group
                        rounded-2xl
                        border
                        transition-all

                        ${
                          isActive

                            ? `
                              border-[#7d2d1f]
                              bg-[#7d2d1f]/90
                              text-[#fff1cf]
                              shadow-[0_8px_22px_rgba(71,28,12,0.28)]
                            `

                            : `
                              border-[#7a4a24]/30
                              bg-[#fff0c9]/45
                              text-[#4b2612]

                              hover:border-[#7d2d1f]/50
                              hover:bg-[#fff7df]/70
                            `
                        }
                      `}
                    >

                      <button
                        onClick={() =>
                          setCurrentSceneId(
                            scene.id
                          )
                        }
                        className="
                          w-full
                          px-4
                          py-4
                          text-left
                        "
                      >

                        <div
                          className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >

                          <div className="min-w-0">

                            <div
                              className="
                                truncate
                                text-base
                                font-black
                              "
                            >
                              {scene.title}
                            </div>

                            <div
                              className={`
                                mt-2
                                text-xs
                                font-semibold

                                ${
                                  isActive
                                    ? "text-[#f8dca2]/85"
                                    : "text-[#7a4a24]/70"
                                }
                              `}
                            >
                              Сцена {index + 1}
                            </div>

                          </div>

                          <div
                            className={`
                              shrink-0
                              rounded-full
                              px-2
                              py-1
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.12em]

                              ${
                                isActive
                                  ? "bg-[#fff1cf]/15 text-[#fff1cf]"
                                  : "bg-[#7a4a24]/10 text-[#7a4a24]/70"
                              }
                            `}
                          >
                            {scene.type || "сцена"}
                          </div>

                        </div>

                      </button>

                      <div
                        className="
                          flex
                          justify-end
                          px-4
                          pb-3
                        "
                      >

                        <button
                          onClick={(event) => {

                            event.stopPropagation();

                            deleteScene(
                              scene.id
                            );
                          }}
                          className={`
                            rounded-lg
                            px-3
                            py-1
                            text-xs
                            font-bold
                            transition-all

                            ${
                              isActive
                                ? `
                                  bg-[#fff1cf]/15
                                  text-[#fff1cf]

                                  hover:bg-red-900/40
                                `
                                : `
                                  bg-red-900/10
                                  text-red-900/70

                                  hover:bg-red-900/20
                                  hover:text-red-900
                                `
                            }
                          `}
                        >
                          Удалить
                        </button>

                      </div>

                    </div>
                  );
                }
              )
            }

          </div>
        )
      }

    </aside>
  );
}