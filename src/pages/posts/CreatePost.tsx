import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../schemas/schemas";
import type z from "zod";
type PostSchema = z.infer<typeof postSchema>;
const CreatePosts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchema>({ resolver: zodResolver(postSchema) });
  const navigate = useNavigate();
  const onSubmit = (data: PostSchema) => {
    api.post("/api/posts", data);

    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Impress the World With Your Story
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          {...register("title")}
        />
        {errors.title && (
          <p className="mb-4 text-sm text-red-600 ">{errors.title?.message}</p>
        )}

        <textarea
          rows={6}
          placeholder="Body"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          {...register("body")}
        />
        {errors.body && (
          <p className="mb-4 text-sm text-red-600 ">{errors.body?.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePosts;
