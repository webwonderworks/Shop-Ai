import { describe, it, expect, vi, beforeEach } from "vitest";
import { designRouter } from "./designRouter";
import type { TrpcContext } from "../_core/context";

// Mock the database functions
vi.mock("../db", () => ({
  getUserDesignProjects: vi.fn(),
  getDesignProjectById: vi.fn(),
  createDesignProject: vi.fn(),
  updateDesignProject: vi.fn(),
  getAllMauveTemplates: vi.fn(),
}));

const mockUser = {
  id: 1,
  openId: "test-user",
  email: "test@example.com",
  name: "Test User",
  loginMethod: "manus",
  role: "user" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const mockContext: TrpcContext = {
  user: mockUser,
  req: {
    protocol: "https",
    headers: {},
  } as any,
  res: {} as any,
};

describe("designRouter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should list projects for authenticated user", async () => {
    const caller = designRouter.createCaller(mockContext);

    const mockProjects = [
      {
        id: 1,
        userId: 1,
        name: "Test Project",
        description: "Test",
        shopType: "local",
        brandProfile: "modern",
        status: "draft" as const,
        designConfig: null,
        templateData: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const { getUserDesignProjects } = await import("../db");
    vi.mocked(getUserDesignProjects).mockResolvedValue(mockProjects);

    const result = await caller.listProjects();
    expect(result).toEqual(mockProjects);
  });

  it("should create a new project", async () => {
    const caller = designRouter.createCaller(mockContext);

    const { createDesignProject } = await import("../db");
    vi.mocked(createDesignProject).mockResolvedValue({
      insertId: 1,
    } as any);

    const result = await caller.createProject({
      name: "New Project",
      description: "Test project",
      shopType: "local",
      brandProfile: "modern",
    });

    expect(result.success).toBe(true);
    expect(result.projectId).toBe(1);
  });

  it("should validate project creation input", async () => {
    const caller = designRouter.createCaller(mockContext);

    try {
      await caller.createProject({
        name: "",
        description: "Test",
        shopType: "local",
        brandProfile: "modern",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should get Mauve templates", async () => {
    const caller = designRouter.createCaller(mockContext);

    const mockTemplates = [
      {
        id: 1,
        name: "Default Template",
        version: "1.0.0",
        schema: "{}",
        description: "Default Mauve template",
        createdAt: new Date(),
      },
    ];

    const { getAllMauveTemplates } = await import("../db");
    vi.mocked(getAllMauveTemplates).mockResolvedValue(mockTemplates);

    const result = await caller.getMauveTemplates();
    expect(result).toEqual(mockTemplates);
  });
});
