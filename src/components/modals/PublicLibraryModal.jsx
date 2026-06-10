import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "../../lib/supabase";

export default function PublicLibraryModal({

  isOpen,

  setIsOpen,
}) {

  const [stories, setStories] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedStory, setSelectedStory] =
    useState(null);

  const [currentSceneId, setCurrentSceneId] =
    useState(null);

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    async function loadPublishedStories() {

      setLoading(true);
      setError("");
      setSelectedStory(null);
      setCurrentSceneId(null);

      const { data, error } =
        await supabase
          .from("stories")
          .select("*")
          .eq("is_published", true)
          .order("updated_at", {
            ascending: false,
          });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setStories(data || []);
      setLoading(false);
    }

    loadPublishedStories();

  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function getProgressKey(storyId) {
    return `storymaze-public-progress-${storyId}`;
  }

  function openStory(entry) {

    const story = {
      id: entry.id,
      title: entry.title,
      scenes: entry.data?.scenes || [],
      links: entry.data?.links || [],
      startSceneId:
        entry.data?.startSceneId || null,
    };

    const savedSceneId =
      localStorage.getItem(
        getProgressKey(story.id)
      );

    const sceneExists =
      story.scenes.some(
        (scene) =>
          scene.id === savedSceneId
      );

    setSelectedStory(story);

    setCurrentSceneId(
      sceneExists
        ? savedSceneId
        : story.startSceneId ||
          story.scenes?.[0]?.id ||
          null
    );
  }

  function closeStory() {
    setSelectedStory(null);
    setCurrentSceneId(null);
  }

  function closeModal() {
    setSelectedStory(null);
    setCurrentSceneId(null);
    setIsOpen(false);
  }

  function goToScene(sceneId) {

    if (!selectedStory) {
      return;
    }

    setCurrentSceneId(sceneId);

    localStorage.setItem(
      getProgressKey(selectedStory.id),
      sceneId
    );
  }

  function restartStory() {

    if (!selectedStory) {
      return;
    }

    localStorage.removeItem(
      getProgressKey(selectedStory.id)
    );

    setCurrentSceneId(
      selectedStory.startSceneId ||
      selectedStory.scenes?.[0]?.id ||
      null
    );
  }

  const currentScene =
    selectedStory?.scenes.find(
      (scene) =>
        scene.id === currentSceneId
    );

  const availableLinks =
    selectedStory?.links.filter(
      (link) =>
        link.from === currentSceneId
    ) || [];

  return (

    <div
      className="
        fixed
        inset-0
        z-[4600]

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

          flex
          max-h-[92vh]
          w-full
          max-w-6xl
          flex-col
          overflow-hidden

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
              {
                selectedStory
                  ? selectedStory.title
                  : "Библиотека"
              }
            </h2>

            <p
              className="
                mt-2
                text-sm
                font-semibold
                text-[#7a4a24]/70
              "
            >
              {
                selectedStory
                  ? "Опубликованная интерактивная история."
                  : "Опубликованные истории других авторов."
              }
            </p>

          </div>

          <div className="flex gap-3">

            {
              selectedStory && (

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
                  Начать заново
                </button>
              )
            }

            {
              selectedStory && (

                <button
                  onClick={closeStory}
                  className="
                    fantasy-button
                    rounded-xl
                    px-5
                    py-3
                    text-sm
                    font-black
                  "
                >
                  Назад
                </button>
              )
            }

            <button
              onClick={closeModal}
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
            pr-2
          "
        >

          {
            selectedStory ? (

              <div
                className="
                  mx-auto
                  max-w-3xl
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
                                selectedStory.scenes.find(
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

                                    hover:bg-[#8e3929]
                                    hover:translate-y-[-1px]
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
                      У этой истории нет сцен.
                    </div>
                  )
                }

              </div>

            ) : (

              <>

                {
                  loading && (

                    <div
                      className="
                        rounded-2xl
                        border
                        border-[#7a4a24]/25
                        bg-[#fff0c9]/45
                        p-8
                        text-sm
                        font-semibold
                        text-[#7a4a24]/70
                      "
                    >
                      Загрузка историй...
                    </div>
                  )
                }

                {
                  error && (

                    <div
                      className="
                        rounded-2xl
                        border
                        border-red-900/25
                        bg-red-900/15
                        p-5
                        text-sm
                        font-semibold
                        text-red-950
                      "
                    >
                      {error}
                    </div>
                  )
                }

                {
                  !loading &&
                  !error &&
                  stories.length === 0 && (

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
                      Пока нет опубликованных историй.
                    </div>
                  )
                }

                {
                  !loading &&
                  !error &&
                  stories.length > 0 && (

                    <div
                      className="
                        grid
                        grid-cols-3
                        gap-4
                      "
                    >

                      {
                        stories.map(
                          (entry) => {

                            const story = {
                              id: entry.id,
                              title: entry.title,
                              scenes:
                                entry.data?.scenes || [],
                              links:
                                entry.data?.links || [],
                            };

                            return (

                              <button
                                key={entry.id}
                                onClick={() =>
                                  openStory(entry)
                                }
                                className="
                                  rounded-3xl
                                  border
                                  border-[#7a4a24]/30
                                  bg-[#fff0c9]/45
                                  p-5
                                  text-left
                                  text-[#4b2612]
                                  transition-all

                                  hover:border-[#7d2d1f]/50
                                  hover:bg-[#fff7df]/70
                                  hover:translate-y-[-1px]
                                "
                              >

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
                                  className="
                                    mt-3
                                    text-sm
                                    font-semibold
                                    text-[#7a4a24]/70
                                  "
                                >
                                  {story.scenes.length} сцен
                                </div>

                                <div
                                  className="
                                    mt-1
                                    text-sm
                                    font-semibold
                                    text-[#7a4a24]/70
                                  "
                                >
                                  {story.links.length} переходов
                                </div>

                                <div
                                  className="
                                    mt-5
                                    inline-block
                                    rounded-full
                                    border
                                    border-emerald-900/20
                                    bg-emerald-800/15
                                    px-3
                                    py-1
                                    text-xs
                                    font-black
                                    text-emerald-950
                                  "
                                >
                                  Опубликовано
                                </div>

                              </button>
                            );
                          }
                        )
                      }

                    </div>
                  )
                }

              </>
            )
          }

        </div>

      </div>

    </div>
  );
}