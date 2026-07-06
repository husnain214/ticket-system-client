import * as z from "zod";

export const signupFormSchema = z
  .object({
    email: z.email({ error: "Please enter a valid email address!" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long!" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address!" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long!" }),
});

export type SignupFormtype = z.infer<typeof signupFormSchema>;
export type LoginFormtype = z.infer<typeof loginFormSchema>;
