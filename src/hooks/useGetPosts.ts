import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export type Post = {
  id: number;
  title?: string;
  body?: string;
  user_id?: number;
  created_at?: string;
};
const getAllPosts = () => {
  return api.get<Post[]>("/api/posts").then((res) => res.data);
};
export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
};
