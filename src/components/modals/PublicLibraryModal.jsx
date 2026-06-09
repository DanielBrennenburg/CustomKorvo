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

  const [
    stories,
    setStories,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    selectedStory,
    setSelectedStory,
  ] = useState(null);

  const [
    currentSceneId,
    setCurrentSceneId,
  ] = useState(null);

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    async function loadPublishedStories() {

      setLoading(true);
      setError("");
      setSelectedStory(null);
      setCurrentSceneId(null);

      const {
        data,
        error,
      } = await supabase
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
        : story.scenes?.[0]?.id || null
    );
  }

  function closeStory() {
    setSelectedStory(null);
    setCurrentSceneId(null);
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
      selectedStory.scenes?.[0]?.id || null
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
        bg-black/80
        backdrop-blur-md
      "
    >

      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-6xl
          flex-col
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-950
          p-8
          shadow-[0_0_80px_rgba(0,0,0,0.7)]
        "
      >

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
              {
                selectedStory
                  ? selectedStory.title
                  : "Public Library"
              }
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-zinc-500
              "
            >
              {
                selectedStory
                  ? "Published interactive story."
                  : "Published interactive stories from authors."
              }
            </p>

          </div>

          <div className="flex gap-3">

            {
              selectedStory && (

                <button
                  onClick={restartStory}
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
                  Начать заново
                </button>
              )
            }

            {
              selectedStory && (

                <button
                  onClick={closeStory}
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
                  Назад
                </button>
              )
            }

            <button
              onClick={() =>
                setIsOpen(false)
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
              Закрыть
            </button>

          </div>

        </div>

        <div
          className="
            flex-1
            overflow-y-auto
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
                          text-4xl
                          font-black
                          text-white
                        "
                      >
                        {currentScene.title}
                      </h1>

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
                          || "Пустая сцена."
                        }
                      </div>

                      <div
                        className="
                          mt-12
                          space-y-4
                        "
                      >

                        {
                          availableLinks.length === 0 && (

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
                                      || "Продолжить"
                                    }
                                  </div>

                                  <div
                                    className="
                                      mt-2
                                      text-sm
                                      text-zinc-400
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
                        border-zinc-700
                        p-10
                        text-center
                        text-zinc-500
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
                        border-zinc-800
                        bg-zinc-900
                        p-8
                        text-zinc-400
                      "
                    >
                      Loading stories...
                    </div>
                  )
                }

                {
                  error && (

                    <div
                      className="
                        rounded-2xl
                        border
                        border-red-500/30
                        bg-red-500/10
                        p-5
                        text-red-300
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
                        border-zinc-700
                        p-10
                        text-center
                        text-zinc-500
                      "
                    >
                      Пока нет опубликованных историй.
                      Публичная пустота, очень модная.
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
                                  rounded-2xl
                                  border
                                  border-zinc-800
                                  bg-zinc-900
                                  p-5
                                  text-left
                                  transition-all
                                  hover:border-red-500/40
                                  hover:bg-red-500/10
                                "
                              >

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
                                    mt-3
                                    text-sm
                                    text-zinc-500
                                  "
                                >
                                  {story.scenes.length} scenes
                                </div>

                                <div
                                  className="
                                    mt-1
                                    text-sm
                                    text-zinc-500
                                  "
                                >
                                  {story.links.length} links
                                </div>

                                <div
                                  className="
                                    mt-5
                                    inline-block
                                    rounded-full
                                    border
                                    border-emerald-500/30
                                    bg-emerald-500/10
                                    px-3
                                    py-1
                                    text-xs
                                    font-bold
                                    text-emerald-300
                                  "
                                >
                                  Published
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