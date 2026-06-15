import type z from "zod";
import type { postSchema } from "../schemas/schemas";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

type PostSchema = z.infer<typeof postSchema>;
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PostSchema }) => {
       await api.put(`/api/posts/${id}`, data);
       
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      navigate("/");
    }
     
  });
};
