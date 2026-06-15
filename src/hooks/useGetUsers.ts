import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  role: string;
  posts: {
    id: number;
    userId: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
  }[];
};
 export const useGetUsers = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await api.get<User[]>("/api/users");
        return res.data;
      },
    });
  };