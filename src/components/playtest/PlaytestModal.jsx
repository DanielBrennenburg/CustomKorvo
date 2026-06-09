import {
  useEffect,
  useMemo,
  useState,
} from "react";

export default function PlaytestModal({

  isOpen,

  setIsOpen,

  scenes,

  links,
}) {

  // START SCENE

  const startScene =
    useMemo(() => {

      return scenes[0]
        || null;

    }, [scenes]);

  // CURRENT SCENE

  const [currentSceneId,
    setCurrentSceneId] =
    useState(null);

  // RESET ON OPEN

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    setCurrentSceneId(
      startScene?.id
      || null
    );

  }, [
    isOpen,
    startScene,
  ]);

  // CLOSED

  if (!isOpen) {
    return null;
  }

  // CURRENT SCENE OBJECT

  const currentScene =
    scenes.find(
      (scene) =>

        scene.id ===
        currentSceneId
    );

  // AVAILABLE CHOICES

  const availableLinks =

    links.filter(
      (link) =>

        link.from ===
        currentSceneId
    );

  // GO TO NEXT SCENE

  function goToScene(
    sceneId
  ) {

    setCurrentSceneId(
      sceneId
    );
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[4000]

        flex
        items-center
        justify-center

        bg-black/90
        backdrop-blur-md
      "
    >

      {/* WINDOW */}

      <div
        className="
          relative

          flex
          max-h-[90vh]
          w-full
          max-w-[900px]
          flex-col

          overflow-hidden

          rounded-3xl
          border
          border-zinc-800

          bg-zinc-950

          shadow-[0_0_80px_rgba(0,0,0,0.7)]
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

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-white
              "
            >

              ▶ Playtest Mode

            </h2>

            <p
              className="
                mt-1
                text-sm
                text-zinc-400
              "
            >

              Simulate your
              narrative flow.

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

        {/* CONTENT */}

        <div
          className="
            flex-1
            overflow-y-auto

            px-10
            py-10
          "
        >

          {
            currentScene ? (

              <>

                {/* TITLE */}

                <h1
                  className="
                    text-4xl
                    font-bold
                    text-white
                  "
                >

                  {
                    currentScene.title
                  }

                </h1>

                {/* BODY */}

                <div
                  className="
                    mt-8

                    whitespace-pre-wrap

                    text-lg
                    leading-relaxed
                    text-zinc-300
                  "
                >

                  {
                    currentScene.content
                    || "Empty scene."
                  }

                </div>

                {/* CHOICES */}

                <div
                  className="
                    mt-12
                    space-y-4
                  "
                >

                  {
                    availableLinks
                      .length === 0 && (

                      <div
                        className="
                          rounded-2xl
                          border
                          border-zinc-800

                          bg-zinc-900/50

                          px-6
                          py-5

                          text-zinc-400
                        "
                      >

                        End of story.

                      </div>
                    )
                  }

                  {
                    availableLinks.map(
                      (link) => {

                        const targetScene =
                          scenes.find(
                            (scene) =>

                              scene.id ===
                              link.to
                          );

                        if (
                          !targetScene
                        ) {
                          return null;
                        }

                        return (

                          <button

                            key={
                              `${link.from}-${link.to}`
                            }

                            onClick={() =>
                              goToScene(
                                targetScene.id
                              )
                            }

                            className="
                              block
                              w-full

                              rounded-2xl
                              border
                              border-red-500/30

                              bg-red-500/10

                              px-6
                              py-5

                              text-left

                              transition-all

                              hover:border-red-400
                              hover:bg-red-500/20
                            "
                          >

                            <div
                              className="
                                text-lg
                                font-semibold
                                text-white
                              "
                            >

                              {
                                link.label
                                || "Continue"
                              }

                            </div>

                            <div
                              className="
                                mt-2
                                text-sm
                                text-zinc-400
                              "
                            >

                              →
                              {" "}
                              {
                                targetScene.title
                              }

                            </div>

                          </button>
                        );
                      }
                    )
                  }

                </div>

              </>

            ) : (

              <div
                className="
                  flex
                  items-center
                  justify-center

                  py-32

                  text-zinc-500
                "
              >

                No scenes available.

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}