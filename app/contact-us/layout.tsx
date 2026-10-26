import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Daily Crave Hive about a review, a correction, a partnership, or a guest post.",
  alternates: { canonical: "https://www.dailycravehive.com/contact-us" },
  robots: { index: true, follow: true },
};

export default function ContactUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
