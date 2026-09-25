import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — BytesEncrypt Technologies",
  description:
    "Research, write-ups, and field notes from BytesEncrypt Technologies' offensive security practice.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
