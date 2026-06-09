import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function useGraphCamera() {

  const [pan, setPan] =
    useState({
      x: 0,
      y: 0,
    });

  const [zoom, setZoom] =
    useState(1);

  const [isPanning,
    setIsPanning] =
    useState(false);

  const dragOffsetRef =
    useRef({
      x: 0,
      y: 0,
    });

  const animationRef =
    useRef(null);

  const targetPanRef =
    useRef({
      x: 0,
      y: 0,
    });

  // START PAN

  function startPan(
    event
  ) {

    setIsPanning(
      true
    );

    targetPanRef.current =
      pan;

    dragOffsetRef.current = {

      x:
        event.clientX -
        pan.x,

      y:
        event.clientY -
        pan.y,
    };
  }

  // MOVE PAN

  function movePan(
    event
  ) {

    if (!isPanning) {
      return;
    }

    targetPanRef.current = {

      x:
        event.clientX -
        dragOffsetRef
          .current.x,

      y:
        event.clientY -
        dragOffsetRef
          .current.y,
    };
  }

  // STOP PAN

  function stopPan() {

    setIsPanning(
      false
    );
  }

  // ZOOM

  function handleWheel(
    event
  ) {

    event.preventDefault();

    const rect =
      event.currentTarget
        .getBoundingClientRect();

    const mouseX =
      event.clientX -
      rect.left;

    const mouseY =
      event.clientY -
      rect.top;

    const worldX =
      (
        mouseX - pan.x
      ) / zoom;

    const worldY =
      (
        mouseY - pan.y
      ) / zoom;

    const zoomFactor =
      event.deltaY > 0
        ? 0.9
        : 1.1;

    const newZoom =
      Math.min(
        2.5,

        Math.max(
          0.3,
          zoom * zoomFactor
        )
      );

    const newPanX =
      mouseX -
      (
        worldX *
        newZoom
      );

    const newPanY =
      mouseY -
      (
        worldY *
        newZoom
      );

    setZoom(
      newZoom
    );

    setPan({

      x: newPanX,

      y: newPanY,
    });

    targetPanRef.current = {

      x: newPanX,

      y: newPanY,
    };
  }

  // SMOOTH CAMERA LOOP

  useEffect(() => {

    function animate() {

      setPan((prev) => {

        const lerp =
          0.14;

        const nextX =

          prev.x +

          (
            targetPanRef
              .current.x
            - prev.x
          ) * lerp;

        const nextY =

          prev.y +

          (
            targetPanRef
              .current.y
            - prev.y
          ) * lerp;

        return {

          x: nextX,

          y: nextY,
        };
      });

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    }

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {

      cancelAnimationFrame(
        animationRef.current
      );
    };

  }, []);

  return {

    pan,
    zoom,

    setPan,
    setZoom,

    isPanning,

    startPan,
    movePan,
    stopPan,

    handleWheel,
  };
}