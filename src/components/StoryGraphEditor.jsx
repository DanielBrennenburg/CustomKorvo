import {
  useEffect,
  useRef,
  useState,
} from "react";

import GraphGrid from "./graph/GraphGrid";
import GraphConnections from "./graph/GraphConnections";
import GraphWorld from "./graph/GraphWorld";
import GraphMinimap from "./graph/GraphMinimap";
import GraphSearch from "./graph/GraphSearch";

import useGraphCamera from "../hooks/useGraphCamera";

export default function StoryGraphEditor({
  scenes,
  links,
  currentSceneId,
  setCurrentSceneId,
  updateScenePosition,
  createLink,
  deleteLink,
  updateLinkLabel,
  addScene,
}) {
  const {
    pan,
    zoom,
    setPan,
    isPanning,
    startPan,
    movePan,
    stopPan,
    handleWheel,
  } = useGraphCamera();

  const [draggedNode, setDraggedNode] =
    useState(null);

  const [connectionDrag, setConnectionDrag] =
    useState(null);

  const [hoveredNodeId, setHoveredNodeId] =
    useState(null);

  const [selectedLink, setSelectedLink] =
    useState(null);

  const graphRef =
    useRef(null);

  function handleMouseMove(event) {
    movePan(event);

    if (draggedNode) {
      const rect =
        graphRef.current.getBoundingClientRect();

      const mouseWorldX =
        (
          event.clientX -
          rect.left -
          pan.x
        ) / zoom;

      const mouseWorldY =
        (
          event.clientY -
          rect.top -
          pan.y
        ) / zoom;

      updateScenePosition(
        draggedNode.sceneId,
        {
          x:
            mouseWorldX -
            draggedNode.offsetX,

          y:
            mouseWorldY -
            draggedNode.offsetY,
        }
      );
    }

    if (connectionDrag) {
      const rect =
        graphRef.current.getBoundingClientRect();

      setConnectionDrag((prev) => ({
        ...prev,

        currentX:
          event.clientX -
          rect.left,

        currentY:
          event.clientY -
          rect.top,
      }));
    }
  }

  function handleMouseUp() {
    stopPan();

    setDraggedNode(null);

    if (connectionDrag) {
      if (hoveredNodeId) {
        createLink(
          connectionDrag.fromSceneId,
          hoveredNodeId
        );
      } else {
        const worldX =
          (
            connectionDrag.currentX -
            pan.x
          ) / zoom;

        const worldY =
          (
            connectionDrag.currentY -
            pan.y
          ) / zoom;

        const newScene =
          addScene({
            x: worldX,
            y: worldY,
          });

        if (newScene) {
          createLink(
            connectionDrag.fromSceneId,
            newScene.id
          );
        }
      }
    }

    setConnectionDrag(null);
  }

  useEffect(() => {
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
  }, [
    isPanning,
    draggedNode,
    pan,
    zoom,
    connectionDrag,
    hoveredNodeId,
  ]);

  return (
    <div
      ref={graphRef}
      tabIndex={0}
      onKeyDown={(event) => {
        if (!selectedLink) {
          return;
        }

        if (
          event.key === "Delete" ||
          event.key === "Backspace"
        ) {
          event.preventDefault();

          deleteLink(
            selectedLink.from,
            selectedLink.to
          );

          setSelectedLink(null);
        }
      }}
      className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        cursor-grab
        active:cursor-grabbing
        outline-none
      "
      onMouseDown={(event) => {
        setSelectedLink(null);
        startPan(event);
      }}
      onWheel={handleWheel}
    >
      <GraphGrid
        pan={pan}
        zoom={zoom}
      />

      <GraphConnections
        links={links}
        scenes={scenes}
        zoom={zoom}
        pan={pan}
        connectionDrag={connectionDrag}
        selectedLink={selectedLink}
        setSelectedLink={setSelectedLink}
        updateLinkLabel={updateLinkLabel}
      />

      <GraphWorld
        scenes={scenes}
        links={links}
        pan={pan}
        zoom={zoom}
        currentSceneId={currentSceneId}
        hoveredNodeId={hoveredNodeId}
        setHoveredNodeId={setHoveredNodeId}
        setCurrentSceneId={setCurrentSceneId}
        setDraggedNode={setDraggedNode}
        setConnectionDrag={setConnectionDrag}
      />

      <GraphMinimap
        scenes={scenes}
        pan={pan}
        zoom={zoom}
        setPan={setPan}
      />

      <GraphSearch
        scenes={scenes}
        setCurrentSceneId={setCurrentSceneId}
        setPan={setPan}
        zoom={zoom}
      />
    </div>
  );
}