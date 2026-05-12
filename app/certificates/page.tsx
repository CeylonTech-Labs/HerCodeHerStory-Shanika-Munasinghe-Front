import type { Metadata } from "next";
import { getCertificates } from "@/lib/api";
import type { Certificate } from "@/lib/types";
import { CertificatesClient } from "./CertificatesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Certificate showcase with issuers, dates, images and credentials."
};

export default async function CertificatesPage() {
  let certificates: Certificate[] = [];
  try {
    certificates = await getCertificates();
  } catch {}
  return <CertificatesClient certificates={certificates} />;
}
