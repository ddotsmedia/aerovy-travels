"use client";

import { useEffect, useState } from "react";
import { Wind } from "lucide-react";

type Current = {
  temperature_2m: number;
  weathercode?: number;
  weather_code?: number;
  windspeed_10m: number;
};

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=24.4539&longitude=54.3773&current=temperature_2m,weathercode,windspeed_10m";

// WMO weather codes → emoji + label (https://open-meteo.com/en/docs).
const condition = (code: number): { icon: string; label: string } => {
  if (code === 0) return { icon: "☀️", label: "Clear" };
  if (code <= 2) return { icon: "🌤️", label: "Partly cloudy" };
  if (code === 3) return { icon: "☁️", label: "Overcast" };
  if (code === 45 || code === 48) return { icon: "🌫️", label: "Fog" };
  if (code >= 51 && code <= 57) return { icon: "🌦️", label: "Drizzle" };
  if (code >= 61 && code <= 67) return { icon: "🌧️", label: "Rain" };
  if (code >= 80 && code <= 82) return { icon: "🌦️", label: "Showers" };
  if (code >= 95) return { icon: "⛈️", label: "Thunderstorm" };
  return { icon: "🌡️", label: "—" };
};

export function WeatherWidget() {
  const [current, setCurrent] = useState<Current | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(WEATHER_URL, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: { current?: Current }) => {
        if (data.current) setCurrent(data.current);
        else setFailed(true);
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setFailed(true);
      });
    return () => ctrl.abort();
  }, []);

  if (failed) return null;

  const code = current?.weathercode ?? current?.weather_code ?? -1;
  const { icon, label } = condition(code);

  return (
    <div className="border-border bg-surface mx-auto flex w-fit max-w-full items-center gap-4 rounded-xl border px-5 py-3 text-sm">
      <span className="text-3xl" aria-hidden="true">
        {current ? icon : "…"}
      </span>
      <div>
        <p className="text-muted text-xs tracking-wide uppercase">Abu Dhabi right now</p>
        <p className="text-base font-semibold">
          {current ? `${Math.round(current.temperature_2m)}°C · ${label}` : "Loading weather…"}
        </p>
      </div>
      {current && (
        <span className="text-muted inline-flex items-center gap-1.5 border-l pl-4">
          <Wind className="size-4" aria-hidden="true" />
          {Math.round(current.windspeed_10m)} km/h
        </span>
      )}
    </div>
  );
}
