import Image from "next/image";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Card, CardContent } from "@/components/ui/card";
import type { Certificate } from "@/lib/types";
import { formatDate, imageFallback } from "@/lib/utils";

export function CertificateHighlights({ certificates }: { certificates: Certificate[] }) {
  return (
    <section className="container py-14">
      <SectionTitle eyebrow="Proof of learning" title="Certificates and milestones" />
      {certificates.length ? (
        <div className="grid gap-5 md:grid-cols-3">
          {certificates.slice(0, 3).map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={certificate.certificateImage || imageFallback(certificate.title)} alt={certificate.title} fill className="object-cover" sizes="33vw" unoptimized />
              </div>
              <CardContent className="p-5">
                <h3 className="font-black">{certificate.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{certificate.issuer} · {formatDate(certificate.issuedDate)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="Certificates will appear here" />
      )}
    </section>
  );
}
