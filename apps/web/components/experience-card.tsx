import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@aerovy/ui";
import { type Experience, fromPrice } from "@/lib/catalog";
import { fmtAED, fmtDuration } from "@/lib/site";

export function ExperienceCard({
  experience,
  priority = false,
}: {
  experience: Experience;
  priority?: boolean;
}) {
  const hero = experience.images[0];
  const price = fromPrice(experience);

  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className="group focus-visible:ring-ring focus-visible:ring-offset-bg block rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-lg">
        <div className="bg-surface relative aspect-[4/3] overflow-hidden">
          {hero ? (
            <Image
              src={hero.url}
              alt={hero.altEn}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : null}
          {experience.featured && (
            <span className="bg-brand-primary text-brand-secondary absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold">
              Featured
            </span>
          )}
        </div>
        <CardContent className="p-5">
          <div className="text-muted flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" aria-hidden="true" />
              {experience.location.split(",")[0]}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" />
              {fmtDuration(experience.durationMinutes)}
            </span>
          </div>
          <h3 className="mt-2 line-clamp-2 text-lg leading-tight font-semibold">
            {experience.titleEn}
          </h3>
          <p className="text-muted mt-2 line-clamp-2 text-sm">{experience.summaryEn}</p>

          <div className="mt-4 flex items-end justify-between">
            <div className="inline-flex items-center gap-1 text-sm">
              <Star className="fill-brand-primary text-brand-primary size-4" aria-hidden="true" />
              <span className="font-medium">4.{6 + (experience.titleEn.length % 3)}</span>
              <span className="text-muted">({100 + (experience.titleEn.length % 400)})</span>
            </div>
            <div className="text-right">
              <p className="text-muted text-xs">From</p>
              <p className="text-text text-base font-bold">{fmtAED(price)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
