import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import {
  CreateBlogInput,
  FilterQueryInput,
  params,
  ParamsInput,
  UpdateBlogInput,
} from "./blog.schema";

const prisma = new PrismaClient();

export const createBlogController = async ({
  input,
}: {
  input: CreateBlogInput;
}) => {
  try {
    const blog = await prisma.blog.create({
      data: {
        title: input.title,
        image: input.image,
        category: input.category,
        desc: input.desc,
      },
    });

    return {
      status: "success",
      data: {
        blog,
      },
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Blog with that title already exists",
        });
      }
    }
    throw error;
  }
};

export const updateBlogController = async ({
  paramsInput,
  input,
}: {
  paramsInput: ParamsInput;
  input: UpdateBlogInput["body"];
}) => {
  try {
    const updatedBlog = prisma.blog.update({
      where: { id: paramsInput.blogId },
      data: input,
    });

    return {
      status: "success",
      blog: updatedBlog,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Blog with that title already exists",
        });
      }
    }
    throw error;
  }
};

export const findBlogController = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const blog = await prisma.blog.findFirst({
      where: { id: paramsInput.blogId },
    });

    if (!blog) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Blog with this ID not found",
      });
    }

    return {
      status: "success",
      blog,
    };
  } catch (error) {
    throw error;
  }
};

export const findAllBlogController = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    const page = filterQuery.page || 1;
    const limit = filterQuery.limit || 10;
    const skip = (page - 1) * limit;

    const blogs = await prisma.blog.findMany({ skip, take: limit });

    return {
      status: "success",
      results: blogs.length,
      blogs,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteBlogController = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    await prisma.blog.delete({ where: { id: paramsInput.blogId } });

    return {
      status: "success",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog with that ID not found",
        });
      }
    }
    throw error;
  }
};
