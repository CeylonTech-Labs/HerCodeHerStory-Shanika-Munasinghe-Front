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
  TimelineEvent,
  User
} from "./types";

const STORAGE_KEY = "hercodeherstory_frontend_store_v1";
const CONTENT_UPDATED_EVENT = "hercodeherstory-content-updated";
const ADMIN_EMAIL = "shanika.uok2@gmail.com";
const ADMIN_PASSWORD = "21PQshani@";

const defaultCategories: Category[] = [
  { id: 1, name: "Code & Projects", slug: "code-projects", description: "Software builds, experiments and product thinking.", icon: "💻", color: "#7c3aed" },
  { id: 2, name: "AI Learning", slug: "ai-learning", description: "Notes from exploring AI, NLP and machine learning.", icon: "🤖", color: "#0f766e" },
  { id: 3, name: "University Life", slug: "university-life", description: "Campus experience, study routines and milestones.", icon: "🎓", color: "#2563eb" },
  { id: 4, name: "Travel", slug: "travel", description: "Moments, routes and memories from exploring new places.", icon: "✈️", color: "#ca8a04" },
  { id: 5, name: "Journal", slug: "journal", description: "Personal reflections and growth updates.", icon: "📝", color: "#be123c" }
];

const defaultTags: Tag[] = [
  { id: 1, name: "Next.js", slug: "nextjs" },
  { id: 2, name: "AI", slug: "ai" },
  { id: 3, name: "Learning", slug: "learning" },
  { id: 4, name: "Campus", slug: "campus" },
  { id: 5, name: "Travel", slug: "travel" }
];

const defaultProfile: Profile = {
  id: 1,
  fullName: "Shanika Munasinghe",
  title: "Software Engineering Student",
  shortBio: "Building thoughtful digital experiences through code, learning, stories and research.",
  longBio: "I am a software engineering student passionate about building meaningful products, writing thoughtful stories and learning across AI, full-stack development and user experience.",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  email: "hello@hercodeherstory.com",
  phone: "+94 76 123 4567",
  location: "Sri Lanka",
  githubUrl: "https://github.com/",
  linkedinUrl: "https://linkedin.com/",
  facebookUrl: "https://facebook.com/",
  instagramUrl: "https://instagram.com/",
  portfolioTitle: "HerCodeHerStory"
};

const defaultPosts: Post[] = [
  {
    id: 1,
    title: "Designing a personal portfolio around stories and learning",
    slug: "designing-a-personal-portfolio-around-stories-and-learning",
    excerpt: "A reflection on turning a personal website into a living archive of projects, lessons and growth.",
    content: "<p>Building a personal portfolio has become more than a presentation of my work; it has become a way to preserve the journey itself.</p><p>I wanted the site to feel like a stitched archive of the projects I build, the lessons I learn and the life moments that shape my perspective.</p><p>That is why the frontend-only version keeps the storytelling experience central while staying lightweight and easy to host.</p>",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    location: "Colombo",
    mood: "Reflective",
    status: "PUBLISHED",
    isFeatured: true,
    allowComments: true,
    allowReactions: true,
    categoryId: 1,
    category: { id: 1, name: "Code & Projects", slug: "code-projects" },
    publishedAt: "2026-01-18T10:00:00.000Z",
    createdAt: "2026-01-18T10:00:00.000Z",
    updatedAt: "2026-01-18T10:00:00.000Z",
    tags: [{ tag: { id: 1, name: "Next.js", slug: "nextjs" } }, { tag: { id: 2, name: "AI", slug: "ai" } }],
    _count: { comments: 2, reactions: 12 }
  },
  {
    id: 2,
    title: "Learning AI with curiosity and consistency",
    slug: "learning-ai-with-curiosity-and-consistency",
    excerpt: "A short journal entry about the pace and patience needed to learn AI deeply.",
    content: "<p>Artificial intelligence is a huge field, but the most useful way to learn it is through small, repeatable experiments.</p><p>I have been exploring concepts around language models, prompts, evaluation and human-centered design while keeping the process practical and grounded.</p>",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    location: "Remote",
    mood: "Focused",
    status: "PUBLISHED",
    isFeatured: true,
    allowComments: true,
    allowReactions: true,
    categoryId: 2,
    category: { id: 2, name: "AI Learning", slug: "ai-learning" },
    publishedAt: "2026-02-10T10:00:00.000Z",
    createdAt: "2026-02-10T10:00:00.000Z",
    updatedAt: "2026-02-10T10:00:00.000Z",
    tags: [{ tag: { id: 2, name: "AI", slug: "ai" } }, { tag: { id: 3, name: "Learning", slug: "learning" } }],
    _count: { comments: 1, reactions: 8 }
  },
  {
    id: 3,
    title: "University life lessons beyond the classroom",
    slug: "university-life-lessons-beyond-the-classroom",
    excerpt: "Learning to balance deadlines, friendships, challenges and energy in student life.",
    content: "<p>University life is not only about coursework and grades. It is where habits, discipline and confidence become real.</p><p>Every semester teaches me something new about time management, resilience and the value of a supportive community.</p>",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    location: "University",
    mood: "Balanced",
    status: "PUBLISHED",
    isFeatured: false,
    allowComments: true,
    allowReactions: true,
    categoryId: 3,
    category: { id: 3, name: "University Life", slug: "university-life" },
    publishedAt: "2026-03-02T10:00:00.000Z",
    createdAt: "2026-03-02T10:00:00.000Z",
    updatedAt: "2026-03-02T10:00:00.000Z",
    tags: [{ tag: { id: 4, name: "Campus", slug: "campus" } }],
    _count: { comments: 0, reactions: 4 }
  }
];

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "HerCodeHerStory",
    slug: "hercodeherstory",
    description: "A personal portfolio experience for storytelling, learning and content discovery.",
    longDescription: "A full-featured Next.js experience that blends storytelling, portfolio content and a polished design system.",
    techStack: "Next.js, TypeScript, Tailwind CSS",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    coverImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    status: "Completed",
    isFeatured: true,
    createdAt: "2026-01-10T10:00:00.000Z",
    updatedAt: "2026-01-10T10:00:00.000Z"
  },
  {
    id: 2,
    title: "AI Study Companion",
    slug: "ai-study-companion",
    description: "A lightweight tool for organizing study notes, prompts and AI learning resources.",
    longDescription: "A practical learning companion that helps structure notes and connect concepts across the AI journey.",
    techStack: "React, Vite, OpenAI API",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    coverImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
    status: "In Progress",
    isFeatured: true,
    createdAt: "2026-02-15T10:00:00.000Z",
    updatedAt: "2026-02-15T10:00:00.000Z"
  }
];

const defaultCertificates: Certificate[] = [
  {
    id: 1,
    title: "React Fundamentals",
    issuer: "Coursera",
    issuedDate: "2025-08-01",
    credentialUrl: "https://example.com/",
    certificateImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description: "Completed a guided React learning path with hands-on exercises.",
    createdAt: "2025-08-02T10:00:00.000Z",
    updatedAt: "2025-08-02T10:00:00.000Z"
  }
];

const defaultAchievements: Achievement[] = [
  {
    id: 1,
    title: "Built a portfolio-first web presence",
    description: "Created a polished personal website centered on stories and growth.",
    date: "2026-01-20",
    imageUrl: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
    category: "Development",
    createdAt: "2026-01-20T10:00:00.000Z",
    updatedAt: "2026-01-20T10:00:00.000Z"
  }
];

const defaultTimelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Started building the portfolio",
    description: "Turned personal learning and story-sharing into a clear digital experience.",
    eventDate: "2026-01-10",
    category: "Projects",
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=900&q=80",
    icon: "🚀",
    createdAt: "2026-01-10T10:00:00.000Z",
    updatedAt: "2026-01-10T10:00:00.000Z"
  },
  {
    id: 2,
    title: "Explored AI learning more deeply",
    description: "Focused on connecting learning goals, experiments and practical projects.",
    eventDate: "2026-02-15",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    icon: "🧠",
    createdAt: "2026-02-15T10:00:00.000Z",
    updatedAt: "2026-02-15T10:00:00.000Z"
  }
];

const defaultMedia: Media[] = [
  {
    id: 1,
    fileUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    fileType: "IMAGE",
    caption: "Workspace setup",
    altText: "Workspace setup",
    createdAt: "2026-01-18T10:00:00.000Z"
  },
  {
    id: 2,
    fileUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    fileType: "IMAGE",
    caption: "Creative work",
    altText: "Creative work",
    createdAt: "2026-02-10T10:00:00.000Z"
  }
];

const defaultComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    name: "A friend",
    email: "friend@example.com",
    comment: "This feels warm and personal. Keep going.",
    status: "APPROVED",
    createdAt: "2026-01-20T10:00:00.000Z",
    updatedAt: "2026-01-20T10:00:00.000Z"
  }
];

const defaultMessages: ContactMessage[] = [];
const defaultReactions: Record<number, ReactionSummary[]> = {
  1: [{ reactionType: "LOVE", count: 4 }, { reactionType: "INSPIRED", count: 2 }],
  2: [{ reactionType: "LEARNED", count: 3 }]
};

type FrontendStore = {
  profile: Profile | null;
  categories: Category[];
  tags: Tag[];
  posts: Post[];
  projects: Project[];
  certificates: Certificate[];
  achievements: Achievement[];
  timelineEvents: TimelineEvent[];
  media: Media[];
  comments: Comment[];
  messages: ContactMessage[];
  reactions: Record<number, ReactionSummary[]>;
};

function createDefaultStore(): FrontendStore {
  return {
    profile: defaultProfile,
    categories: defaultCategories,
    tags: defaultTags,
    posts: defaultPosts,
    projects: defaultProjects,
    certificates: defaultCertificates,
    achievements: defaultAchievements,
    timelineEvents: defaultTimelineEvents,
    media: defaultMedia,
    comments: defaultComments,
    messages: defaultMessages,
    reactions: defaultReactions
  };
}

export function exportContentData() {
  return Promise.resolve(clone(loadStore()));
}

export function importContentData(data: unknown) {
  if (!data || typeof data !== "object") {
    return Promise.reject(new Error("Invalid backup file."));
  }

  const next = {
    ...createDefaultStore(),
    ...(data as Partial<FrontendStore>)
  };

  saveStore(next);
  return Promise.resolve(clone(next));
}

function loadStore(): FrontendStore {
  if (typeof window === "undefined") {
    return createDefaultStore();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultStore();
    }

    const parsed = JSON.parse(raw) as Partial<FrontendStore>;
    return {
      ...createDefaultStore(),
      ...parsed,
      categories: parsed.categories || defaultCategories,
      tags: parsed.tags || defaultTags,
      posts: parsed.posts || defaultPosts,
      projects: parsed.projects || defaultProjects,
      certificates: parsed.certificates || defaultCertificates,
      achievements: parsed.achievements || defaultAchievements,
      timelineEvents: parsed.timelineEvents || defaultTimelineEvents,
      media: parsed.media || defaultMedia,
      comments: parsed.comments || defaultComments,
      messages: parsed.messages || defaultMessages,
      reactions: parsed.reactions || defaultReactions,
      profile: parsed.profile ?? defaultProfile
    };
  } catch {
    return createDefaultStore();
  }
}

function saveStore(store: FrontendStore) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function slugifyValue(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureTags(store: FrontendStore, tagNames?: string[]) {
  if (!tagNames) {
    return undefined;
  }

  return tagNames.filter(Boolean).map((name) => {
    const slug = slugifyValue(name);
    let tag = store.tags.find((item) => item.slug === slug);

    if (!tag) {
      tag = { id: Date.now() + store.tags.length, name, slug };
      store.tags.push(tag);
    }

    return { tag };
  });
}

function hydratePost(store: FrontendStore, post: Post): Post {
  const category = post.category || store.categories.find((item) => item.id === post.categoryId) || null;
  const postMedia = [
    ...(post.media || []),
    ...store.media.filter((item) => item.postId === post.id)
  ].filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index);
  const comments = store.comments.filter((item) => item.postId === post.id);
  const reactionCount = (store.reactions[post.id] || []).reduce((total, item) => total + item.count, 0);

  return clone({
    ...post,
    category,
    media: postMedia,
    comments,
    _count: {
      comments: comments.length || post._count?.comments || 0,
      reactions: reactionCount || post._count?.reactions || 0
    }
  });
}

function withStore<T>(callback: (store: FrontendStore) => T): T {
  const store = loadStore();
  const result = callback(store);
  saveStore(store);
  return result;
}

export function getProfile() {
  return Promise.resolve(loadStore().profile);
}

export function getCategories() {
  return Promise.resolve(loadStore().categories);
}

export function getTags() {
  return Promise.resolve(loadStore().tags);
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

export function getPosts(params?: PostQuery) {
  const store = loadStore();
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const posts = store.posts.map((post) => hydratePost(store, post));
  const filtered = posts.filter((post) => {
    const matchesStatus = !params?.status || post.status === params.status;
    const matchesFeatured = params?.featured === undefined || post.isFeatured === params.featured;
    const matchesCategory = !params?.category || post.category?.slug === params.category;
    const matchesTag = !params?.tag || post.tags?.some((item) => item.tag.slug === params.tag);
    const matchesSearch = !params?.search || [post.title, post.excerpt, post.content].join(" ").toLowerCase().includes(params.search.toLowerCase());
    return matchesStatus && matchesFeatured && matchesCategory && matchesTag && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
  const paged = sorted.slice((page - 1) * limit, page * limit);

  return Promise.resolve({
    posts: paged,
    meta: {
      total: filtered.length,
      page,
      limit,
      totalPages: Math.max(Math.ceil(filtered.length / limit), 1)
    }
  });
}

export function getFeaturedPosts() {
  const store = loadStore();
  const posts = store.posts
    .map((post) => hydratePost(store, post))
    .filter((post) => post.isFeatured && post.status === "PUBLISHED")
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());

  return Promise.resolve(posts);
}

export function getPostBySlug(slug: string) {
  const store = loadStore();
  const post = store.posts.find((item) => item.slug === slug);
  return Promise.resolve(post ? hydratePost(store, post) : null);
}

export function getProjects() {
  return Promise.resolve(loadStore().projects);
}

export function getCertificates() {
  return Promise.resolve(loadStore().certificates);
}

export function getAchievements() {
  return Promise.resolve(loadStore().achievements);
}

export function getTimelineEvents() {
  return Promise.resolve(loadStore().timelineEvents);
}

export function getGalleryMedia(page = 1, limit = 40) {
  const store = loadStore();
  const start = (page - 1) * limit;
  const media = store.media.slice(start, start + limit);
  return Promise.resolve({
    media,
    meta: {
      total: store.media.length,
      page,
      limit,
      totalPages: Math.max(Math.ceil(store.media.length / limit), 1)
    }
  });
}

export function getReactions(postId: number) {
  const store = loadStore();
  return Promise.resolve(store.reactions[postId] || []);
}

export function createReaction(postId: number, reactionType: ReactionType, visitorId: string) {
  return Promise.resolve(
    withStore((store) => {
      const existing = store.reactions[postId] || [];
      const current = existing.find((item) => item.reactionType === reactionType);
      if (current) {
        current.count += 1;
      } else {
        existing.push({ reactionType, count: 1 });
      }
      store.reactions[postId] = existing;
      return { reactionType, visitorId };
    })
  );
}

export function createComment(postId: number, payload: { name: string; email?: string; comment: string }) {
  return Promise.resolve(
    withStore((store) => {
      const comment: Comment = {
        id: Date.now(),
        postId,
        name: payload.name,
        email: payload.email || null,
        comment: payload.comment,
        status: "APPROVED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.comments.push(comment);
      const post = store.posts.find((item) => item.id === postId);
      if (post) {
        post._count = { comments: (post._count?.comments || 0) + 1, reactions: post._count?.reactions || 0 };
      }
      return comment;
    })
  );
}

export function submitContactMessage(payload: { name: string; email: string; subject?: string; message: string }) {
  return Promise.resolve(
    withStore((store) => {
      const message: ContactMessage = {
        id: Date.now(),
        name: payload.name,
        email: payload.email,
        subject: payload.subject || null,
        message: payload.message,
        status: "NEW",
        createdAt: new Date().toISOString()
      };
      store.messages.push(message);
      return message;
    })
  );
}

export function loginAdmin(payload: { email: string; password: string }) {
  if (payload.email.trim().toLowerCase() !== ADMIN_EMAIL || payload.password !== ADMIN_PASSWORD) {
    return Promise.reject(new Error("Invalid email or password."));
  }

  return Promise.resolve({
    token: "frontend-only-token",
    user: {
      id: 1,
      name: "Shanika Munasinghe",
      email: ADMIN_EMAIL,
      role: "ADMIN" as const,
      bio: "Frontend-only admin session"
    }
  });
}

export function getMe() {
  return Promise.resolve({
    id: 1,
    name: "Shanika Munasinghe",
    email: ADMIN_EMAIL,
    role: "ADMIN" as const,
    bio: "Frontend-only admin session"
  });
}

export function getDashboardStats(): Promise<DashboardStats> {
  const store = loadStore();
  return Promise.resolve({
    users: 1,
    posts: store.posts.length,
    publishedPosts: store.posts.filter((post) => post.status === "PUBLISHED").length,
    draftPosts: store.posts.filter((post) => post.status === "DRAFT").length,
    comments: store.comments.length,
    pendingComments: store.comments.filter((comment) => comment.status === "PENDING").length,
    reactions: Object.values(store.reactions).reduce((total, items) => total + items.reduce((sum, item) => sum + item.count, 0), 0),
    projects: store.projects.length,
    certificates: store.certificates.length,
    achievements: store.achievements.length,
    timelineEvents: store.timelineEvents.length,
    media: store.media.length,
    contactMessages: store.messages.length,
    newContactMessages: store.messages.filter((message) => message.status === "NEW").length
  });
}

export function adminGetComments(status?: string) {
  const store = loadStore();
  const comments = status ? store.comments.filter((comment) => comment.status === status) : store.comments;
  return Promise.resolve({ comments, meta: { total: comments.length, page: 1, limit: comments.length, totalPages: 1 } });
}

export function updateCommentStatus(id: number, status: Comment["status"]) {
  return Promise.resolve(
    withStore((store) => {
      const comment = store.comments.find((item) => item.id === id);
      if (comment) {
        comment.status = status;
        comment.updatedAt = new Date().toISOString();
      }
      return comment;
    })
  );
}

export function deleteComment(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.comments = store.comments.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

export function adminGetMessages(status?: string) {
  const store = loadStore();
  const messages = status ? store.messages.filter((message) => message.status === status) : store.messages;
  return Promise.resolve({ messages, meta: { total: messages.length, page: 1, limit: messages.length, totalPages: 1 } });
}

export function updateMessageStatus(id: number, status: ContactMessage["status"]) {
  return Promise.resolve(
    withStore((store) => {
      const message = store.messages.find((item) => item.id === id);
      if (message) {
        message.status = status;
      }
      return message;
    })
  );
}

export function deleteMessage(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.messages = store.messages.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

export function createPost(payload: Partial<Post> & { tagNames?: string[] }) {
  return Promise.resolve(
    withStore((store) => {
      const now = new Date().toISOString();
      const categoryId = payload.categoryId || null;
      const category = categoryId ? store.categories.find((item) => item.id === categoryId) || null : null;
      const tags = ensureTags(store, payload.tagNames) || [];
      const post: Post = {
        id: Date.now(),
        title: payload.title || "Untitled post",
        slug: payload.slug || `post-${Date.now()}`,
        excerpt: payload.excerpt || null,
        content: payload.content || "",
        coverImage: payload.coverImage || null,
        videoUrl: payload.videoUrl || null,
        location: payload.location || null,
        mood: payload.mood || null,
        status: payload.status || "DRAFT",
        isFeatured: payload.isFeatured || false,
        allowComments: payload.allowComments !== false,
        allowReactions: payload.allowReactions !== false,
        categoryId,
        category,
        publishedAt: payload.publishedAt || (payload.status === "PUBLISHED" ? now : null),
        createdAt: now,
        updatedAt: now,
        tags,
        media: [],
        comments: [],
        _count: { comments: 0, reactions: 0 }
      };
      store.posts.unshift(post);
      return hydratePost(store, post);
    })
  );
}

export function updatePost(id: number, payload: Partial<Post> & { tagNames?: string[] }) {
  return Promise.resolve(
    withStore((store) => {
      const post = store.posts.find((item) => item.id === id);
      if (post) {
        const { tagNames, category, tags, comments, media, _count, ...postPayload } = payload;
        Object.assign(post, postPayload, { updatedAt: new Date().toISOString() });

        if ("categoryId" in payload) {
          post.category = post.categoryId ? store.categories.find((item) => item.id === post.categoryId) || null : null;
        }

        const nextTags = ensureTags(store, tagNames);
        if (nextTags) {
          post.tags = nextTags;
        }

        if (post.status === "PUBLISHED" && !post.publishedAt) {
          post.publishedAt = new Date().toISOString();
        }
      }
      return post ? hydratePost(store, post) : null;
    })
  );
}

export function deletePost(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.posts = store.posts.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

export function createProject(payload: Partial<Project>) {
  return Promise.resolve(
    withStore((store) => {
      const project: Project = {
        id: Date.now(),
        title: payload.title || "Untitled project",
        slug: payload.slug || `project-${Date.now()}`,
        description: payload.description || null,
        longDescription: payload.longDescription || null,
        techStack: payload.techStack || null,
        githubUrl: payload.githubUrl || null,
        liveUrl: payload.liveUrl || null,
        coverImage: payload.coverImage || null,
        status: payload.status || "Draft",
        isFeatured: payload.isFeatured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.projects.unshift(project);
      return project;
    })
  );
}

export function updateProject(id: number, payload: Partial<Project>) {
  return Promise.resolve(
    withStore((store) => {
      const project = store.projects.find((item) => item.id === id);
      if (project) {
        Object.assign(project, payload, { updatedAt: new Date().toISOString() });
      }
      return project;
    })
  );
}

export function deleteProject(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.projects = store.projects.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

export function createCertificate(payload: Partial<Certificate>) {
  return Promise.resolve(
    withStore((store) => {
      const certificate: Certificate = {
        id: Date.now(),
        title: payload.title || "Untitled certificate",
        issuer: payload.issuer || "Unknown issuer",
        issuedDate: payload.issuedDate || null,
        credentialUrl: payload.credentialUrl || null,
        certificateImage: payload.certificateImage || null,
        description: payload.description || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.certificates.unshift(certificate);
      return certificate;
    })
  );
}

export function updateCertificate(id: number, payload: Partial<Certificate>) {
  return Promise.resolve(
    withStore((store) => {
      const certificate = store.certificates.find((item) => item.id === id);
      if (certificate) {
        Object.assign(certificate, payload, { updatedAt: new Date().toISOString() });
      }
      return certificate;
    })
  );
}

export function deleteCertificate(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.certificates = store.certificates.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

export function createAchievement(payload: Partial<Achievement>) {
  return Promise.resolve(
    withStore((store) => {
      const achievement: Achievement = {
        id: Date.now(),
        title: payload.title || "Untitled achievement",
        description: payload.description || null,
        date: payload.date || null,
        imageUrl: payload.imageUrl || null,
        category: payload.category || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.achievements.unshift(achievement);
      return achievement;
    })
  );
}

export function updateAchievement(id: number, payload: Partial<Achievement>) {
  return Promise.resolve(
    withStore((store) => {
      const achievement = store.achievements.find((item) => item.id === id);
      if (achievement) {
        Object.assign(achievement, payload, { updatedAt: new Date().toISOString() });
      }
      return achievement;
    })
  );
}

export function deleteAchievement(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.achievements = store.achievements.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

export function createTimelineEvent(payload: Partial<TimelineEvent>) {
  return Promise.resolve(
    withStore((store) => {
      const event: TimelineEvent = {
        id: Date.now(),
        title: payload.title || "Untitled event",
        description: payload.description || null,
        eventDate: payload.eventDate || null,
        category: payload.category || null,
        imageUrl: payload.imageUrl || null,
        icon: payload.icon || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.timelineEvents.unshift(event);
      return event;
    })
  );
}

export function updateTimelineEvent(id: number, payload: Partial<TimelineEvent>) {
  return Promise.resolve(
    withStore((store) => {
      const event = store.timelineEvents.find((item) => item.id === id);
      if (event) {
        Object.assign(event, payload, { updatedAt: new Date().toISOString() });
      }
      return event;
    })
  );
}

export function deleteTimelineEvent(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.timelineEvents = store.timelineEvents.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

export function createCategory(payload: Partial<Category>) {
  return Promise.resolve(
    withStore((store) => {
      const category: Category = {
        id: Date.now(),
        name: payload.name || "Untitled category",
        slug: payload.slug || `category-${Date.now()}`,
        description: payload.description || null,
        icon: payload.icon || null,
        color: payload.color || null
      };
      store.categories.unshift(category);
      return category;
    })
  );
}

export function updateCategory(id: number, payload: Partial<Category>) {
  return Promise.resolve(
    withStore((store) => {
      const category = store.categories.find((item) => item.id === id);
      if (category) {
        Object.assign(category, payload);
      }
      return category;
    })
  );
}

export function deleteCategory(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.categories = store.categories.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Could not read image file."));
      }
    };
    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.readAsDataURL(file);
  });
}

export function uploadMedia(files: File[], payload?: { postId?: number; caption?: string; altText?: string; cropShape?: string }) {
  return new Promise<Media[]>((resolve, reject) => {
    const run = async () => {
      try {
        const store = loadStore();
        const uploaded = await Promise.all(files.map(async (file, index) => ({
          id: Date.now() + index,
          postId: payload?.postId || null,
          fileUrl: await readFileAsDataUrl(file),
          fileType: file.type.startsWith("video") ? "VIDEO" : "IMAGE",
          caption: payload?.caption || null,
          altText: payload?.altText || null,
          cropShape: payload?.cropShape || null,
          createdAt: new Date().toISOString()
        } as Media)));

        store.media.unshift(...uploaded);
        if (payload?.postId) {
          const post = store.posts.find((item) => item.id === payload.postId);
          if (post) {
            post.media = [
              ...uploaded,
              ...(post.media || []).filter((item) => !uploaded.some((media) => media.id === item.id))
            ];
            post.updatedAt = new Date().toISOString();
          }
        }
        saveStore(store);
        resolve(uploaded);
      } catch (error) {
        reject(error);
      }
    };

    run();
  });
}

export function deleteMedia(id: number) {
  return Promise.resolve(
    withStore((store) => {
      store.media = store.media.filter((item) => item.id !== id);
      return undefined;
    })
  );
}

export function updateProfile(payload: Partial<Profile>) {
  return Promise.resolve(
    withStore((store) => {
      store.profile = {
        ...(store.profile || defaultProfile),
        ...payload,
        id: 1
      };
      return store.profile;
    })
  );
}

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong.") {
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
}
