export default function DeleteStoryModal({

  deleteModal,

  setDeleteModal,

  deleteStory,
}) {

  if (!deleteModal) {
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
          border-red-500/20
          bg-zinc-900
          p-6
          shadow-2xl
        "
      >

        <h2 className="text-2xl font-bold text-white">

          Удалить историю

        </h2>

        <p className="mt-3 text-zinc-400">

          Эта история будет удалена безвозвратно. Удалить?

        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={() =>
              setDeleteModal(
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
            "
          >

            Отмена

          </button>

          <button
            onClick={() => {

              deleteStory(
                deleteModal
              );

              setDeleteModal(
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
            "
          >

            Удалить

          </button>

        </div>

      </div>

    </div>
  );
}