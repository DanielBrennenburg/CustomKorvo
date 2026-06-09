import {
  useMemo,
  useState,
} from "react";

export default function GraphSearch({

  scenes,

  setCurrentSceneId,

  setPan,

  zoom,
}) {

  const [query,
    setQuery] =
    useState("");

  const filteredScenes =
    useMemo(() => {

      if (!query.trim()) {
        return [];
      }

      return scenes.filter(
        (scene) =>

          scene.title
            ?.toLowerCase()
            .includes(
              query.toLowerCase()
            )
      );

    }, [query, scenes]);

  function focusScene(
    scene
  ) {

    setCurrentSceneId(
      scene.id
    );

    setPan({

      x:
        -(scene.position.x * zoom)
        + window.innerWidth / 2
        - 200,

      y:
        -(scene.position.y * zoom)
        + window.innerHeight / 2
        - 120,
    });

    setQuery("");
  }

  return (

    <div
      className="
        absolute
        top-6
        right-6
        z-50
        w-[320px]
      "
    >

      {/* SEARCH INPUT */}

      <input

        value={query}

        onChange={(event) => {

          setQuery(
            event.target.value
          );
        }}

        placeholder="
          Поиск сцены...
        "

        className="
          w-full

          rounded-2xl
          border
          border-zinc-700

          bg-black/70
          backdrop-blur-md

          px-4
          py-3

          text-sm
          text-white

          outline-none

          transition-all

          focus:border-red-500
          focus:ring-2
          focus:ring-red-500/30
        "
      />

      {/* RESULTS */}

      {
        filteredScenes.length > 0 && (

          <div
            className="
              mt-2
              max-h-[320px]
              overflow-y-auto

              rounded-2xl
              border
              border-zinc-800

              bg-black/90
              backdrop-blur-md

              shadow-2xl
            "
          >

            {filteredScenes.map(
              (scene) => (

                <button

                  key={scene.id}

                  onClick={() =>
                    focusScene(scene)
                  }

                  className="
                    block
                    w-full

                    border-b
                    border-zinc-800

                    px-4
                    py-3

                    text-left
                    text-sm
                    text-zinc-300

                    transition-all

                    hover:bg-red-500/10
                    hover:text-white
                  "
                >

                  {scene.title
                    || "Untitled"}

                </button>
              )
            )}

          </div>
        )
      }

    </div>
  );
}