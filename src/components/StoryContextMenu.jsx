export default function StoryContextMenu({

  contextMenu,

  stories,

  setRenameValue,

  setRenameModal,

  setDeleteModal,

  setContextMenu,
}) {

  if (!contextMenu) {
    return null;
  }

  return (

    <div
      className="
        fixed
        z-[999]
        w-[180px]
        overflow-hidden
        rounded-xl
        border
        border-zinc-700
        bg-zinc-900
        shadow-2xl
      "
      style={{
        left:
          contextMenu.x,

        top:
          contextMenu.y,
      }}
    >

      <button
        onClick={() => {

          const story =
            stories.find(
              (story) =>
                story.id ===
                contextMenu.storyId
            );

          setRenameValue(
            story?.title || ""
          );

          setRenameModal(
            contextMenu.storyId
          );

          setContextMenu(
            null
          );
        }}
        className="
          w-full
          border-b
          border-zinc-800
          px-4
          py-3
          text-left
          text-sm
          text-zinc-300

          hover:bg-zinc-800
          hover:text-white
        "
      >

        Переименовать

      </button>

      <button
        onClick={() => {

          setDeleteModal(
            contextMenu.storyId
          );

          setContextMenu(
            null
          );
        }}
        className="
          w-full
          px-4
          py-3
          text-left
          text-sm
          text-red-400

          hover:bg-red-500/10
        "
      >

        Удалить

      </button>

    </div>
  );
}