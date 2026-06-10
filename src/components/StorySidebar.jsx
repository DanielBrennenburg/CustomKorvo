export default function StorySidebar({

  stories,

  currentStoryId,

  setCurrentStoryId,

  setCurrentSceneId,

  addStory,

  setContextMenu,
}) {

  function selectStory(story) {

    setCurrentStoryId(
      story.id
    );

    setCurrentSceneId(
      story.startSceneId ||
      story.scenes?.[0]?.id ||
      null
    );
  }

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
            Истории
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
            Черновики
          </p>

        </div>

        <button
          onClick={() =>
            addStory()
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
          title="Создать историю"
        >
          +
        </button>

      </div>

      {
        stories.length === 0 ? (

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
            Историй пока нет. Создай первую, великий архитектор развилок.
          </div>

        ) : (

          <div className="space-y-3">

            {
              stories.map(
                (story) => {

                  const isActive =
                    currentStoryId === story.id;

                  return (

                    <button
                      key={story.id}

                      onClick={() =>
                        selectStory(story)
                      }

                      onContextMenu={(event) => {

                        event.preventDefault();

                        setContextMenu({

                          x:
                            event.clientX,

                          y:
                            event.clientY,

                          storyId:
                            story.id,
                        });
                      }}

                      className={`
                        w-full
                        rounded-2xl
                        border
                        px-4
                        py-4
                        text-left
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

                      <div
                        className="
                          truncate
                          text-base
                          font-black
                        "
                      >
                        {story.title}
                      </div>

                      <div
                        className={`
                          mt-2
                          flex
                          items-center
                          justify-between
                          text-xs
                          font-semibold

                          ${
                            isActive
                              ? "text-[#f8dca2]/85"
                              : "text-[#7a4a24]/70"
                          }
                        `}
                      >

                        <span>
                          {story.scenes?.length || 0} сцен
                        </span>

                        {
                          story.is_published && (

                            <span
                              className={`
                                rounded-full
                                px-2
                                py-1

                                ${
                                  isActive
                                    ? "bg-[#fff1cf]/15 text-[#fff1cf]"
                                    : "bg-emerald-700/15 text-emerald-800"
                                }
                              `}
                            >
                              опубликовано
                            </span>
                          )
                        }

                      </div>

                    </button>
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