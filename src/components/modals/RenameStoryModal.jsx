export default function RenameStoryModal({

  renameModal,

  setRenameModal,

  renameValue,

  setRenameValue,

  renameStory,
}) {

  if (!renameModal) {
    return null;
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-[1000]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-[420px]
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-6
          shadow-2xl
        "
      >

        <h2 className="text-2xl font-bold text-white">

          Переименовать историю

        </h2>

        <p className="mt-2 text-sm text-zinc-500">

          Дайте новое имя своей истории

        </p>

        <input
          value={renameValue}
          onChange={(event) =>
            setRenameValue(
              event.target.value
            )
          }
          autoFocus
          className="
            mt-5
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-950
            px-4
            py-3
            text-white
            outline-none

            focus:border-red-500
          "
        />

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={() =>
              setRenameModal(
                null
              )
            }
            className="
              rounded-xl
              border
              border-zinc-700
              bg-zinc-800
              px-5
              py-2
              text-zinc-300

              hover:text-white
            "
          >

            Отмена

          </button>

          <button
            onClick={() => {

              renameStory(
                renameModal,
                renameValue
              );

              setRenameModal(
                null
              );
            }}
            className="
              rounded-xl
              border
              border-red-500/40
              bg-red-500/10
              px-5
              py-2
              text-red-300

              hover:bg-red-500/20
              hover:text-white
            "
          >

            Сохранить

          </button>

        </div>

      </div>

    </div>
  );
}