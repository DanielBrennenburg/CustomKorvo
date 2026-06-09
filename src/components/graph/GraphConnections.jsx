export default function GraphConnections({
  links,
  scenes,
  zoom,
  pan,
  connectionDrag,
  selectedLink,
  setSelectedLink,
  updateLinkLabel,
}) {
  function getLinePoints(link) {
    const fromScene =
      scenes.find(
        (scene) =>
          scene.id === link.from
      );

    const toScene =
      scenes.find(
        (scene) =>
          scene.id === link.to
      );

    if (!fromScene || !toScene) {
      return null;
    }

    const fromPosition =
      fromScene.position || {
        x: 0,
        y: 0,
      };

    const toPosition =
      toScene.position || {
        x: 0,
        y: 0,
      };

    return {
      x1:
        fromPosition.x * zoom +
        pan.x +
        320 * zoom,

      y1:
        fromPosition.y * zoom +
        pan.y +
        110 * zoom,

      x2:
        toPosition.x * zoom +
        pan.x,

      y2:
        toPosition.y * zoom +
        pan.y +
        110 * zoom,
    };
  }

  return (
    <>
      {/* VISIBLE LINES — UNDER NODES */}

      <svg
        style={{
          zIndex: 5,
          pointerEvents: "none",
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        {connectionDrag && (
          <line
            x1={connectionDrag.startX}
            y1={connectionDrag.startY}
            x2={connectionDrag.currentX}
            y2={connectionDrag.currentY}
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3"
            strokeDasharray="10 8"
            strokeLinecap="round"
            className="
              drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]
            "
          />
        )}

        {links.map((link) => {
          const points =
            getLinePoints(link);

          if (!points) {
            return null;
          }

          const isSelected =
            selectedLink &&
            selectedLink.from === link.from &&
            selectedLink.to === link.to;

          return (
            <line
              key={`${link.from}-${link.to}-visible`}
              x1={points.x1}
              y1={points.y1}
              x2={points.x2}
              y2={points.y2}
              stroke={
                isSelected
                  ? "rgba(255,255,255,1)"
                  : "rgba(239,68,68,0.9)"
              }
              strokeWidth={
                isSelected ? 5 : 3
              }
              strokeLinecap="round"
              className="
                transition-all
                drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]
              "
            />
          );
        })}
      </svg>

      {/* HITBOXES — ABOVE NODES */}

      <svg
        style={{
          zIndex: 40,
          pointerEvents: "none",
        }}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        {links.map((link) => {
          const points =
            getLinePoints(link);

          if (!points) {
            return null;
          }

          const isSelected =
            selectedLink &&
            selectedLink.from === link.from &&
            selectedLink.to === link.to;

          return (
            <g
              key={`${link.from}-${link.to}-hitbox`}
            >
              <line
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  event.stopPropagation();

                  setSelectedLink({
                    from: link.from,
                    to: link.to,
                  });
                }}
                x1={points.x1}
                y1={points.y1}
                x2={points.x2}
                y2={points.y2}
                stroke="rgba(255,255,255,0.001)"
                strokeWidth="64"
                strokeLinecap="round"
                style={{
                  pointerEvents: "stroke",
                }}
                className="cursor-pointer"
              />

              {isSelected && (
                <foreignObject
                  x={
                    (points.x1 + points.x2) / 2 -
                    90
                  }
                  y={
                    (points.y1 + points.y2) / 2 -
                    18
                  }
                  width="180"
                  height="40"
                  style={{
                    pointerEvents: "auto",
                  }}
                >
                  <input
                    value={link.label || ""}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    onChange={(event) => {
                      updateLinkLabel(
                        link.from,
                        link.to,
                        event.target.value
                      );
                    }}
                    placeholder="Текст выбора..."
                    className="
                      h-full
                      w-full
                      rounded-xl
                      border
                      border-red-500/40
                      bg-black/90
                      px-3
                      text-xs
                      text-white
                      outline-none
                      backdrop-blur-md
                    "
                  />
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </>
  );
}