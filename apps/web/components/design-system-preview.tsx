import { useTranslations } from "next-intl";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
} from "@aerovy/ui";

export function DesignSystemPreview() {
  const t = useTranslations("designSystem");

  return (
    <section className="border-border bg-surface border-y">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted mt-2">{t("subtitle")}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("buttons")}</CardTitle>
              <CardDescription>Variants × sizes</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link</Button>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("card")}</CardTitle>
              <CardDescription>Surface + border + shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted text-sm">
                Semantic tokens adapt to light + dark modes. Brand gold never shifts.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" fullWidth>
                Explore tokens
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("input")}</CardTitle>
              <CardDescription>Bordered, token-driven focus ring</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Input placeholder={t("searchPlaceholder")} />
              <Input type="email" placeholder="you@example.com" />
              <Input disabled placeholder="Disabled" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
