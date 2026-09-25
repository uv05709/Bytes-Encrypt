import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — BytesEncrypt Technologies",
  description:
    "About BytesEncrypt Technologies — an offensive security and assurance partner staffed by OSCP, CISSP and other industry-certified practitioners.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
