"use client";
import { useRouter } from "next/navigation";
import GeocitiesMode from "../GeocitiesMode";

export default function GeocitiesPage() {
  const router = useRouter();
  return <GeocitiesMode onExit={() => router.push("/")} />;
}
