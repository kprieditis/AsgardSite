import LoginSection  from "@/components/login/login-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asgard | Logga in",
  description: "Asghard HQ Homepage login page",
};


export default function LoginPage() {
  return (
    <main>
      <LoginSection />
    </main>
  );
}