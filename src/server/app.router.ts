import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import {
  createBlogController,
  deleteBlogController,
  findAllBlogController,
  findBlogController,
  updateBlogController,
} from "./note.controller";
import {
  createBlogSchema,
  filterQuery,
  params,
  updateBlogSchema,
} from "./blog.schema";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  getHello: t.procedure.query((req) => {
    return {
      message: "Hello from blog app",
    };
  }),

  createBlog: t.procedure.input(createBlogSchema).mutation(({ input }) => {
    createBlogController({ input });
  }),

  updateBlog: t.procedure.input(updateBlogSchema).mutation(({ input }) => {
    updateBlogController({ paramsInput: input.params, input: input.body });
  }),

  deleteBlog: t.procedure.input(params).mutation(({ input }) => {
    deleteBlogController({ paramsInput: input });
  }),

  getBlog: t.procedure.input(params).query(({ input }) => {
    findBlogController({ paramsInput: input });
  }),

  getBlogs: t.procedure
    .input(filterQuery)
    .query(({ input }) => findAllBlogController({ filterQuery: input })),
});

export type AppRouter = typeof appRouter;
