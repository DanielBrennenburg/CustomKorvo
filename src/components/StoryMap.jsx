export default function StoryMap({
  scenes,
  links,
  currentSceneId,
  setCurrentSceneId,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">
          Карта истории
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Ну как-то вот так.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {scenes.map((scene) => {

          const outgoing = links.filter(
            (link) => link.from === scene.id
          );

          return (
            <div
              key={scene.id}
              onClick={() =>
                setCurrentSceneId(scene.id)
              }
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                currentSceneId === scene.id
                  ? "border-red-500 bg-red-500/10"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-800"
              }`}
            >

              <div className="mb-3">
                <h3 className="text-lg font-bold text-white">
                  {scene.title}
                </h3>

                <div className="mt-1 text-xs text-zinc-500">
                  {scene.id}
                </div>
              </div>

              <p className="line-clamp-3 text-sm text-zinc-300">
                {scene.text}
              </p>

              <div className="mt-4 space-y-2">

                {outgoing.map((link, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-zinc-900 px-3 py-2 text-xs text-zinc-400"
                  >
                    → {link.to}
                  </div>
                ))}

                {outgoing.length === 0 && (
                  <div className="text-xs text-zinc-600">
                    Финальная сцена
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}