import { CalendarDays, Heart, MessageCircle, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedCard } from "@/components/common/AnimatedCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { formatDate, imageFallback } from "@/lib/utils";

export function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  const image = post.coverImage || imageFallback(post.slug);

  return (
    <AnimatedCard delay={delay}>
      <Card className="group h-full overflow-hidden">
        <Link href={`/stories/${post.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={image}
              alt={post.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
            {post.isFeatured ? (
              <Badge className="absolute left-4 top-4 bg-white/90 text-violet-700">Featured</Badge>
            ) : null}
          </div>
          <CardContent className="p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              {post.category ? <Badge>{post.category.name}</Badge> : null}
              {post.mood ? <Badge variant="secondary">{post.mood}</Badge> : null}
            </div>
            <h3 className="line-clamp-2 text-xl font-black leading-tight tracking-normal group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {post.excerpt || "A story from Shanika's journey through code, learning, life and growth."}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
              {post.location ? (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {post.location}
                </span>
              ) : null}
              <span className="ml-auto inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {post._count?.reactions || 0}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {post._count?.comments || 0}
                </span>
              </span>
            </div>
          </CardContent>
        </Link>
      </Card>
    </AnimatedCard>
  );
}
