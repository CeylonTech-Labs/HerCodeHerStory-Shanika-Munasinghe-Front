import type {
  Achievement,
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

export type PostQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: "PUBLISHED" | "DRAFT";
  featured?: boolean;
};

export { getApiErrorMessage } from "./content";

export const getPosts = (params?: PostQuery) => import("./content").then(({ getPosts }) => getPosts(params));
export const getFeaturedPosts = () => import("./content").then(({ getFeaturedPosts }) => getFeaturedPosts());
export const getPostBySlug = (slug: string) => import("./content").then(({ getPostBySlug }) => getPostBySlug(slug));
export const getCategories = () => import("./content").then(({ getCategories }) => getCategories());
export const getTags = () => import("./content").then(({ getTags }) => getTags());
export const getProjects = () => import("./content").then(({ getProjects }) => getProjects());
export const getCertificates = () => import("./content").then(({ getCertificates }) => getCertificates());
export const getAchievements = () => import("./content").then(({ getAchievements }) => getAchievements());
export const getTimelineEvents = () => import("./content").then(({ getTimelineEvents }) => getTimelineEvents());
export const getGalleryMedia = (page = 1, limit = 40) => import("./content").then(({ getGalleryMedia }) => getGalleryMedia(page, limit));
export const getProfile = () => import("./content").then(({ getProfile }) => getProfile());
export const exportContentData = () => import("./content").then(({ exportContentData }) => exportContentData());
export const importContentData = (data: unknown) => import("./content").then(({ importContentData }) => importContentData(data));
export const getReactions = (postId: number) => import("./content").then(({ getReactions }) => getReactions(postId));
export const createReaction = (postId: number, reactionType: ReactionType, visitorId: string) => import("./content").then(({ createReaction }) => createReaction(postId, reactionType, visitorId));
export const createComment = (postId: number, payload: { name: string; email?: string; comment: string }) => import("./content").then(({ createComment }) => createComment(postId, payload));
export const submitContactMessage = (payload: { name: string; email: string; subject?: string; message: string }) => import("./content").then(({ submitContactMessage }) => submitContactMessage(payload));
export const loginAdmin = (payload: { email: string; password: string }) => import("./content").then(({ loginAdmin }) => loginAdmin(payload));
export const getMe = () => import("./content").then(({ getMe }) => getMe());
export const getDashboardStats = () => import("./content").then(({ getDashboardStats }) => getDashboardStats());
export const adminGetComments = (status?: string) => import("./content").then(({ adminGetComments }) => adminGetComments(status));
export const updateCommentStatus = (id: number, status: Comment["status"]) => import("./content").then(({ updateCommentStatus }) => updateCommentStatus(id, status));
export const deleteComment = (id: number) => import("./content").then(({ deleteComment }) => deleteComment(id));
export const adminGetMessages = (status?: string) => import("./content").then(({ adminGetMessages }) => adminGetMessages(status));
export const updateMessageStatus = (id: number, status: ContactMessage["status"]) => import("./content").then(({ updateMessageStatus }) => updateMessageStatus(id, status));
export const deleteMessage = (id: number) => import("./content").then(({ deleteMessage }) => deleteMessage(id));
export const createPost = (payload: Partial<Post> & { tagNames?: string[] }) => import("./content").then(({ createPost }) => createPost(payload));
export const updatePost = (id: number, payload: Partial<Post> & { tagNames?: string[] }) => import("./content").then(({ updatePost }) => updatePost(id, payload));
export const deletePost = (id: number) => import("./content").then(({ deletePost }) => deletePost(id));
export const createProject = (payload: Partial<Project>) => import("./content").then(({ createProject }) => createProject(payload));
export const updateProject = (id: number, payload: Partial<Project>) => import("./content").then(({ updateProject }) => updateProject(id, payload));
export const deleteProject = (id: number) => import("./content").then(({ deleteProject }) => deleteProject(id));
export const createCertificate = (payload: Partial<Certificate>) => import("./content").then(({ createCertificate }) => createCertificate(payload));
export const updateCertificate = (id: number, payload: Partial<Certificate>) => import("./content").then(({ updateCertificate }) => updateCertificate(id, payload));
export const deleteCertificate = (id: number) => import("./content").then(({ deleteCertificate }) => deleteCertificate(id));
export const createAchievement = (payload: Partial<Achievement>) => import("./content").then(({ createAchievement }) => createAchievement(payload));
export const updateAchievement = (id: number, payload: Partial<Achievement>) => import("./content").then(({ updateAchievement }) => updateAchievement(id, payload));
export const deleteAchievement = (id: number) => import("./content").then(({ deleteAchievement }) => deleteAchievement(id));
export const createTimelineEvent = (payload: Partial<TimelineEvent>) => import("./content").then(({ createTimelineEvent }) => createTimelineEvent(payload));
export const updateTimelineEvent = (id: number, payload: Partial<TimelineEvent>) => import("./content").then(({ updateTimelineEvent }) => updateTimelineEvent(id, payload));
export const deleteTimelineEvent = (id: number) => import("./content").then(({ deleteTimelineEvent }) => deleteTimelineEvent(id));
export const createCategory = (payload: Partial<Category>) => import("./content").then(({ createCategory }) => createCategory(payload));
export const updateCategory = (id: number, payload: Partial<Category>) => import("./content").then(({ updateCategory }) => updateCategory(id, payload));
export const deleteCategory = (id: number) => import("./content").then(({ deleteCategory }) => deleteCategory(id));
export const uploadMedia = (files: File[], payload?: { postId?: number; caption?: string; altText?: string; cropShape?: string }) => import("./content").then(({ uploadMedia }) => uploadMedia(files, payload));
export const deleteMedia = (id: number) => import("./content").then(({ deleteMedia }) => deleteMedia(id));
export const updateProfile = (payload: Partial<Profile>) => import("./content").then(({ updateProfile }) => updateProfile(payload));
