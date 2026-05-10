"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { createReaction, getReactions } from "@/lib/api";
import type { ReactionSummary, ReactionType } from "@/lib/types";
import { getVisitorId } from "@/lib/utils";

const reactions: { type: ReactionType; label: string; icon: string }[] = [
  { type: "LOVE", label: "Love", icon: "❤️" },
  { type: "CLAP", label: "Clap", icon: "👏" },
  { type: "INSPIRED", label: "Inspired", icon: "🌟" },
  { type: "HAPPY", label: "Happy", icon: "😊" },
  { type: "AMAZING", label: "Amazing", icon: "🔥" },
  { type: "LEARNED", label: "Learned", icon: "💡" },
  { type: "EMOTIONAL", label: "Emotional", icon: "🥹" }
];

export function ReactionBar({ postId }: { postId: number }) {
  const [counts, setCounts] = useState<Record<ReactionType, number>>({} as Record<ReactionType, number>);
  const [selected, setSelected] = useState<ReactionType[]>([]);

  useEffect(() => {
    getReactions(postId)
      .then((items: ReactionSummary[]) => {
        const next = {} as Record<ReactionType, number>;
        items.forEach((item) => {
          next[item.reactionType] = item.count;
        });
        setCounts(next);
      })
      .catch(() => undefined);

    const stored = window.localStorage.getItem(`hercodeherstory_reactions_${postId}`);
    setSelected(stored ? JSON.parse(stored) : []);
  }, [postId]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const react = async (type: ReactionType) => {
    if (selectedSet.has(type)) {
      return;
    }

    const visitorId = getVisitorId();
    setCounts((current) => ({ ...current, [type]: (current[type] || 0) + 1 }));
    const nextSelected = [...selected, type];
    setSelected(nextSelected);
    window.localStorage.setItem(`hercodeherstory_reactions_${postId}`, JSON.stringify(nextSelected));

    try {
      await createReaction(postId, type, visitorId);
    } catch {
      setCounts((current) => ({ ...current, [type]: Math.max((current[type] || 1) - 1, 0) }));
    }
  };

  return (
    <div className="glass-card rounded-lg p-4">
      <p className="mb-3 text-sm font-bold">React to this story</p>
      <div className="flex flex-wrap gap-2">
        {reactions.map((reaction) => {
          const isSelected = selectedSet.has(reaction.type);
          return (
            <motion.button
              key={reaction.type}
              whileTap={{ scale: 0.88 }}
              whileHover={{ y: -2 }}
              onClick={() => react(reaction.type)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition ${
                isSelected
                  ? "border-primary bg-primary/12 text-primary"
                  : "border-border bg-background/70 hover:border-primary/50"
              }`}
              aria-pressed={isSelected}
            >
              <span aria-hidden>{reaction.icon}</span>
              <span>{reaction.label}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{counts[reaction.type] || 0}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
