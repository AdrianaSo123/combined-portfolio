import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWork } from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section id="work" className="bg-cream text-ink">
        <SelectedWork />
      </section>
    </>
  );
}
