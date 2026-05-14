import ProfileCard from "@/components/profile/profile-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asgard | Panelen",
  description: "Asghard HQ Homepage profile dashboard",
};


export default function LoginPage() {
  return (
    <main>
      <ProfileCard />
    </main>
  );
}