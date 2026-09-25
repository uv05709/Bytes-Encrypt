import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { Approach } from "@/components/Approach";
import { WhyUs } from "@/components/WhyUs";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Solutions />
      <Approach />
      <WhyUs />
      <ContactSection />
    </>
  );
}
