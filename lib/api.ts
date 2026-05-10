import axios from "axios";
import type {
  Achievement,
  ApiResponse,
  Category,
  Certificate,
  Comment,
  ContactMessage,
  DashboardStats,
  Media,
  PaginationMeta,
  Post,
  Profile,
  Project,
  ReactionSummary,
  ReactionType,
  Tag,
  TimelineEvent
} from "./types";
import { clearSession, getToken } from "./auth";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const resolveApiUrl = () => {
  const normalized = rawApiUrl.replace(/\/$/, "");

  if (typeof window === "undefined") {
    return normalized;
  }

  try {
    const url = new URL(normalized);
    const isLocalApi = ["localhost", "127.0.0.1"].includes(url.hostname);
    const isLocalPage = ["localhost", "127.0.0.1"].includes(window.location.hostname);

    if (isLocalApi && !isLocalPage) {
      url.hostname = window.location.hostname;
      return url.toString().replace(/\/$/, "");
    }
  } catch {
    return normalized;
  }

  return normalized;
};

const API_URL = resolveApiUrl();

export const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json"
  }
});

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong.") {
  if (axios.isAxiosError(error)) {
    const backendMessage = (error.response?.data as { message?: string } | undefined)?.message;
    const status = error.response?.status;
    const url = error.config?.url;

    if (backendMessage) return backendMessage;
    if (status === 404) return `API route not found${url ? `: ${url}` : ""}.`;
    if (status) return `Request failed with status ${status}.`;
    return `Cannot connect to the backend API at ${API_URL}. Check that the backend is running and this URL opens: ${API_URL.replace(/\/api$/, "/health")}`;
  }

  return fallback;
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearSession();
      if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

type PaginatedPosts = {
  posts: Post[];
  meta: PaginationMeta;
};

type PaginatedMedia = {
  media: Media[];
  meta: PaginationMeta;
};

async function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>) {
  const response = await promise;
  return response.data.data;
}

export type PostQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: "PUBLISHED" | "DRAFT";
  featured?: boolean;
};

export const getPosts = (params?: PostQuery) =>
  unwrap<PaginatedPosts>(api.get("/posts", { params }));

export const getFeaturedPosts = () => unwrap<Post[]>(api.get("/posts/featured"));

export const getPostBySlug = (slug: string) => unwrap<Post>(api.get(`/posts/${slug}`));

export const getCategories = () => unwrap<Category[]>(api.get("/categories"));

export const getTags = () => unwrap<Tag[]>(api.get("/tags"));

export const getProjects = () => unwrap<Project[]>(api.get("/projects"));

export const getCertificates = () => unwrap<Certificate[]>(api.get("/certificates"));

export const getAchievements = () => unwrap<Achievement[]>(api.get("/achievements"));

export const getTimelineEvents = () => unwrap<TimelineEvent[]>(api.get("/timeline"));

export const getGalleryMedia = (page = 1, limit = 40) =>
  unwrap<PaginatedMedia>(api.get("/media", { params: { page, limit } }));

export const getProfile = () => unwrap<Profile | null>(api.get("/profile"));

export const getReactions = (postId: number) =>
  unwrap<ReactionSummary[]>(api.get(`/posts/${postId}/reactions`));

export const createReaction = (postId: number, reactionType: ReactionType, visitorId: string) =>
  unwrap(api.post(`/posts/${postId}/reactions`, { reactionType, visitorId }));

export const createComment = (
  postId: number,
  payload: { name: string; email?: string; comment: string }
) => unwrap(api.post(`/posts/${postId}/comments`, payload));

export const submitContactMessage = (payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) => unwrap(api.post("/contact", payload));

export const loginAdmin = (payload: { email: string; password: string }) =>
  unwrap<{ token: string; user: import("./types").User }>(api.post("/auth/login", payload));

export const getMe = () => unwrap<import("./types").User>(api.get("/auth/me"));

export const getDashboardStats = () => unwrap<DashboardStats>(api.get("/dashboard/stats"));

export const adminGetComments = (status?: string) =>
  unwrap<{ comments: Comment[]; meta: PaginationMeta }>(api.get("/comments", { params: { limit: 100, status: status || undefined } }));

export const updateCommentStatus = (id: number, status: Comment["status"]) =>
  unwrap<Comment>(api.patch(`/comments/${id}/status`, { status }));

export const deleteComment = (id: number) => api.delete(`/comments/${id}`);

export const adminGetMessages = (status?: string) =>
  unwrap<{ messages: ContactMessage[]; meta: PaginationMeta }>(api.get("/contact-messages", { params: { limit: 100, status: status || undefined } }));

export const updateMessageStatus = (id: number, status: ContactMessage["status"]) =>
  unwrap<ContactMessage>(api.patch(`/contact-messages/${id}/status`, { status }));

export const deleteMessage = (id: number) => api.delete(`/contact-messages/${id}`);

export const createPost = (payload: Partial<Post> & { tagNames?: string[] }) => unwrap<Post>(api.post("/posts", payload));
export const updatePost = (id: number, payload: Partial<Post> & { tagNames?: string[] }) => unwrap<Post>(api.put(`/posts/${id}`, payload));
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

export const createProject = (payload: Partial<Project>) => unwrap<Project>(api.post("/projects", payload));
export const updateProject = (id: number, payload: Partial<Project>) => unwrap<Project>(api.put(`/projects/${id}`, payload));
export const deleteProject = (id: number) => api.delete(`/projects/${id}`);

export const createCertificate = (payload: Partial<Certificate>) => unwrap<Certificate>(api.post("/certificates", payload));
export const updateCertificate = (id: number, payload: Partial<Certificate>) => unwrap<Certificate>(api.put(`/certificates/${id}`, payload));
export const deleteCertificate = (id: number) => api.delete(`/certificates/${id}`);

export const createAchievement = (payload: Partial<Achievement>) => unwrap<Achievement>(api.post("/achievements", payload));
export const updateAchievement = (id: number, payload: Partial<Achievement>) => unwrap<Achievement>(api.put(`/achievements/${id}`, payload));
export const deleteAchievement = (id: number) => api.delete(`/achievements/${id}`);

export const createTimelineEvent = (payload: Partial<TimelineEvent>) => unwrap<TimelineEvent>(api.post("/timeline", payload));
export const updateTimelineEvent = (id: number, payload: Partial<TimelineEvent>) => unwrap<TimelineEvent>(api.put(`/timeline/${id}`, payload));
export const deleteTimelineEvent = (id: number) => api.delete(`/timeline/${id}`);

export const createCategory = (payload: Partial<Category>) => unwrap<Category>(api.post("/categories", payload));
export const updateCategory = (id: number, payload: Partial<Category>) => unwrap<Category>(api.put(`/categories/${id}`, payload));
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);

export const uploadMedia = (files: File[], payload?: { postId?: number; caption?: string; altText?: string; cropShape?: string }) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("file", file));
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, String(value));
  });
  return unwrap<Media[]>(api.post("/media/upload", formData, { headers: { "Content-Type": "multipart/form-data" } }));
};

export const deleteMedia = (id: number) => api.delete(`/media/${id}`);

export const updateProfile = (payload: Partial<Profile>) => unwrap<Profile>(api.put("/profile", payload));
