import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import { posts } from "../page";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return { title: "Post not found" };
  return { title: p.title, description: p.excerpt, openGraph: { images: [p.image] } };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-muted mb-6 text-sm">
        <Link href="/" className="hover:text-brand-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-brand-primary">
          Journal
        </Link>
      </nav>

      <div className="text-muted flex flex-wrap items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1">
          <Calendar className="size-3" aria-hidden="true" />
          {new Date(p.date).toLocaleDateString("en", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" aria-hidden="true" />
          {p.readMinutes} min read
        </span>
        <span>· {p.author}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{p.title}</h1>
      <p className="text-muted mt-4 text-xl">{p.excerpt}</p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl">
        <Image
          src={p.image}
          alt={p.title}
          fill
          priority
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="prose prose-neutral text-text/90 mt-10 max-w-none">
        <p>
          This is the opening paragraph of &ldquo;{p.title}&rdquo;. The full article would be
          authored in MDX and rendered here. For now, think of this as a stub that looks real enough
          to review the layout and typography against the brand tokens.
        </p>
        <p>
          Real content lands in Phase 2 — we&rsquo;ll add an MDX pipeline with syntax highlighting,
          inline experience cards (so a blog post about Liwa can drop a live booking card in-line),
          and a simple editorial CMS for our team.
        </p>
        <h2>What you&rsquo;ll get in the full post</h2>
        <ul>
          <li>Curated photography by our in-house team</li>
          <li>Interactive maps of neighborhoods and routes</li>
          <li>Direct links to the exact experiences and hotels mentioned</li>
          <li>A closing &ldquo;Our take&rdquo; section from the author</li>
        </ul>
        <p>
          Until then —{" "}
          <Link href="/experiences" className="text-brand-primary hover:underline">
            browse the catalog
          </Link>{" "}
          or
          <Link href="/plan" className="text-brand-primary hover:underline">
            {" "}
            try the AI planner
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
