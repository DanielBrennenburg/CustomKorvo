export default function SceneList({
  scenes,
  currentSceneId,
  setCurrentSceneId,
  addScene,
  deleteScene,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          Сцены
        </h2>

        <button
          onClick={addScene}
          className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-500"
        >
          + Сцена
        </button>

      </div>

      <div className="space-y-3">

        {scenes.map((scene) => (

          <div
            key={scene.id}
            className={`rounded-xl border transition ${
              currentSceneId === scene.id
                ? "border-red-500 bg-red-500/10"
                : "border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-800"
            }`}
          >

            <div
              onClick={() =>
                setCurrentSceneId(scene.id)
              }
              className="cursor-pointer px-4 py-3"
            >

              <div className="font-medium text-white">
                {scene.title}
              </div>

              <div className="mt-1 text-xs text-zinc-500">
                id: {scene.id}
              </div>

            </div>

            {scene.id !== "start" && (

              <button
                onClick={() =>
                  deleteScene(scene.id)
                }
                className="w-full border-t border-zinc-800 px-3 py-2 text-sm text-red-400 transition hover:bg-zinc-800"
              >
                🗑 Удалить сцену
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}