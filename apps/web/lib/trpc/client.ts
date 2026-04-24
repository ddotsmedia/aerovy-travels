"use client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@aerovy/api";

export const trpc = createTRPCReact<AppRouter>();
