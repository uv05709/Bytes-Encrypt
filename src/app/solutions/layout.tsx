import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions & Offerings — BytesEncrypt Technologies",
  description:
    "BytesEncrypt Technologies solutions — VAPT, red teaming, secure code review, cloud security and cyber risk advisory for enterprises.",
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
