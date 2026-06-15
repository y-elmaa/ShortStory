import z from "zod";

export const registerSchema = z.object({
  name: z.string("The Name Is Required").min(1).max(20),
  email: z.email("The Email Is Required"),
  password: z.string("The Password Is Requerid").min(8),
});
export const loginSchema = z.object({
  email: z.email("The Email Is Required"),
  password: z.string("The Password Is Requerid"),
});
export const postSchema = z.object({
  title: z.string("The Title Is Required").min(1).max(100,'max 100 characters '),
  body: z.string("The Body Is Requerid").min(1),
});
