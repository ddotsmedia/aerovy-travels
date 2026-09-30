"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent } from "@aerovy/ui";
import { AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("aerovy_admin_token");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 500));

    if (email === "admin@aerovy.ae" && password === "aerovy2024") {
      localStorage.setItem("aerovy_admin_token", "true");
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="admin-dark flex min-h-screen items-center justify-center p-4">
      <Card className="admin-card w-full max-w-md">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Aerovy</h1>
            <p className="mt-2 text-sm text-white/60">Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}
                className="flex items-center gap-3 rounded-md px-4 py-3 text-sm"
              >
                <AlertCircle className="size-4" aria-hidden="true" />
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="admin-text-secondary mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aerovy.ae"
                className="admin-input w-full rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="admin-text-secondary mb-2 block text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="admin-input w-full rounded-md px-4 py-2"
              />
            </div>

            <Button type="submit" className="admin-button w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="admin-text-muted mt-6 text-center text-xs">
            Demo credentials: admin@aerovy.ae / aerovy2024
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
