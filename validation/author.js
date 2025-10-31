import { z } from "zod/v4";

export const authorSchema = z.object({
  name: z.string().min(1, "Author name is required"),
  bio: z.string().optional(),
});

export const authorUpdateSchema = z.object({
  name: z.string().min(1, "Author name is required").optional(),
  bio: z.string().optional(),
});
