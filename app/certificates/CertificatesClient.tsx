"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Certificate } from "@/lib/types";
import { formatDate, imageFallback } from "@/lib/utils";

export function CertificatesClient({ certificates }: { certificates: Certificate[] }) {
  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <SectionTitle eyebrow="Certificates" title="Learning receipts and earned milestones." />
        {certificates.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <Dialog key={certificate.id}>
                <DialogTrigger asChild>
                  <button className="group overflow-hidden rounded-lg border bg-background/70 text-left transition hover:-translate-y-1">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={certificate.certificateImage || imageFallback(certificate.title)} alt={certificate.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="33vw" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-black">{certificate.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{certificate.issuer} · {formatDate(certificate.issuedDate)}</p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image src={certificate.certificateImage || imageFallback(certificate.title)} alt={certificate.title} fill className="object-contain" sizes="80vw" />
                  </div>
                  <DialogHeader>
                    <DialogTitle>{certificate.title}</DialogTitle>
                    <DialogDescription>{certificate.description || `${certificate.issuer} · ${formatDate(certificate.issuedDate)}`}</DialogDescription>
                  </DialogHeader>
                  {certificate.credentialUrl ? <div className="px-6 pb-6"><Button asChild><Link href={certificate.credentialUrl}><ExternalLink className="h-4 w-4" /> Credential</Link></Button></div> : null}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <EmptyState title="Certificates will appear here" />
        )}
      </section>
    </PageShell>
  );
}
