export default function GraphGrid({

  pan,
  zoom,
}) {

  return (

    <div
      className="
        absolute
        inset-0
        pointer-events-none
      "
      style={{

        backgroundImage: `

          linear-gradient(
            rgba(255,255,255,0.04) 1px,
            transparent 1px
          ),

          linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 1px,
            transparent 1px
          )

        `,

        backgroundSize:
          `${40 * zoom}px ${40 * zoom}px`,

        backgroundPosition:
          `${pan.x}px ${pan.y}px`,
      }}
    />
  );
}