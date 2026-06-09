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
  return (
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
            pointer-events-none
            drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]
          "
        />
      )}

      {links.map((link) => {
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

        const x1 =
          fromPosition.x * zoom +
          pan.x +
          320 * zoom;

        const y1 =
          fromPosition.y * zoom +
          pan.y +
          110 * zoom;

        const x2 =
          toPosition.x * zoom +
          pan.x;

        const y2 =
          toPosition.y * zoom +
          pan.y +
          110 * zoom;

        const isSelected =
          selectedLink &&
          selectedLink.from === link.from &&
          selectedLink.to === link.to;

        return (
          <g key={`${link.from}-${link.to}`}>
            <line
              onClick={(event) => {
                event.stopPropagation();

                setSelectedLink({
                  from: link.from,
                  to: link.to,
                });
              }}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.001)"
              strokeWidth="48"
              strokeLinecap="round"
              style={{
                pointerEvents: "stroke",
              }}
              className="cursor-pointer"
            />

            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
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
                pointer-events-none
                transition-all
                drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]
              "
            />

            {isSelected && (
              <foreignObject
                x={(x1 + x2) / 2 - 90}
                y={(y1 + y2) / 2 - 18}
                width="180"
                height="40"
                style={{
                  pointerEvents: "auto",
                }}
              >
                <input
                  value={link.label || ""}
                  onChange={(event) => {
                    updateLinkLabel(
                      link.from,
                      link.to,
                      event.target.value
                    );
                  }}
                  placeholder="Choice text..."
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
  );
}