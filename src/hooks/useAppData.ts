import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { feed, subjects, modules, userProfile, type FeedItem, type Playlist, type Module } from "@/data/mockData";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useFeed() {
  return useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      await delay(300);
      return feed;
    },
    initialData: feed,
  });
}

export function useSubjects() {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      await delay(200);
      return subjects;
    },
    initialData: subjects,
  });
}

export function useModules(subjectId: string) {
  return useQuery({
    queryKey: ["modules", subjectId],
    queryFn: async () => {
      await delay(200);
      return modules.filter((m) => m.subject_id === subjectId);
    },
    initialData: modules.filter((m) => m.subject_id === subjectId),
  });
}

export function useFeedItem(id: string) {
  return useQuery({
    queryKey: ["feedItem", id],
    queryFn: async () => {
      await delay(100);
      return feed.find((f) => f.id === id) ?? null;
    },
    initialData: feed.find((f) => f.id === id) ?? null,
  });
}

export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      await delay(200);
      return userProfile;
    },
    initialData: userProfile,
  });
}

export function usePlaylists() {
  return useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      await delay(200);
      return userProfile.playlists;
    },
    initialData: userProfile.playlists,
  });
}

export function useToggleLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await delay(200);
      return id;
    },
    onMutate: async (id) => {
      // Cancel both feed and feedItem queries
      await qc.cancelQueries({ queryKey: ["feed"] });
      await qc.cancelQueries({ queryKey: ["feedItem", id] });

      const prevFeed = qc.getQueryData<FeedItem[]>(["feed"]);
      const prevItem = qc.getQueryData<FeedItem>(["feedItem", id]);

      const updater = (item: FeedItem) =>
        item.id === id
          ? {
              ...item,
              isLiked: !item.isLiked,
              likes: (item.likes ?? 0) + (item.isLiked ? -1 : 1),
            }
          : item;

      // Update feed list cache
      qc.setQueryData<FeedItem[]>(["feed"], (old) => old?.map(updater));

      // Update individual item cache
      if (prevItem) {
        qc.setQueryData<FeedItem>(["feedItem", id], updater(prevItem));
      }

      return { prevFeed, prevItem };
    },
    onError: (_err, id, ctx) => {
      if (ctx?.prevFeed) qc.setQueryData(["feed"], ctx.prevFeed);
      if (ctx?.prevItem) qc.setQueryData(["feedItem", id], ctx.prevItem);
    },
  });
}

export function useToggleSave() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await delay(200);
      return id;
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["feed"] });
      await qc.cancelQueries({ queryKey: ["feedItem", id] });

      const prevFeed = qc.getQueryData<FeedItem[]>(["feed"]);
      const prevItem = qc.getQueryData<FeedItem>(["feedItem", id]);

      const updater = (item: FeedItem) =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item;

      qc.setQueryData<FeedItem[]>(["feed"], (old) => old?.map(updater));

      if (prevItem) {
        qc.setQueryData<FeedItem>(["feedItem", id], updater(prevItem));
      }

      return { prevFeed, prevItem };
    },
    onError: (_err, id, ctx) => {
      if (ctx?.prevFeed) qc.setQueryData(["feed"], ctx.prevFeed);
      if (ctx?.prevItem) qc.setQueryData(["feedItem", id], ctx.prevItem);
    },
  });
}

export function useCreatePlaylist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      await delay(300);
      const newPlaylist: Playlist = {
        id: `p${Date.now()}`,
        name,
        item_count: 0,
      };
      return newPlaylist;
    },
    onSuccess: (newPlaylist) => {
      qc.setQueryData<Playlist[]>(["playlists"], (old) => [
        ...(old ?? []),
        newPlaylist,
      ]);
    },
  });
}
