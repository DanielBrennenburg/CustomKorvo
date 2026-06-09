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

  function openStory(
    story
  ) {

    setCurrentStoryId(
      story.id
    );

    setCurrentSceneId(

      story.scenes?.[0]
        ?.id

      || null
    );

    setIsOpen(
      false
    );
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

        bg-black/80
        backdrop-blur-md
      "
    >

      <div
        className="
          w-full
          max-w-6xl

          rounded-3xl
          border
          border-zinc-800

          bg-zinc-950

          p-8

          shadow-[0_0_80px_rgba(0,0,0,0.7)]
        "
      >

        {/* HEADER */}

        <div
          className="
            mb-8
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-3xl
                font-black
                text-white
              "
            >

              Личный кабинет

            </h2>

            <p
              className="
                mt-2
                text-sm
                text-zinc-500
              "
            >

              Private drafts
              and published stories.

            </p>

          </div>

          <button

            onClick={() =>
              setIsOpen(
                false
              )
            }

            className="
              rounded-2xl
              border
              border-zinc-700

              bg-zinc-900

              px-5
              py-3

              text-sm
              text-zinc-300

              transition-all

              hover:bg-zinc-800
              hover:text-white
            "
          >

            Close

          </button>

        </div>

        {/* ACTIONS */}

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
              rounded-2xl
              border
              border-red-500/40

              bg-red-500/10

              px-5
              py-3

              text-sm
              font-semibold
              text-red-300

              transition-all

              hover:bg-red-500/20
              hover:text-white
            "
          >

            + New Story

          </button>

        </div>

        {/* EMPTY */}

        {
          stories.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-zinc-700

                p-10

                text-center
                text-zinc-500
              "
            >

              Историй пока нет.
              Пустота смотрит на тебя,
              а ты на неё.

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
                  (story) => (

                    <div
                      key={story.id}

                      className={`
                        rounded-2xl
                        border
                        p-5
                        transition-all

                        ${
                          currentStoryId ===
                          story.id

                            ? `
                              border-red-500/40
                              bg-red-500/10
                            `

                            : `
                              border-zinc-800
                              bg-zinc-900

                              hover:border-zinc-700
                            `
                        }
                      `}
                    >

                      {/* TOP */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >

                        <div>

                          <h3
                            className="
                              text-lg
                              font-bold
                              text-white
                            "
                          >

                            {story.title}

                          </h3>

                          <div
                            className="
                              mt-2
                              text-xs
                              text-zinc-500
                            "
                          >

                            {
                              story.scenes
                                ?.length || 0
                            }
                            {" "}
                            scenes

                          </div>

                          <div
                            className="
                              mt-1
                              text-xs
                              text-zinc-500
                            "
                          >

                            {
                              story.links
                                ?.length || 0
                            }
                            {" "}
                            links

                          </div>

                        </div>

                        {/* STATUS */}

                        <div
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-bold

                            ${
                              story.is_published

                                ? `
                                  border
                                  border-emerald-500/30
                                  bg-emerald-500/10
                                  text-emerald-300
                                `

                                : `
                                  border
                                  border-zinc-700
                                  bg-zinc-800
                                  text-zinc-400
                                `
                            }
                          `}
                        >

                          {
                            story.is_published

                              ? "Published"

                              : "Draft"
                          }

                        </div>

                      </div>

                      {/* FOOTER */}

                      <div
                        className="
                          mt-6
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        {/* OPEN */}

                        <button

                          onClick={() =>
                            openStory(
                              story
                            )
                          }

                          className="
                            rounded-xl
                            border
                            border-zinc-700

                            bg-zinc-950

                            px-4
                            py-2

                            text-sm
                            text-zinc-300

                            transition-all

                            hover:border-white/20
                            hover:text-white
                          "
                        >

                          Open

                        </button>

                        {/* PUBLISH */}

                        <button

                          onClick={(event) => {

                            event.stopPropagation();

                            togglePublishStory(
                              story.id
                            );
                          }}

                          className={`
                            rounded-xl
                            px-4
                            py-2

                            text-sm
                            font-semibold

                            transition-all

                            ${
                              story.is_published

                                ? `
                                  border
                                  border-yellow-500/30
                                  bg-yellow-500/10
                                  text-yellow-300

                                  hover:bg-yellow-500/20
                                `

                                : `
                                  border
                                  border-emerald-500/30
                                  bg-emerald-500/10
                                  text-emerald-300

                                  hover:bg-emerald-500/20
                                `
                            }
                          `}
                        >

                          {
                            story.is_published

                              ? "Unpublish"

                              : "Publish"
                          }

                        </button>

                      </div>

                    </div>
                  )
                )
              }

            </div>
          )
        }

      </div>

    </div>
  );
}