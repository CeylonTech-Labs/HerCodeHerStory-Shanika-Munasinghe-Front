import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Shanika Munasinghe through the HerCodeHerStory platform."
};

export default function ContactPage() {
  return <ContactForm />;
}
