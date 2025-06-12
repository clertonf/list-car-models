import { z } from "zod";

export const loginSchema = z.object({
  user: z.string().min(1, "usuário obrigatório"),
  password: z.string().min(1, "senha obrigatória"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
