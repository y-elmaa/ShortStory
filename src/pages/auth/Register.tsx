import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useTokens";
import { api } from "../../api/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/schemas";
import { useState } from "react";
import z from "zod";
type RegisterSchema = z.infer<typeof registerSchema>;
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const setToken = useAuth((state) => state.setToken);
  const onSubmit = (data: RegisterSchema) => {
    api
      .post("/api/register", data)
      .then((res) => {
         
        setToken(res.data.token, res.data.user.name, res.data.user.id,res.data.user.role);
        navigate("/");
      })
      .catch((err) => {
        setEmailError(err.response.data.errors.email);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name")}
        />
        {errors.name && (
          <p className="mb-4 text-sm text-red-600  ">{errors.name?.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          {...register("email")}
        />
        {errors.email && (
          <p className="mb-4 text-sm text-red-600  ">{errors.email?.message}</p>
        )}
        {emailError && (
          <p className="mb-4 text-sm text-red-600  ">{emailError}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          {...register("password")}
        />
        {errors.password && (
          <p className="mb-4 text-sm text-red-600 ">
            {errors.password?.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
