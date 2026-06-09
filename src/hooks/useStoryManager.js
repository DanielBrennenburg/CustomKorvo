import {
  useMemo,
  useState,
} from "react";

import { supabase }
from "../lib/supabase";

export default function useStoryManager() {
  const [stories, setStories] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "storymaze-stories"
        );

      if (saved) {
        return JSON.parse(saved);
      }

      return [
        {
          id: crypto.randomUUID(),
          title: "My Story",
          is_published: false,
          scenes: [
            {
              id: crypto.randomUUID(),
              title: "Opening Scene",
              content: "",
              type: "dialogue",
              position: {
                x: 300,
                y: 200,
              },
            },
          ],
          links: [],
        },
      ];
    });

  const [currentStoryId, setCurrentStoryId] =
    useState(stories[0]?.id);

  const [currentSceneId, setCurrentSceneId] =
    useState(stories[0]?.scenes?.[0]?.id);

  const currentStory =
    useMemo(() => {
      return stories.find(
        (story) =>
          story.id === currentStoryId
      );
    }, [stories, currentStoryId]);

  const currentScene =
    useMemo(() => {
      return currentStory?.scenes.find(
        (scene) =>
          scene.id === currentSceneId
      );
    }, [currentStory, currentSceneId]);

  const scenes =
    currentStory?.scenes || [];

  const links =
    currentStory?.links || [];

  async function loadStoriesFromCloud(userId) {
    const { data, error } =
      await supabase
        .from("stories")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    const cloudStories =
      (data || []).map((entry) => ({
        id: entry.id,
        title: entry.title,
        is_published: entry.is_published,
        scenes: entry.data?.scenes || [],
        links: entry.data?.links || [],
      }));

    setStories(cloudStories);

    const firstStory =
      cloudStories[0];

    setCurrentStoryId(
      firstStory?.id || null
    );

    setCurrentSceneId(
      firstStory?.scenes?.[0]?.id || null
    );
  }

  async function saveStoryToCloud(
    story,
    userId
  ) {
    const { error } =
      await supabase
        .from("stories")
        .upsert({
          id: story.id,
          user_id: userId,
          title: story.title,
          is_published:
            story.is_published || false,
          data: {
            scenes: story.scenes,
            links: story.links,
          },
          updated_at:
            new Date().toISOString(),
        });

    if (error) {
      console.error(error);
    }
  }

  async function deleteStoryFromCloud(
    storyId,
    userId
  ) {
    const { error } =
      await supabase
        .from("stories")
        .delete()
        .eq("id", storyId)
        .eq("user_id", userId);

    if (error) {
      console.error(
        "Failed to delete story from cloud:",
        error
      );
    }
  }

  function updateCurrentStory(updates) {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id !== currentStoryId) {
          return story;
        }

        return {
          ...story,
          ...updates,
        };
      })
    );
  }

  function addStory() {
    const newStory = {
      id: crypto.randomUUID(),
      title: "Untitled Story",
      is_published: false,
      scenes: [],
      links: [],
    };

    setStories((prev) => [
      ...prev,
      newStory,
    ]);

    setCurrentStoryId(newStory.id);
    setCurrentSceneId(null);
  }

  async function deleteStory(storyId) {
    const { data } =
      await supabase.auth.getUser();

    const userId =
      data?.user?.id;

    if (!userId) {
      console.error(
        "Cannot delete story: no user"
      );
      return;
    }

    await deleteStoryFromCloud(
      storyId,
      userId
    );

    const filteredStories =
      stories.filter(
        (story) =>
          story.id !== storyId
      );

    setStories(filteredStories);

    const nextStory =
      filteredStories[0];

    setCurrentStoryId(
      nextStory?.id || null
    );

    setCurrentSceneId(
      nextStory?.scenes?.[0]?.id || null
    );
  }

  function renameStory(storyId, title) {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id !== storyId) {
          return story;
        }

        return {
          ...story,
          title,
        };
      })
    );
  }

  function togglePublishStory(storyId) {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id !== storyId) {
          return story;
        }

        return {
          ...story,
          is_published:
            !story.is_published,
        };
      })
    );
  }

  function addScene(position = null) {
    if (
      position &&
      typeof position === "object" &&
      "nativeEvent" in position
    ) {
      position = null;
    }

    if (!currentStory) {
      return null;
    }

    const newScene = {
      id: crypto.randomUUID(),
      title: "Новая сцена",
      content: "",
      type: "dialogue",
      position:
        position || {
          x:
            300 +
            scenes.length * 80,
          y:
            200 +
            scenes.length * 50,
        },
    };

    updateCurrentStory({
      scenes: [
        ...scenes,
        newScene,
      ],
    });

    setCurrentSceneId(newScene.id);

    return newScene;
  }

  function deleteScene(sceneId) {
    const updatedScenes =
      scenes.filter(
        (scene) =>
          scene.id !== sceneId
      );

    const updatedLinks =
      links.filter(
        (link) =>
          link.from !== sceneId &&
          link.to !== sceneId
      );

    updateCurrentStory({
      scenes: updatedScenes,
      links: updatedLinks,
    });

    if (currentSceneId === sceneId) {
      setCurrentSceneId(
        updatedScenes[0]?.id || null
      );
    }
  }

  function updateScene(sceneId, updates) {
    updateCurrentStory({
      scenes:
        scenes.map((scene) => {
          if (scene.id !== sceneId) {
            return scene;
          }

          return {
            ...scene,
            ...updates,
          };
        }),
    });
  }

  function updateScenePosition(
    sceneId,
    position
  ) {
    updateCurrentStory({
      scenes:
        scenes.map((scene) => {
          if (scene.id !== sceneId) {
            return scene;
          }

          return {
            ...scene,
            position,
          };
        }),
    });
  }

  function createLink(from, to) {
    if (from === to) {
      return;
    }

    const exists =
      links.some(
        (link) =>
          link.from === from &&
          link.to === to
      );

    if (exists) {
      return;
    }

    updateCurrentStory({
      links: [
        ...links,
        {
          from,
          to,
          label: "",
        },
      ],
    });
  }

  function deleteLink(from, to) {
    updateCurrentStory({
      links:
        links.filter(
          (link) =>
            !(
              link.from === from &&
              link.to === to
            )
        ),
    });
  }

  function updateLinkLabel(
    from,
    to,
    label
  ) {
    updateCurrentStory({
      links:
        links.map((link) => {
          if (
            link.from === from &&
            link.to === to
          ) {
            return {
              ...link,
              label,
            };
          }

          return link;
        }),
    });
  }

  return {
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

    addScene,
    deleteScene,

    updateScene,
    updateScenePosition,

    createLink,
    deleteLink,
    updateLinkLabel,

    loadStoriesFromCloud,
    saveStoryToCloud,
  };
}