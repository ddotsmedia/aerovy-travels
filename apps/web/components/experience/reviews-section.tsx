import Image from "next/image";
import { Star } from "lucide-react";

type Review = {
  name: string;
  country: string;
  rating: number;
  date: string;
  comment: string;
  photo?: string;
};

const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=CDA020&color=000&size=96`;

const buildReviews = (title: string): Review[] => [
  {
    name: "Fatima Al Mansouri",
    country: "UAE",
    rating: 5,
    date: "2026-08-14",
    comment: `Seamless from pickup to drop-off. ${title} was the highlight of our weekend.`,
    photo: "https://picsum.photos/seed/aerovy-r1/640/480",
  },
  {
    name: "Raj Patel",
    country: "India",
    rating: 5,
    date: "2026-07-30",
    comment: "Our guide knew every story behind the sites. Worth every dirham.",
  },
  {
    name: "Emma Watson",
    country: "United Kingdom",
    rating: 4,
    date: "2026-07-02",
    comment: "Lovely pace and great photo stops. Would have liked a little more time at the end.",
    photo: "https://picsum.photos/seed/aerovy-r3/640/480",
  },
  {
    name: "Sebastian Keller",
    country: "Germany",
    rating: 5,
    date: "2026-06-19",
    comment: "Booked on WhatsApp in five minutes and got a same-day confirmation. Excellent.",
  },
  {
    name: "Layla Taleb",
    country: "Jordan",
    rating: 4,
    date: "2026-05-27",
    comment: "Very well organised for families. The kids loved it.",
    photo: "https://picsum.photos/seed/aerovy-r5/640/480",
  },
];

export function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className ?? ""}`} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden="true"
          className={`size-4 ${n <= rating ? "fill-brand-primary text-brand-primary" : "text-muted"}`}
        />
      ))}
    </span>
  );
}

export function ReviewsSection({ title }: { title: string }) {
  const reviews = buildReviews(title);
  const average = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <section className="mt-10" aria-labelledby="reviews-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="reviews-heading" className="text-xl font-semibold">
          Guest reviews
        </h2>
        <p className="text-muted inline-flex items-center gap-2 text-sm">
          <StarRating rating={Math.round(average)} />
          <span className="font-medium text-current">{average.toFixed(1)}</span>· {reviews.length}{" "}
          reviews
        </p>
      </div>

      <ul className="mt-6 space-y-5">
        {reviews.map((r) => (
          <li key={r.name} className="border-border bg-surface rounded-xl border p-5">
            <div className="flex items-start gap-4">
              <Image
                src={avatar(r.name)}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">
                    {r.name} <span className="text-muted text-xs">· {r.country}</span>
                  </p>
                  <time dateTime={r.date} className="text-muted text-xs">
                    {new Date(r.date).toLocaleDateString("en", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </div>
                <StarRating rating={r.rating} className="mt-1" />
                <p className="text-text/90 mt-3 text-sm">{r.comment}</p>
                {r.photo && (
                  <div className="relative mt-4 aspect-[4/3] w-full max-w-xs overflow-hidden rounded-lg">
                    <Image
                      src={r.photo}
                      alt={`Photo shared by ${r.name}`}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
