import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  image: z.string({
    required_error: "image is required",
  }),
  category: z.string().array().optional(),
  desc: z.string({
    required_error: "Description is required",
  }),
});

export const params = z.object({
  blogId: z.string(),
});

export const updateBlogSchema = z.object({
  params,
  body: z
    .object({
      title: z.string(),
      image: z.string(),
      category: z.string().array(),
      desc: z.string(),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateBlogInput = z.TypeOf<typeof createBlogSchema>;
export type UpdateBlogInput = z.TypeOf<typeof updateBlogSchema>;
