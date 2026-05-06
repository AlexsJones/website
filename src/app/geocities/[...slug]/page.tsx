"use client";
import { useRouter, useParams } from "next/navigation";
import GeocitiesMode from "../../GeocitiesMode";

const VALID_PAGES = ["about", "blog", "speaking", "cv", "research"] as const;
type GeoPage = "home" | "about" | "blog" | "speaking" | "cv" | "research";

export default function GeocitiesSubPage() {
  const router = useRouter();
  const params = useParams();
  const slug = (params.slug as string[])?.[0] ?? "";
  const page: GeoPage = (VALID_PAGES as readonly string[]).includes(slug)
    ? (slug as GeoPage)
    : "home";

  return <GeocitiesMode onExit={() => router.push("/")} initialPage={page} />;
}
