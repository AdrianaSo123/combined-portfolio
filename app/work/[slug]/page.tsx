import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudy } from "@/components/work/CaseStudy";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProject, projects } from "@/content/projects";
import { siteConfig } from "@/lib/site";
import { routes } from "@/lib/routes";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.subtitle}`,
    description: project.oneLiner,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.name} — ${project.subtitle}`,
    abstract: project.oneLiner,
    url: `${siteConfig.url}${routes.work(project.slug)}`,
    dateCreated: String(project.year),
    creator: { "@type": "Person", name: siteConfig.name },
    keywords: project.disciplines.join(", "),
  };

  return (
    <>
      <JsonLd data={creativeWork} />
      <CaseStudy project={project} />
    </>
  );
}
