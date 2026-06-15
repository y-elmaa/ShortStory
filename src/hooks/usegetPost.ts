import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useGetPost = (id:string)=>{
    return   useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await api.get(`/api/posts/${id}`);
      return res.data;
    },
  });
}