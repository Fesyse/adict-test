import { z } from "zod";

export const createPostSchema = z.object({
	title: z.string().min(1).max(20),
	body: z.string().min(1).max(1000),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const editPostSchema = createPostSchema;

export type EditPostSchema = z.infer<typeof editPostSchema>;
