export default function StoryNode({

  scene,

  outgoingCount,

  zoom,

  isSelected,

  hoveredNodeId,

  setHoveredNodeId,

  setCurrentSceneId,

  setDraggedNode,

  setConnectionDrag,
}) {

  const position =
    scene.position || {
      x: 0,
      y: 0,
    };

  const nodeColors = {
    intro:
      "border-blue-500/40 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.25)]",

    dialogue:
      "border-zinc-700 bg-zinc-900 shadow-[0_0_25px_rgba(255,255,255,0.06)]",

    choice:
      "border-yellow-500/40 bg-yellow-500/10 shadow-[0_0_30px_rgba(234,179,8,0.25)]",

    accept:
      "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.25)]",

    reject:
      "border-red-500/40 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.25)]",

    ending:
      "border-fuchsia-500/40 bg-fuchsia-500/10 shadow-[0_0_30px_rgba(217,70,239,0.25)]",
  };

  const colorClass =
    nodeColors[scene.type] ||
    nodeColors.dialogue;

  const preview =
    scene.content
      ?.trim()
      ?.slice(0, 180) ||
    "Empty scene.";

  return (
    <div
      onMouseDown={(event) => {
        event.stopPropagation();

        const rect =
          event.currentTarget
            .getBoundingClientRect();

        const offsetX =
          (
            event.clientX -
            rect.left
          ) / zoom;

        const offsetY =
          (
            event.clientY -
            rect.top
          ) / zoom;

        setDraggedNode({
          sceneId: scene.id,
          offsetX,
          offsetY,
        });
      }}

      onMouseEnter={() =>
        setHoveredNodeId(scene.id)
      }

      onMouseLeave={() =>
        setHoveredNodeId(null)
      }

      onClick={() =>
        setCurrentSceneId(scene.id)
      }

      className={`
        absolute
        z-20
        w-[320px]
        rounded-3xl
        border
        p-6
        backdrop-blur-md
        cursor-pointer
        select-none

        ${colorClass}

        ${
          isSelected
            ? `
              border-white
              shadow-[0_0_40px_rgba(255,255,255,0.12)]
            `
            : ""
        }

        ${
          hoveredNodeId === scene.id
            ? `
              ring-2
              ring-red-400
            `
            : ""
        }
      `}

      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <h3
            className="
              truncate
              text-xl
              font-black
              text-white
            "
          >
            {scene.title}
          </h3>

          <p
            className="
              mt-1
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-zinc-500
            "
          >
            {scene.type || "dialogue"}
          </p>
        </div>

        <div
          className="
            mt-1
            h-3
            w-3
            shrink-0
            rounded-full
            bg-white/20
          "
        />
      </div>

      <div
        className="
          mt-5
          min-h-[90px]
          overflow-hidden
          rounded-2xl
          border
          border-white/5
          bg-black/20
          p-4
        "
      >
        <p
          className="
            whitespace-pre-wrap
            text-sm
            leading-relaxed
            text-zinc-300
            line-clamp-5
          "
        >
          {preview}
        </p>
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            rounded-full
            border
            border-white/10
            bg-black/20
            px-3
            py-1
            text-xs
            text-zinc-400
          "
        >
          {outgoingCount} transitions
        </div>

        <div
          className="
            text-xs
            text-zinc-600
          "
        >
          scene node
        </div>
      </div>

      <div
        onMouseDown={(event) => {
          event.stopPropagation();

          const rect =
            event.currentTarget
              .getBoundingClientRect();

          setConnectionDrag({
            fromSceneId: scene.id,

            startX:
              rect.left +
              rect.width / 2,

            startY:
              rect.top +
              rect.height / 2,

            currentX:
              rect.left +
              rect.width / 2,

            currentY:
              rect.top +
              rect.height / 2,
          });
        }}

        className="
          absolute
          -right-3
          top-1/2
          h-6
          w-6
          -translate-y-1/2
          rounded-full
          border
          border-white/20
          bg-red-500
          shadow-[0_0_20px_rgba(239,68,68,0.9)]
          transition-all
          hover:scale-125
          hover:bg-white
        "
      />
    </div>
  );
}