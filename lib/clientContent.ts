"use client";

import { useEffect, useState } from "react";

const CONTENT_UPDATED_EVENT = "hercodeherstory-content-updated";

export function useClientContent<T>(loader: () => Promise<T>, fallback: T) {
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    let active = true;

    const refresh = async () => {
      try {
        const next = await loader();
        if (active) {
          setValue(next);
        }
      } catch {
        if (active) {
          setValue(fallback);
        }
      }
    };

    refresh();

    const onContentUpdated = () => {
      refresh();
    };

    window.addEventListener(CONTENT_UPDATED_EVENT, onContentUpdated);

    return () => {
      active = false;
      window.removeEventListener(CONTENT_UPDATED_EVENT, onContentUpdated);
    };
  }, [fallback, loader]);

  return value;
}
