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
      story.scenes?.[0]?.id || null
    );
  }

  return (

    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-5
        shadow-2xl
      "
    >

      <div className="mb-5 flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Мои истории
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Private drafts
          </p>

        </div>

        <button
          onClick={() =>
            addStory()
          }
          className="
            rounded-lg
            border
            border-red-500/40
            bg-red-500/10
            px-3
            py-1
            text-sm
            text-red-300
            transition-all

            hover:bg-red-500/20
            hover:text-white
          "
        >
          +
        </button>

      </div>

      {
        stories.length === 0 ? (

          <div
            className="
              rounded-xl
              border
              border-dashed
              border-zinc-700
              bg-zinc-950/60
              p-5
              text-sm
              text-zinc-500
            "
          >
            Историй пока нет. Создай первую, великий архитектор развилок.
          </div>

        ) : (

          <div className="space-y-2">

            {
              stories.map(
                (story) => (

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
                      rounded-xl
                      border
                      px-4
                      py-3
                      text-left
                      transition-all

                      ${
                        currentStoryId === story.id

                          ? `
                            border-red-500/40
                            bg-red-500/10
                            text-white
                          `

                          : `
                            border-zinc-800
                            bg-zinc-950
                            text-zinc-400

                            hover:border-zinc-700
                            hover:text-white
                          `
                      }
                    `}
                  >

                    <div className="font-medium">
                      {story.title}
                    </div>

                    <div className="mt-1 text-xs text-zinc-500">
                      {story.scenes?.length || 0} scenes
                    </div>

                  </button>
                )
              )
            }

          </div>
        )
      }

    </div>
  );
}