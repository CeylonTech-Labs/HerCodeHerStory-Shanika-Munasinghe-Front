"use client";

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { deleteCertificate, getCertificates } from "@/lib/api";
import type { Certificate } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([]);
  const load = () => getCertificates().then(setItems).catch(() => toast.error("Could not load certificates."));
  useEffect(() => { load(); }, []);
  return <div><AdminPageTitle title="Certificates" actionHref="/admin/certificates/create" actionLabel="Create certificate" /><DataTable data={items} columns={[{ header: "Title", cell: (i) => <b>{i.title}</b> }, { header: "Issuer", cell: (i) => i.issuer }, { header: "Date", cell: (i) => formatDate(i.issuedDate) }, { header: "Actions", cell: (i) => <div className="flex gap-2"><Button size="sm" variant="outline" asChild><Link href={`/admin/certificates/edit/${i.id}`}><Edit className="h-4 w-4" /></Link></Button><ConfirmDialog onConfirm={async () => { await deleteCertificate(i.id); toast.success("Deleted."); load(); }}><Button size="sm" variant="secondary"><Trash2 className="h-4 w-4" /></Button></ConfirmDialog></div> }]} /></div>;
}
