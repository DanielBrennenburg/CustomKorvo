import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "../../lib/supabase";

export default function PublicLibraryModal({
  isOpen,
  setIsOpen,
}) {
  const [stories, setStories] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    async function loadPublishedStories() {
      setLoading(true);
      setError("");

      const { data, error } =
        await supabase
          .from("stories")
          .select("*")
          .eq("is_published", true)
          .order("updated_at", {
            ascending: false,
          });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setStories(data || []);
      setLoading(false);
    }

    loadPublishedStories();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[4600] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-6xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-[0_0_80px_rgba(0,0,0,0.7)]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-white">
              Public Library
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Published interactive stories from authors.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
          >
            Close
          </button>
        </div>

        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-400">
            Loading stories...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && stories.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center text-zinc-500">
            Пока нет опубликованных историй. Публичная пустота, очень модная.
          </div>
        )}

        {!loading && !error && stories.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {stories.map((entry) => {
              const story = {
                id: entry.id,
                title: entry.title,
                scenes: entry.data?.scenes || [],
                links: entry.data?.links || [],
              };

              return (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <h3 className="text-lg font-bold text-white">
                    {story.title}
                  </h3>

                  <div className="mt-3 text-sm text-zinc-500">
                    {story.scenes.length} scenes
                  </div>

                  <div className="mt-1 text-sm text-zinc-500">
                    {story.links.length} links
                  </div>

                  <div className="mt-5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    Published
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}