export default function DashboardModal({

  isOpen,

  setIsOpen,

  stories,

  currentStoryId,

  setCurrentStoryId,

  setCurrentSceneId,

  addStory,

  togglePublishStory,
}) {

  if (!isOpen) {
    return null;
  }

  function openStory(story) {

    setCurrentStoryId(
      story.id
    );

    setCurrentSceneId(
      story.startSceneId ||
      story.scenes?.[0]?.id ||
      null
    );

    setIsOpen(false);
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[4500]

        flex
        items-center
        justify-center

        bg-[#1d0d06]/80
        backdrop-blur-md
      "
    >

      <div
        className="
          fantasy-panel
          fantasy-paper-edge

          max-h-[90vh]
          w-full
          max-w-6xl
          overflow-y-auto

          rounded-3xl
          p-8
        "
      >

        <div
          className="
            mb-8
            flex
            items-start
            justify-between
            gap-5
          "
        >

          <div>

            <h2
              className="
                fantasy-ink-title
                text-3xl
                font-black
              "
            >
              Личный кабинет
            </h2>

            <p
              className="
                mt-2
                text-sm
                font-semibold
                text-[#7a4a24]/70
              "
            >
              Черновики и опубликованные истории.
            </p>

          </div>

          <button
            onClick={() =>
              setIsOpen(false)
            }
            className="
              fantasy-button
              rounded-xl
              px-5
              py-3
              text-sm
              font-black
            "
          >
            Закрыть
          </button>

        </div>

        <div
          className="
            mb-6
            flex
            justify-end
          "
        >

          <button
            onClick={() =>
              addStory()
            }
            className="
              fantasy-button
              fantasy-button-green
              rounded-xl
              px-5
              py-3
              text-sm
              font-black
            "
          >
            + Новая история
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
                p-10
                text-center
                text-sm
                font-semibold
                text-[#7a4a24]/70
              "
            >
              Историй пока нет. Пустота смотрит на тебя, а ты на неё.
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-3
                gap-4
              "
            >

              {
                stories.map(
                  (story) => {

                    const isActive =
                      currentStoryId === story.id;

                    return (

                      <div
                        key={story.id}
                        className={`
                          rounded-3xl
                          border
                          p-5
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
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                        >

                          <div className="min-w-0">

                            <h3
                              className="
                                truncate
                                text-lg
                                font-black
                              "
                            >
                              {story.title}
                            </h3>

                            <div
                              className={`
                                mt-3
                                text-xs
                                font-semibold

                                ${
                                  isActive
                                    ? "text-[#f8dca2]/85"
                                    : "text-[#7a4a24]/70"
                                }
                              `}
                            >
                              {story.scenes?.length || 0} сцен
                            </div>

                            <div
                              className={`
                                mt-1
                                text-xs
                                font-semibold

                                ${
                                  isActive
                                    ? "text-[#f8dca2]/85"
                                    : "text-[#7a4a24]/70"
                                }
                              `}
                            >
                              {story.links?.length || 0} переходов
                            </div>

                          </div>

                          <div
                            className={`
                              shrink-0
                              rounded-full
                              border
                              px-3
                              py-1
                              text-xs
                              font-black

                              ${
                                story.is_published

                                  ? isActive
                                    ? `
                                      border-[#fff1cf]/25
                                      bg-[#fff1cf]/15
                                      text-[#fff1cf]
                                    `
                                    : `
                                      border-emerald-900/20
                                      bg-emerald-800/15
                                      text-emerald-950
                                    `

                                  : isActive
                                    ? `
                                      border-[#fff1cf]/20
                                      bg-[#fff1cf]/10
                                      text-[#f8dca2]
                                    `
                                    : `
                                      border-[#7a4a24]/25
                                      bg-[#7a4a24]/10
                                      text-[#7a4a24]/70
                                    `
                              }
                            `}
                          >
                            {
                              story.is_published
                                ? "Опубликовано"
                                : "Черновик"
                            }
                          </div>

                        </div>

                        <div
                          className="
                            mt-6
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >

                          <button
                            onClick={() =>
                              openStory(story)
                            }
                            className="
                              fantasy-button
                              rounded-xl
                              px-4
                              py-2
                              text-sm
                              font-black
                            "
                          >
                            Открыть
                          </button>

                          <button
                            onClick={(event) => {

                              event.stopPropagation();

                              togglePublishStory(
                                story.id
                              );
                            }}
                            className={`
                              rounded-xl
                              border
                              px-4
                              py-2
                              text-sm
                              font-black
                              transition-all

                              ${
                                story.is_published

                                  ? `
                                    border-yellow-900/25
                                    bg-yellow-800/15
                                    text-yellow-950

                                    hover:bg-yellow-800/25
                                  `

                                  : `
                                    border-emerald-900/25
                                    bg-emerald-800/15
                                    text-emerald-950

                                    hover:bg-emerald-800/25
                                  `
                              }
                            `}
                          >
                            {
                              story.is_published
                                ? "Снять"
                                : "Опубликовать"
                            }
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

      </div>

    </div>
  );
}