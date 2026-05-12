import { HeroSection } from "@/components/home/hero-section";
import { HomeSections } from "@/components/home/home-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asgard | Home",
  description: "Asghard HQ Homepage",
};


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HomeSections />
    </main>
  );
}