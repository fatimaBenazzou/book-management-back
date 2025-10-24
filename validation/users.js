import z from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Email must be valid"),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
      "Password isn't strong enough"
    ),
});

export const userSchema = loginSchema.extend({
  firstName: z
    .string()
    .min(3, "First name must have at least 3 letters")
    .max(70, "First name must have at most 70 letters"),
  lastName: z
    .string()
    .min(3, "Last name must have at least 3 letters")
    .max(70, "Last name must have at most 70 letters"),
});

export const fullUserSchema = userSchema.extend({
  role: z.enum(["Admin", "User"]),
});
