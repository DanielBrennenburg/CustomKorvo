import StoryNode
from "../StoryNode";

export default function GraphWorld({

  scenes,

  links,

  pan,

  zoom,

  currentSceneId,

  hoveredNodeId,

  setHoveredNodeId,

  setCurrentSceneId,

  setDraggedNode,

  setConnectionDrag,
}) {

  return (

    <div
      className="
        absolute
        inset-0
        will-change-transform
      "

      style={{

        zIndex: 10,

        transform:
          `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,

        transformOrigin:
          "0 0",
      }}
    >

      {
        scenes.map(
          (scene) => {

            const outgoingCount =

              links.filter(
                (link) =>
                  link.from === scene.id
              ).length;

            return (

              <StoryNode

                key={
                  scene.id
                }

                scene={
                  scene
                }

                outgoingCount={
                  outgoingCount
                }

                zoom={
                  zoom
                }

                isSelected={
                  currentSceneId ===
                  scene.id
                }

                hoveredNodeId={
                  hoveredNodeId
                }

                setHoveredNodeId={
                  setHoveredNodeId
                }

                setCurrentSceneId={
                  setCurrentSceneId
                }

                setDraggedNode={
                  setDraggedNode
                }

                setConnectionDrag={
                  setConnectionDrag
                }
              />
            );
          }
        )
      }

    </div>
  );
}