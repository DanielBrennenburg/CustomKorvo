import StoryGraphEditor
from "../StoryGraphEditor";

export default function GraphModal({

  isGraphOpen,

  setIsGraphOpen,

  currentStory,

  scenes,

  links,

  currentSceneId,

  setCurrentSceneId,

  updateScenePosition,

  createLink,

  deleteLink,

  updateLinkLabel,

  addScene,
}) {

  // CLOSED

  if (!isGraphOpen) {
    return null;
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[3000]

        flex
        items-center
        justify-center

        bg-black/80
        backdrop-blur-md
      "
    >

      {/* WINDOW */}

      <div
        className="
          relative

          flex
          h-[92vh]
          w-[95vw]
          flex-col

          overflow-hidden

          rounded-[32px]

          border
          border-zinc-800

          bg-zinc-950

          shadow-[0_0_100px_rgba(0,0,0,0.7)]
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-zinc-800

            px-8
            py-5
          "
        >

          {/* LEFT */}

          <div>

            <h2
              className="
                text-2xl
                font-black
                text-white
              "
            >

              Визуальная карта

            </h2>

            <p
              className="
                mt-1
                text-sm
                text-zinc-500
              "
            >

              {
                currentStory?.title
                || "Untitled Story"
              }

            </p>

          </div>

          {/* RIGHT */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* HELP */}

            <div
              className="
                hidden
                rounded-2xl

                border
                border-zinc-800

                bg-zinc-900/70

                px-5
                py-3

                text-xs
                leading-relaxed
                text-zinc-500

                xl:block
              "
            >

              Развлекайтесь

            </div>

            {/* CLOSE */}

            <button

              onClick={() =>
                setIsGraphOpen(
                  false
                )
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

                hover:border-red-500/50
                hover:bg-red-500/10
                hover:text-white
              "
            >

              Close

            </button>

          </div>

        </div>

        {/* GRAPH */}

        <div
          className="
            relative
            flex-1
            overflow-hidden
          "
        >

          <StoryGraphEditor

            scenes={scenes}

            links={links}

            currentSceneId={
              currentSceneId
            }

            setCurrentSceneId={
              setCurrentSceneId
            }

            updateScenePosition={
              updateScenePosition
            }

            createLink={
              createLink
            }

            deleteLink={
              deleteLink
            }

            updateLinkLabel={
              updateLinkLabel
            }

            addScene={
              addScene
            }
          />

        </div>

      </div>

    </div>
  );
}