import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-4xl font-semibold">This page doesn&apos;t exist</h1>
        <p className="mt-4 text-muted">The link may be old, or the page has moved into the main portfolio.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-medium text-accent-fg">
          Back to the portfolio <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
