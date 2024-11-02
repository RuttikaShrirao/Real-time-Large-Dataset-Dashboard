"use server";

import { z } from "zod";
import { createCookie, deleteSession } from "./lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "contact@cosdensolutions.io",
  password: "12345678",
};

// req to backend to authenticate user
// const resuilt=fetch("http://localhost:5000/api/login",
// {
//   "method":"post"
// })

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState, formData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // check user authentication
  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  // AFTER validation ,set cookie function call
  await createCookie(testUser.id);

  redirect("/dashboard");
}

// delete cookie
export async function logout() {
  await deleteSession();
  redirect("/");
}