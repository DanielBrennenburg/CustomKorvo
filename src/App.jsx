import {
  useEffect,
  useRef,
  useState,
} from "react";

import Header from "./components/Header";

import SceneEditor from "./components/SceneEditor";
import SceneList from "./components/SceneList";
import StorySidebar from "./components/StorySidebar";
import StoryContextMenu from "./components/StoryContextMenu";

import RenameStoryModal from "./components/modals/RenameStoryModal";
import DeleteStoryModal from "./components/modals/DeleteStoryModal";
import GraphModal from "./components/modals/GraphModal";
import AuthModal from "./components/modals/AuthModal";
import DashboardModal from "./components/modals/DashboardModal";
import PublicLibraryModal from "./components/modals/PublicLibraryModal";

import PlaytestModal from "./components/playtest/PlaytestModal";

import useHotkeys from "./hooks/useHotkeys";
import useStoryManager from "./hooks/useStoryManager";

import { supabase }
from "./lib/supabase";

export default function App() {

  const {

    stories,
    setStories,

    currentStoryId,
    setCurrentStoryId,

    currentSceneId,
    setCurrentSceneId,

    currentStory,
    currentScene,

    scenes,
    links,

    addStory,
    deleteStory,
    renameStory,
    togglePublishStory,

    setStartScene,

    addScene,
    deleteScene,

    updateScene,
    updateScenePosition,

    createLink,
    deleteLink,
    updateLinkLabel,

    loadStoriesFromCloud,
    saveStoryToCloud,

  } = useStoryManager();

  const [isGraphOpen, setIsGraphOpen] =
    useState(false);

  const [isPlaytestOpen, setIsPlaytestOpen] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const [isAuthOpen, setIsAuthOpen] =
    useState(false);

  const [isDashboardOpen, setIsDashboardOpen] =
    useState(false);

  const [isLibraryOpen, setIsLibraryOpen] =
    useState(false);

  const [contextMenu, setContextMenu] =
    useState(null);

  const [renameModal, setRenameModal] =
    useState(null);

  const [deleteModal, setDeleteModal] =
    useState(null);

  const [renameValue, setRenameValue] =
    useState("");

  const [saveIndicator, setSaveIndicator] =
    useState(false);

  const saveTimeoutRef =
    useRef(null);

  const cloudSaveTimeoutRef =
    useRef(null);

  function handleExport() {

    const exportData = {
      version: 1,
      stories,
    };

    const blob = new Blob(
      [
        JSON.stringify(
          exportData,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "storymaze-export.storymaze.json";

    link.click();

    URL.revokeObjectURL(url);
  }

  function handleImport(event) {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {

      try {

        const imported =
          JSON.parse(reader.result);

        if (
          !imported ||
          !Array.isArray(imported.stories)
        ) {
          alert("Invalid StoryMaze file.");
          return;
        }

        setStories(imported.stories);

        const firstStory =
          imported.stories[0];

        setCurrentStoryId(
          firstStory?.id || null
        );

        setCurrentSceneId(
          firstStory?.startSceneId ||
          firstStory?.scenes?.[0]?.id ||
          null
        );

      } catch {

        alert("Failed to import file.");
      }
    };

    reader.readAsText(file);

    event.target.value = "";
  }

  async function handleLogout() {

    await supabase.auth.signOut();
  }

  useEffect(() => {

    localStorage.setItem(
      "storymaze-stories",
      JSON.stringify(stories)
    );

  }, [stories]);

  useEffect(() => {

    supabase.auth
      .getUser()
      .then(({ data }) => {

        setUser(data.user || null);
      });

    const { data: authListener } =
      supabase.auth.onAuthStateChange(
        (event, session) => {

          setUser(session?.user || null);
        }
      );

    return () => {

      authListener
        .subscription
        .unsubscribe();
    };

  }, []);

  useEffect(() => {

    if (!user) {
      return;
    }

    loadStoriesFromCloud(user.id);

  }, [user]);

  useEffect(() => {

    if (!user) {
      return;
    }

    if (cloudSaveTimeoutRef.current) {
      clearTimeout(
        cloudSaveTimeoutRef.current
      );
    }

    cloudSaveTimeoutRef.current =
      setTimeout(() => {

        stories.forEach(
          (story) => {

            saveStoryToCloud(
              story,
              user.id
            );
          }
        );

      }, 1000);

    return () => {

      if (cloudSaveTimeoutRef.current) {
        clearTimeout(
          cloudSaveTimeoutRef.current
        );
      }
    };

  }, [
    stories,
    user,
  ]);

  useEffect(() => {

    function closeMenu() {
      setContextMenu(null);
    }

    window.addEventListener(
      "click",
      closeMenu
    );

    return () => {

      window.removeEventListener(
        "click",
        closeMenu
      );
    };

  }, []);

  useHotkeys({

    scenes,
    currentSceneId,
    deleteScene,
    setCurrentSceneId,
    setSaveIndicator,
    saveTimeoutRef,

    disableSceneDelete:
      isGraphOpen || isPlaytestOpen,
  });

  return (

    <div className="min-h-screen bg-zinc-950 text-white">

      {
        saveIndicator && (

          <div
            className="
              fixed
              right-8
              top-8
              z-[2000]
              rounded-xl
              border
              border-emerald-500/30
              bg-emerald-500/10
              px-4
              py-2
              text-sm
              font-medium
              text-emerald-300
              shadow-[0_0_30px_rgba(16,185,129,0.2)]
              backdrop-blur-md
            "
          >
            Saved
          </div>
        )
      }

      <div className="mx-auto max-w-[1800px]">

        <Header
          onImport={handleImport}
          onExport={handleExport}
          onLibrary={() =>
            setIsLibraryOpen(true)
          }
          user={user}
          onLogin={() =>
            setIsAuthOpen(true)
          }
          onLogout={handleLogout}
          onDashboard={() =>
            setIsDashboardOpen(true)
          }
        />

        <div className="p-8">

          <div
            className="
              grid
              grid-cols-[260px_320px_1fr]
              gap-6
            "
          >

            <StorySidebar
              stories={stories}
              currentStoryId={currentStoryId}
              setCurrentStoryId={setCurrentStoryId}
              setCurrentSceneId={setCurrentSceneId}
              addStory={addStory}
              setContextMenu={setContextMenu}
            />

            <SceneList
              scenes={scenes}
              currentSceneId={currentSceneId}
              setCurrentSceneId={setCurrentSceneId}
              addScene={() =>
                addScene()
              }
              deleteScene={deleteScene}
            />

            <div className="space-y-6">

              <div className="flex justify-end gap-4">

                <button
                  onClick={() =>
                    setIsPlaytestOpen(true)
                  }
                  className="
                    rounded-2xl
                    border
                    border-emerald-500/40
                    bg-emerald-500/10
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-emerald-300
                    transition-all
                    hover:border-emerald-400
                    hover:bg-emerald-500/20
                    hover:text-white
                  "
                >
                  ▶ Играть
                </button>

                <button
                  onClick={() =>
                    setIsGraphOpen(true)
                  }
                  className="
                    rounded-2xl
                    border
                    border-red-500/40
                    bg-red-500/10
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-red-300
                    transition-all
                    hover:border-red-400
                    hover:bg-red-500/20
                    hover:text-white
                  "
                >
                  Карта сюжета
                </button>

              </div>

              {
                currentScene && (

                  <SceneEditor
                    scene={currentScene}
                    links={links}
                    scenes={scenes}
                    currentStory={currentStory}
                    updateScene={updateScene}
                    updateLinkLabel={updateLinkLabel}
                    createLink={createLink}
                    setStartScene={setStartScene}
                  />
                )
              }

            </div>

          </div>

        </div>

      </div>

      <StoryContextMenu
        contextMenu={contextMenu}
        stories={stories}
        setRenameValue={setRenameValue}
        setRenameModal={setRenameModal}
        setDeleteModal={setDeleteModal}
        setContextMenu={setContextMenu}
      />

      <RenameStoryModal
        renameModal={renameModal}
        setRenameModal={setRenameModal}
        renameValue={renameValue}
        setRenameValue={setRenameValue}
        renameStory={renameStory}
      />

      <DeleteStoryModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        deleteStory={deleteStory}
      />

      <GraphModal
        isGraphOpen={isGraphOpen}
        setIsGraphOpen={setIsGraphOpen}
        currentStory={currentStory}
        scenes={scenes}
        links={links}
        currentSceneId={currentSceneId}
        setCurrentSceneId={setCurrentSceneId}
        updateScenePosition={updateScenePosition}
        createLink={createLink}
        deleteLink={deleteLink}
        updateLinkLabel={updateLinkLabel}
        addScene={addScene}
      />

      <PlaytestModal
        isOpen={isPlaytestOpen}
        setIsOpen={setIsPlaytestOpen}
        currentStory={currentStory}
        scenes={scenes}
        links={links}
      />

      <AuthModal
        isOpen={isAuthOpen}
        setIsOpen={setIsAuthOpen}
      />

      <DashboardModal
        isOpen={isDashboardOpen}
        setIsOpen={setIsDashboardOpen}
        stories={stories}
        currentStoryId={currentStoryId}
        setCurrentStoryId={setCurrentStoryId}
        setCurrentSceneId={setCurrentSceneId}
        addStory={addStory}
        togglePublishStory={togglePublishStory}
      />

      <PublicLibraryModal
        isOpen={isLibraryOpen}
        setIsOpen={setIsLibraryOpen}
      />

    </div>
  );
}