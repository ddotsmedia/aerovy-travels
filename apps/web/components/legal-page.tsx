import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-border bg-surface border-b">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="text-muted mb-4 text-sm">
            <Link href="/" className="hover:text-brand-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">{title}</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="text-muted mt-2 text-sm">Last updated · {lastUpdated}</p>
        </div>
      </section>
      <article className="text-text/90 [&_a]:text-brand-primary [&_h2]:text-text mx-auto max-w-3xl px-4 py-12 text-[15px] leading-relaxed sm:px-6 lg:px-8 [&_a]:underline-offset-2 [&_a]:hover:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </article>
    </>
  );
}
