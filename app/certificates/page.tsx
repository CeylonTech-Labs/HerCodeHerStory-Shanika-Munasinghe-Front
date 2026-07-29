"use client";

import { useEffect, useState } from "react";
import { getCertificates } from "@/lib/api";
import type { Certificate } from "@/lib/types";
import { CertificatesClient } from "./CertificatesClient";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const next = await getCertificates();
        if (active) setCertificates(next);
      } catch {
        if (active) setCertificates([]);
      }
    };

    load();
    const onContentUpdated = () => {
      load();
    };

    window.addEventListener("hercodeherstory-content-updated", onContentUpdated);
    return () => {
      active = false;
      window.removeEventListener("hercodeherstory-content-updated", onContentUpdated);
    };
  }, []);

  return <CertificatesClient certificates={certificates} />;
}
