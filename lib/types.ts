export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN";
  avatarUrl?: string | null;
  bio?: string | null;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type Media = {
  id: number;
  postId?: number | null;
  fileUrl: string;
  fileType: "IMAGE" | "VIDEO" | "DOCUMENT";
  publicId?: string | null;
  caption?: string | null;
  altText?: string | null;
  cropShape?: string | null;
  createdAt: string;
  post?: Pick<Post, "id" | "title" | "slug">;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  status: "NEW" | "READ" | "REPLIED";
  createdAt: string;
};

export type DashboardStats = {
  users: number;
  posts: number;
  publishedPosts: number;
  draftPosts: number;
  comments: number;
  pendingComments: number;
  reactions: number;
  projects: number;
  certificates: number;
  achievements: number;
  timelineEvents: number;
  media: number;
  contactMessages: number;
  newContactMessages: number;
};

export type ReactionSummary = {
  reactionType: ReactionType;
  count: number;
};

export type ReactionType = "LOVE" | "CLAP" | "INSPIRED" | "HAPPY" | "AMAZING" | "LEARNED" | "EMOTIONAL";

export type Comment = {
  id: number;
  postId: number;
  name: string;
  email?: string | null;
  comment: string;
  status: "PENDING" | "APPROVED" | "HIDDEN" | "SPAM";
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  videoUrl?: string | null;
  location?: string | null;
  mood?: string | null;
  status: "DRAFT" | "PUBLISHED";
  isFeatured: boolean;
  allowComments: boolean;
  allowReactions: boolean;
  categoryId?: number | null;
  category?: Category | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  tags?: { tag: Tag }[];
  media?: Media[];
  comments?: Comment[];
  _count?: {
    comments: number;
    reactions: number;
  };
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  longDescription?: string | null;
  techStack?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  coverImage?: string | null;
  status?: string | null;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  issuedDate?: string | null;
  credentialUrl?: string | null;
  certificateImage?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Achievement = {
  id: number;
  title: string;
  description?: string | null;
  date?: string | null;
  imageUrl?: string | null;
  category?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TimelineEvent = {
  id: number;
  title: string;
  description?: string | null;
  eventDate?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  icon?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Profile = {
  id: number;
  fullName: string;
  title?: string | null;
  shortBio?: string | null;
  longBio?: string | null;
  profileImage?: string | null;
  coverImage?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  portfolioTitle?: string | null;
};
