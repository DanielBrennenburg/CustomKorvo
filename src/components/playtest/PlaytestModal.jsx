import {
  useEffect,
  useMemo,
  useState,
} from "react";

export default function PlaytestModal({

  isOpen,

  setIsOpen,

  currentStory,

  scenes,

  links,
}) {

  const startScene =
    useMemo(() => {

      if (!currentStory) {
        return scenes[0] || null;
      }

      const customStartScene =
        scenes.find(
          (scene) =>
            scene.id === currentStory.startSceneId
        );

      return (
        customStartScene ||
        scenes[0] ||
        null
      );

    }, [
      currentStory,
      scenes,
    ]);

  const [
    currentSceneId,
    setCurrentSceneId,
  ] = useState(null);

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    setCurrentSceneId(
      startScene?.id || null
    );

  }, [
    isOpen,
    startScene,
  ]);

  if (!isOpen) {
    return null;
  }

  const currentScene =
    scenes.find(
      (scene) =>
        scene.id === currentSceneId
    );

  const availableLinks =
    links.filter(
      (link) =>
        link.from === currentSceneId
    );

  function goToScene(sceneId) {
    setCurrentSceneId(sceneId);
  }

  function restartStory() {
    setCurrentSceneId(
      startScene?.id || null
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

        bg-[#1d0d06]/85
        backdrop-blur-md
      "
    >

      <div
        className="
          fantasy-panel
          fantasy-paper-edge

          flex
          max-h-[90vh]
          w-full
          max-w-[900px]
          flex-col
          overflow-hidden

          rounded-3xl
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-5

            border-b
            border-[#7a4a24]/25

            px-8
            py-6
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
              ▶ Тест истории
            </h2>

            <p
              className="
                mt-2
                text-sm
                font-semibold
                text-[#7a4a24]/70
              "
            >
              Проверь прохождение выбранной истории.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={restartStory}
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
              Сначала
            </button>

            <button
              onClick={() =>
                setIsOpen(false)
              }
              className="
                fantasy-button
                fantasy-button-red
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

        </div>

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

                <h1
                  className="
                    fantasy-ink-title
                    text-4xl
                    font-black
                  "
                >
                  {currentScene.title}
                </h1>

                <div
                  className="
                    mt-8
                    rounded-3xl
                    border
                    border-[#7a4a24]/25
                    bg-[#fff0c9]/45
                    p-7

                    whitespace-pre-wrap

                    text-lg
                    leading-9
                    text-[#3f2312]
                  "
                >
                  {
                    currentScene.content ||
                    "Пустая сцена."
                  }
                </div>

                <div
                  className="
                    mt-10
                    space-y-4
                  "
                >

                  {
                    availableLinks.length === 0 && (

                      <div
                        className="
                          rounded-2xl
                          border
                          border-[#7a4a24]/30
                          bg-[#5a2b17]/10
                          px-6
                          py-5
                          text-sm
                          font-black
                          text-[#7a4a24]/75
                        "
                      >
                        Конец истории.
                      </div>
                    )
                  }

                  {
                    availableLinks.map(
                      (link) => {

                        const targetScene =
                          scenes.find(
                            (scene) =>
                              scene.id === link.to
                          );

                        if (!targetScene) {
                          return null;
                        }

                        return (

                          <button
                            key={`${link.from}-${link.to}`}
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
                              border-[#7d2d1f]/35

                              bg-[#7d2d1f]/90

                              px-6
                              py-5

                              text-left
                              text-[#fff1cf]

                              shadow-[0_8px_22px_rgba(71,28,12,0.22)]

                              transition-all

                              hover:translate-y-[-1px]
                              hover:bg-[#8e3929]
                            "
                          >

                            <div
                              className="
                                text-lg
                                font-black
                              "
                            >
                              {
                                link.label ||
                                "Продолжить"
                              }
                            </div>

                            <div
                              className="
                                mt-2
                                text-sm
                                font-semibold
                                text-[#f8dca2]/85
                              "
                            >
                              → {targetScene.title}
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
                Нет доступных сцен.
              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}