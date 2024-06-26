import { z, ZodType } from "zod";

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string(),
  })

  export type LoginFormData = {
    email: string;
    password: string;
  };