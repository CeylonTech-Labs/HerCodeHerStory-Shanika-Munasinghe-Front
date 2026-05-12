"use client";

import { Mail, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PageShell } from "@/components/common/PageShell";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/api";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function action(formData: FormData) {
    setStatus("sending");
    try {
      await submitContactMessage({
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        subject: String(formData.get("subject") || ""),
        message: String(formData.get("message") || "")
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageShell>
      <section className="container py-16 md:py-24">
        <SectionTitle eyebrow="Contact" title="Send a message to Shanika." description="For opportunities, collaborations, project ideas, feedback, or a thoughtful hello." />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <Mail className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-black">Email</h3>
                <Link href="mailto:hello@hercodeherstory.com" className="mt-2 block text-sm text-muted-foreground hover:text-primary">hello@hercodeherstory.com</Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <MapPin className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-black">Location</h3>
                <p className="mt-2 text-sm text-muted-foreground">Sri Lanka</p>
              </CardContent>
            </Card>
          </div>
          <form action={action} className="glass-card rounded-lg p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="name" placeholder="Your name" required />
              <Input name="email" type="email" placeholder="Your email" required />
            </div>
            <Input name="subject" placeholder="Subject" className="mt-4" />
            <Textarea name="message" placeholder="Write your message..." className="mt-4" required />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button disabled={status === "sending"}>
                <Send className="h-4 w-4" />
                {status === "sending" ? "Sending" : "Send message"}
              </Button>
              {status === "sent" ? <p className="text-sm font-semibold text-emerald-600">Message sent successfully.</p> : null}
              {status === "error" ? <p className="text-sm font-semibold text-destructive">Message could not be sent.</p> : null}
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
