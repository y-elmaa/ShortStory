import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/api/posts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
