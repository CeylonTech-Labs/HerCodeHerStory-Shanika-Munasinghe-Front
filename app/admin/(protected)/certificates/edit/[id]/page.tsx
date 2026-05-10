"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { CertificateForm } from "@/components/admin/CertificateForm";
import { getCertificates } from "@/lib/api";
import type { Certificate } from "@/lib/types";

export default function EditCertificatePage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Certificate>();
  useEffect(() => { getCertificates().then((items) => setItem(items.find((x) => x.id === Number(id)))); }, [id]);
  return <><AdminPageTitle title="Edit certificate" />{item ? <CertificateForm item={item} /> : <p>Loading...</p>}</>;
}
