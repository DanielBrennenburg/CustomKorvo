import {
  useEffect,
} from "react";

export default function useHotkeys({

  scenes,

  currentSceneId,

  deleteScene,

  setCurrentSceneId,

  setSaveIndicator,

  saveTimeoutRef,

  graphHasSelectedLink = false,

  disableSceneDelete = false,

}) {

  useEffect(() => {

    function handleKeyDown(
      event
    ) {

      // IGNORE INPUTS

      const activeTag =

        document
          .activeElement
          ?.tagName;

      const isTyping =

        activeTag ===
        "INPUT"

        ||

        activeTag ===
        "TEXTAREA";

      if (isTyping) {
        return;
      }

      // SAVE

      if (

        (
          event.ctrlKey
          ||

          event.metaKey
        )

        &&

        event.key.toLowerCase()
          === "s"

      ) {

        event.preventDefault();

        setSaveIndicator(
          true
        );

        clearTimeout(
          saveTimeoutRef.current
        );

        saveTimeoutRef.current =
          setTimeout(() => {

            setSaveIndicator(
              false
            );

          }, 1400);

        return;
      }

      // BLOCK GLOBAL DELETE
      // INSIDE GRAPH MODE

      if (
        disableSceneDelete
      ) {
        return;
      }

      // PREVENT SCENE DELETE
      // WHEN LINK IS SELECTED

      if (
        graphHasSelectedLink
      ) {
        return;
      }

      // DELETE SCENE

      if (

        event.key ===
        "Delete"

        ||

        event.key ===
        "Backspace"

      ) {

        if (
          !currentSceneId
        ) {
          return;
        }

        event.preventDefault();

        deleteScene(
          currentSceneId
        );

        return;
      }

      // NEXT SCENE

      if (
        event.key ===
        "ArrowDown"
      ) {

        event.preventDefault();

        const currentIndex =

          scenes.findIndex(
            (scene) =>

              scene.id ===
              currentSceneId
          );

        const nextScene =
          scenes[
            currentIndex + 1
          ];

        if (nextScene) {

          setCurrentSceneId(
            nextScene.id
          );
        }

        return;
      }

      // PREVIOUS SCENE

      if (
        event.key ===
        "ArrowUp"
      ) {

        event.preventDefault();

        const currentIndex =

          scenes.findIndex(
            (scene) =>

              scene.id ===
              currentSceneId
          );

        const previousScene =
          scenes[
            currentIndex - 1
          ];

        if (
          previousScene
        ) {

          setCurrentSceneId(
            previousScene.id
          );
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [

    scenes,

    currentSceneId,

    deleteScene,

    setCurrentSceneId,

    setSaveIndicator,

    saveTimeoutRef,

    graphHasSelectedLink,

    disableSceneDelete,
  ]);
}