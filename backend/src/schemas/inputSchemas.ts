import { z } from "zod";

// User Input Schema
export const userInputSchema = z
  .object({
    firstName: z
      .string({ error: "First Name must be a string" })
      .min(2, { message: "First Name must be at least 2 chars long" }),

    lastName: z
      .string({ error: "Last Name must be a string" })
      .min(2, { message: "Last Name must be at least 2 chars long" }),
    email: z
      .string({ error: "Email must be a string" })
      .email({ message: "Email must be a valid email address" }),
    password: z
      .string({ error: "Password must be a string" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    phone: z
      .string({ error: "Phone must be a string" })
      .min(10, { message: "Phone must be at least 10 chars long" }),
    profileImage: z.string().url().optional(),
    profileImagePublicId: z.string().optional(),
    bio: z
      .string({ error: "Bio must be a string" })
      .max(500, { message: "Bio must be at most 500 characters long" })
      .optional(),
    preferedLanguage: z
      .enum(["en", "fr", "de"], {
        error: "Prefered Language must be one of 'en', 'fr', or 'de'",
      })
      .optional(),
  })
  .strict();

export const userUpdateSchema = z
  .object({
    firstName: z
      .string({ error: "firstName must be a string" })
      .min(2, { message: "firstName must be at least 2 chars long" })
      .optional(),
    lastName: z
      .string({ error: "lastName must be a string" })
      .min(2, { message: "lastName must be at least 2 chars long" })
      .optional(),
    email: z
      .string({ error: "email must be a string" })
      .email({ message: "email must be a valid email address" })
      .optional(),
    phone: z
      .string({ error: "phone must be a string" })
      .min(10, { message: "phone must be at least 10 chars long" })
      .optional(),
    bio: z
      .string({ error: "bio must be a string" })
      .max(500, { message: "bio must be at most 500 characters long" })
      .optional(),
    preferedLanguage: z
      .enum(["en", "fr", "de"], {
        error: "preferedLanguage must be one of 'en', 'fr', or 'de'",
      })
      .optional(),
    profileImage: z.string().url().optional(),
    profileImagePublicId: z.string().optional(),
  })
  .strict();
// Login Schema
export const authLoginSchema = z
  .object({
    email: z.string({ error: "Email must be a string" }).email({
      message: "Email must be a valid email address",
    }),
    password: z
      .string({ error: "Password must be a string" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" }),
  })
  .strict();

// Change Password Schema
export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ error: "oldPassword must be a string" })
      .min(6, { message: "oldPassword must be at least 6 characters long" })
      .max(64, { message: "oldPassword must be at most 64 characters long" }),
    newPassword: z
      .string({ error: "newPassword must be a string" })
      .min(6, { message: "newPassword must be at least 6 characters long" })
      .max(64, { message: "newPassword must be at most 64 characters long" })
      .regex(/[A-Z]/, {
        message: "newPassword must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "newPassword must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "newPassword must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "newPassword must contain at least one special character",
      }),
    confirmNewPassword: z
      .string({ error: "confirmNewPassword must be a string" })
      .min(6, {
        message: "confirmNewPassword must be at least 6 characters long",
      })
      .max(64, {
        message: "confirmNewPassword must be at most 64 characters long",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "newPassword and confirmNewPassword must match",
  })
  .strict();

export const visitorInputSchema = z
  .object({
    ipAddress: z
      .string({ error: "L'adresse IP doit être une chaîne de caractères" })
      .refine((val) => /^(\d{1,3}\.){3}\d{1,3}$/.test(val), {
        message: "L'adresse IP doit être une adresse IP valide",
      }),
    webId: z
      .string({ error: "L'ID Web doit être une chaîne de caractères" })
      .min(5, { message: "L'ID Web doit comporter au moins 5 caractères" }),
  })
  .strict();

export const galleryInputSchema = z
  .object({
    title: z
      .string({ error: "Title must be a string" })
      .min(1, { message: "Title is required." }),
    description: z
      .string({ error: "Description must be a string" })
      .max(1000, {
        message: "Description must be at most 1000 characters long",
      })
      .optional(),
  })
  .strict();

export const galleryUpdateSchema = z
  .object({
    title: z
      .string({ error: "Title must be a string" })
      .min(1, { message: "Title is required." })
      .optional(),
    description: z
      .string({ error: "Description must be a string" })
      .max(1000, {
        message: "Description must be at most 1000 characters long",
      })
      .optional(),
  })
  .strict();
