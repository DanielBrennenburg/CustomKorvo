import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function GraphMinimap({

  scenes,

  pan,
  zoom,

  setPan,
}) {

  const minimapWidth =
    260;

  const minimapHeight =
    180;

  const scale =
    0.08;

  const [isDragging,
    setIsDragging] =
    useState(false);

  const minimapRef =
    useRef(null);

  // MOVE VIEWPORT

  function moveViewport(
    clientX,
    clientY
  ) {

    const rect =
      minimapRef.current
        .getBoundingClientRect();

    const x =
      clientX -
      rect.left;

    const y =
      clientY -
      rect.top;

    const targetWorldX =
      x / scale;

    const targetWorldY =
      y / scale;

    setPan({

      x:
        -(targetWorldX * zoom)
        + window.innerWidth / 2,

      y:
        -(targetWorldY * zoom)
        + window.innerHeight / 2,
    });
  }

  // CLICK NAVIGATION

  function handleMinimapClick(
    event
  ) {

    moveViewport(

      event.clientX,

      event.clientY
    );
  }

  // DRAG VIEWPORT

  useEffect(() => {

    function handleMouseMove(
      event
    ) {

      if (!isDragging) {
        return;
      }

      moveViewport(

        event.clientX,

        event.clientY
      );
    }

    function handleMouseUp() {

      setIsDragging(
        false
      );
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

  }, [isDragging]);

  return (

    <div

      ref={minimapRef}

      onClick={
        handleMinimapClick
      }

      onMouseDown={(event) => {

        setIsDragging(
          true
        );

        moveViewport(

          event.clientX,

          event.clientY
        );
      }}

      className="
        absolute
        bottom-6
        right-6
        z-50

        overflow-hidden

        rounded-2xl
        border
        border-zinc-700

        bg-black/70
        backdrop-blur-md

        shadow-2xl

        cursor-pointer
      "

      style={{

        width:
          minimapWidth,

        height:
          minimapHeight,
      }}
    >

      {/* WORLD */}

      {scenes.map(
        (scene) => (

          <div

            key={scene.id}

            className="
              absolute
              rounded-sm
              bg-red-400
            "

            style={{

              left:
                scene.position.x
                * scale,

              top:
                scene.position.y
                * scale,

              width: 18,
              height: 10,
            }}
          />
        )
      )}

      {/* VIEWPORT */}

      <div

        className="
          absolute
          border
          border-white/70
          bg-white/5

          pointer-events-none
        "

        style={{

          left:
            (-pan.x / zoom)
            * scale,

          top:
            (-pan.y / zoom)
            * scale,

          width:
            (window.innerWidth / zoom)
            * scale,

          height:
            (window.innerHeight / zoom)
            * scale,
        }}
      />

    </div>
  );
}