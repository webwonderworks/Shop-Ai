import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getUserDesignProjects,
  getDesignProjectById,
  createDesignProject,
  updateDesignProject,
  getAllMauveTemplates,
} from "../db";
import { TRPCError } from "@trpc/server";

export const designRouter = router({
  listProjects: protectedProcedure.query(async ({ ctx }) => {
    try {
      const projects = await getUserDesignProjects(ctx.user.id);
      return projects;
    } catch (error) {
      console.error("[Design] Failed to list projects:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch projects",
      });
    }
  }),

  getProject: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const project = await getDesignProjectById(input.projectId);

        if (!project) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project not found",
          });
        }

        if (project.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have access to this project",
          });
        }

        return project;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Design] Failed to get project:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch project",
        });
      }
    }),

  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        description: z.string().optional(),
        shopType: z.enum(["local", "shipping", "specialty"]),
        brandProfile: z.enum(["modern", "classic", "medical", "emotional"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await createDesignProject(ctx.user.id, input);
        return { success: true, projectId: (result as any).insertId };
      } catch (error) {
        console.error("[Design] Failed to create project:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create project",
        });
      }
    }),

  updateProject: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        designConfig: z.string().optional(),
        templateData: z.string().optional(),
        status: z
          .enum(["draft", "in_progress", "completed", "exported"])
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const project = await getDesignProjectById(input.projectId);
        if (!project || project.userId !== ctx.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have access to this project",
          });
        }

        const { projectId, ...updateData } = input;
        await updateDesignProject(projectId, updateData);

        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("[Design] Failed to update project:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update project",
        });
      }
    }),

  getMauveTemplates: publicProcedure.query(async () => {
    try {
      const templates = await getAllMauveTemplates();
      return templates || [];
    } catch (error) {
      console.error("[Design] Failed to get Mauve templates:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch templates",
      });
    }
  }),
});
