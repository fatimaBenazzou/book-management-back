import { z } from "zod/v4";

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 letters")
    .max(70, "Name must have at most 70 letters"),
});
