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

        bg-[#1d0d06]/85
        backdrop-blur-md
      "
    >

      <div
        className="
          fantasy-panel-dark

          relative

          flex
          h-[92vh]
          w-[95vw]
          flex-col

          overflow-hidden

          rounded-[32px]
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-5

            border-b
            border-[#e8c98d]/15

            px-8
            py-5
          "
        >

          <div>

            <h2
              className="
                fantasy-title
                text-3xl
                font-black
              "
            >
              Визуальная карта
            </h2>

            <p
              className="
                mt-1
                text-sm
                font-semibold
                text-[#e8c98d]/70
              "
            >
              {
                currentStory?.title
                || "Безымянная история"
              }
            </p>

          </div>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                hidden
                rounded-2xl
                border
                border-[#e8c98d]/15
                bg-[#2d160b]/60
                px-5
                py-3
                text-xs
                font-semibold
                leading-relaxed
                text-[#e8c98d]/65
                xl:block
              "
            >
              Перетаскивай сцены, соединяй их и строй развилки.
            </div>

            <button
              onClick={() =>
                setIsGraphOpen(false)
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
            relative
            flex-1
            overflow-hidden
            bg-[#160b05]
          "
        >

          <StoryGraphEditor
            scenes={scenes}
            links={links}
            currentSceneId={currentSceneId}
            setCurrentSceneId={setCurrentSceneId}
            updateScenePosition={updateScenePosition}
            createLink={createLink}
            deleteLink={deleteLink}
            updateLinkLabel={updateLinkLabel}
            addScene={addScene}
          />

        </div>

      </div>

    </div>
  );
}