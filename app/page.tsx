import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { LabTeaser } from "@/components/sections/LabTeaser";
import { AboutTeaser } from "@/components/sections/AboutTeaser";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Cream lower half: work, lab, and about (spec §7) */}
      <section id="work" className="bg-cream text-ink">
        <SelectedWork />
        <LabTeaser />
        <AboutTeaser />
      </section>
    </>
  );
}
