import { redirect } from "next/navigation";

// "Now" was consolidated into the feed page.
export default function NowPage() {
  redirect("/feed");
}
