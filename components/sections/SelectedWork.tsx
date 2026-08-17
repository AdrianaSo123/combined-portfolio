import { ProjectFeature } from "@/components/work/ProjectFeature";
import { SectionLabel } from "@/components/system/TechnicalRule";
import { featuredProjects } from "@/content/projects";

// Editorial list of featured case studies (alternating layout).
export function SelectedWork() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8">
      <SectionLabel index="01" label="Selected work" className="text-ink" />
      <div className="mt-6">
        {featuredProjects.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} reversed={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
