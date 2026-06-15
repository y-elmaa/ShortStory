import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useDeletePostUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
