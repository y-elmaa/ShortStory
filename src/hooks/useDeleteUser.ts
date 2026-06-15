import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export  const useDeleteUser = () => {
  const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ["users"],
      mutationFn: (id: number) => {
        return api.delete(`/api/users/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    });
  };