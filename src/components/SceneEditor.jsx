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

    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        shadow-2xl
      "
    >

      <div className="mb-6">

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
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
              Редактор сцены
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-zinc-500
              "
            >
              Редактируй сцену и её переходы
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
                    border-emerald-500/30
                    bg-emerald-500/10
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-emerald-300
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
                    rounded-xl
                    border
                    border-zinc-700
                    bg-zinc-950
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-zinc-300
                    transition-all

                    hover:border-emerald-500/40
                    hover:bg-emerald-500/10
                    hover:text-emerald-300
                  "
                >
                  Сделать начальной
                </button>
              )
            }

            <div
              className="
                rounded-xl
                border
                border-zinc-700
                bg-zinc-950
                px-4
                py-2
                text-xs
                text-zinc-500
              "
            >
              {scene.id}
            </div>

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
              font-semibold
              text-zinc-300
            "
          >
            Название сцены
          </label>

          <input
            type="text"
            value={scene.title || ""}
            onChange={handleTitleChange}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-950
              px-4
              py-3
              text-white
              outline-none
              transition-all
              duration-200

              focus:border-red-500
              focus:ring-2
              focus:ring-red-500/20
            "
          />

        </div>

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-zinc-300
            "
          >
            Текст сцены
          </label>

          <textarea
            value={scene.content || ""}
            onChange={handleContentChange}
            rows={14}
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-zinc-700
              bg-zinc-950
              px-4
              py-4
              text-sm
              leading-7
              text-zinc-200
              outline-none
              transition-all
              duration-200

              focus:border-red-500
              focus:ring-2
              focus:ring-red-500/20
            "
          />

        </div>

        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950/60
            p-5
          "
        >

          <div className="mb-4 flex items-center justify-between">

            <h3 className="text-lg font-bold text-white">
              Выборы
            </h3>

            <div className="text-xs text-zinc-500">
              {outgoingLinks.length} переходов
            </div>

          </div>

          <div
            className="
              mb-5
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/70
              p-4
            "
          >

            <div className="mb-3 text-sm font-semibold text-zinc-300">
              Добавить выбор
            </div>

            <div className="grid grid-cols-[1fr_220px_auto] gap-3">

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
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none

                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-500/20
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
                  rounded-xl
                  border
                  border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none

                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-500/20
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
                  rounded-xl
                  border
                  border-emerald-500/30
                  bg-emerald-500/10
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-emerald-300
                  transition-all

                  hover:bg-emerald-500/20
                  hover:text-white

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
                    rounded-xl
                    border
                    border-dashed
                    border-zinc-700
                    p-6
                    text-sm
                    text-zinc-500
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
                        rounded-xl
                        border
                        border-zinc-800
                        bg-zinc-900/70
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
                          w-full
                          rounded-lg
                          border
                          border-zinc-700
                          bg-zinc-950
                          px-3
                          py-2
                          text-sm
                          text-white
                          outline-none

                          focus:border-red-500
                          focus:ring-2
                          focus:ring-red-500/20
                        "
                      />

                      <div className="mt-3 text-xs text-red-400">
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

    </div>
  );
}