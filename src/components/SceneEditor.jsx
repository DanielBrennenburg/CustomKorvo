import {
  useState,
} from "react";

export default function SceneEditor({

  scene,

  links,

  scenes,

  currentStory,

  updateScene,

  updateLinkLabel,

  createLink,

  setStartScene,
}) {

  const [
    newChoiceLabel,
    setNewChoiceLabel,
  ] = useState("");

  const [
    targetSceneId,
    setTargetSceneId,
  ] = useState("");

  if (!scene) {
    return null;
  }

  const outgoingLinks =
    links.filter(
      (link) =>
        link.from === scene.id
    );

  const availableTargetScenes =
    scenes.filter(
      (targetScene) =>
        targetScene.id !== scene.id
    );

  const isStartScene =
    currentStory?.startSceneId === scene.id;

  function handleTitleChange(event) {
    updateScene(
      scene.id,
      {
        title:
          event.target.value,
      }
    );
  }

  function handleContentChange(event) {
    updateScene(
      scene.id,
      {
        content:
          event.target.value,
      }
    );
  }

  function handleAddChoice() {
    if (!targetSceneId) {
      return;
    }

    createLink(
      scene.id,
      targetSceneId
    );

    if (newChoiceLabel.trim()) {
      updateLinkLabel(
        scene.id,
        targetSceneId,
        newChoiceLabel.trim()
      );
    }

    setNewChoiceLabel("");
    setTargetSceneId("");
  }

  return (

    <section
      className="
        fantasy-panel
        fantasy-paper-edge
        rounded-3xl
        p-7
      "
    >

      <div
        className="
          mb-7
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
            Редактор сцены
          </h2>

          <p
            className="
              mt-2
              text-sm
              font-semibold
              text-[#7a4a24]/70
            "
          >
            Пиши текст, добавляй выборы и собирай развилки.
          </p>

        </div>

        <div
          className="
            flex
            flex-col
            items-end
            gap-3
          "
        >

          {
            isStartScene ? (

              <div
                className="
                  rounded-xl
                  border
                  border-emerald-800/25
                  bg-emerald-800/15
                  px-4
                  py-2
                  text-xs
                  font-black
                  text-emerald-900
                "
              >
                Начальная сцена
              </div>

            ) : (

              <button
                type="button"
                onClick={() =>
                  setStartScene(
                    scene.id
                  )
                }
                className="
                  fantasy-button
                  fantasy-button-green
                  rounded-xl
                  px-4
                  py-2
                  text-xs
                  font-black
                "
              >
                Сделать начальной
              </button>
            )
          }

          <div
            className="
              max-w-[240px]
              truncate
              rounded-xl
              border
              border-[#7a4a24]/25
              bg-[#fff0c9]/45
              px-4
              py-2
              text-xs
              font-semibold
              text-[#7a4a24]/70
            "
          >
            {scene.id}
          </div>

        </div>

      </div>

      <div className="space-y-6">

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-black
              text-[#5a2b17]
            "
          >
            Название сцены
          </label>

          <input
            type="text"
            value={scene.title || ""}
            onChange={handleTitleChange}
            className="
              fantasy-input
              w-full
              rounded-2xl
              px-4
              py-3
              text-lg
              font-bold
            "
          />

        </div>

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-black
              text-[#5a2b17]
            "
          >
            Текст сцены
          </label>

          <textarea
            value={scene.content || ""}
            onChange={handleContentChange}
            rows={14}
            className="
              fantasy-input
              w-full
              resize-none
              rounded-2xl
              px-5
              py-4
              text-base
              leading-8
            "
          />

        </div>

        <div
          className="
            rounded-3xl
            border
            border-[#7a4a24]/30
            bg-[#5a2b17]/10
            p-5
          "
        >

          <div
            className="
              mb-4
              flex
              items-center
              justify-between
            "
          >

            <h3
              className="
                fantasy-ink-title
                text-xl
                font-black
              "
            >
              Выборы
            </h3>

            <div
              className="
                rounded-full
                bg-[#7a4a24]/10
                px-3
                py-1
                text-xs
                font-black
                text-[#7a4a24]/70
              "
            >
              {outgoingLinks.length} переходов
            </div>

          </div>

          <div
            className="
              mb-5
              rounded-2xl
              border
              border-[#7a4a24]/25
              bg-[#fff0c9]/45
              p-4
            "
          >

            <div
              className="
                mb-3
                text-sm
                font-black
                text-[#5a2b17]
              "
            >
              Добавить выбор
            </div>

            <div
              className="
                grid
                grid-cols-[1fr_220px_auto]
                gap-3
              "
            >

              <input
                type="text"
                value={newChoiceLabel}
                onChange={(event) =>
                  setNewChoiceLabel(
                    event.target.value
                  )
                }
                placeholder="Текст выбора..."
                className="
                  fantasy-input
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-semibold
                "
              />

              <select
                value={targetSceneId}
                onChange={(event) =>
                  setTargetSceneId(
                    event.target.value
                  )
                }
                className="
                  fantasy-input
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-semibold
                "
              >

                <option value="">
                  Целевая сцена
                </option>

                {
                  availableTargetScenes.map(
                    (targetScene) => (

                      <option
                        key={targetScene.id}
                        value={targetScene.id}
                      >
                        {targetScene.title}
                      </option>
                    )
                  )
                }

              </select>

              <button
                type="button"
                onClick={handleAddChoice}
                disabled={!targetSceneId}
                className="
                  fantasy-button
                  fantasy-button-green
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-black

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Добавить
              </button>

            </div>

          </div>

          <div className="space-y-3">

            {
              outgoingLinks.length === 0 && (

                <div
                  className="
                    rounded-2xl
                    border
                    border-dashed
                    border-[#7a4a24]/40
                    bg-[#fff0c9]/35
                    p-6
                    text-sm
                    font-semibold
                    text-[#7a4a24]/70
                  "
                >
                  Пока нет переходов из этой сцены.
                </div>
              )
            }

            {
              outgoingLinks.map(
                (link) => {

                  const targetScene =
                    scenes.find(
                      (target) =>
                        target.id === link.to
                    );

                  if (!targetScene) {
                    return null;
                  }

                  return (

                    <div
                      key={`${link.from}-${link.to}`}
                      className="
                        rounded-2xl
                        border
                        border-[#7a4a24]/25
                        bg-[#fff0c9]/45
                        p-4
                      "
                    >

                      <input
                        type="text"
                        value={link.label || ""}
                        onChange={(event) =>
                          updateLinkLabel(
                            link.from,
                            link.to,
                            event.target.value
                          )
                        }
                        placeholder="Текст выбора..."
                        className="
                          fantasy-input
                          w-full
                          rounded-xl
                          px-3
                          py-2
                          text-sm
                          font-semibold
                        "
                      />

                      <div
                        className="
                          mt-3
                          text-xs
                          font-black
                          text-[#8a2f21]
                        "
                      >
                        → {targetScene.title}
                      </div>

                    </div>
                  );
                }
              )
            }

          </div>

        </div>

      </div>

    </section>
  );
}