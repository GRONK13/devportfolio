import Link from "next/link";

export default function NotFound() {
  return (
    <section className="frame py-24 md:py-40">
      <p className="label text-muted">Error 404</p>
      <h1 className="display mt-6 text-[clamp(3rem,12vw,10rem)]">Page not found</h1>
      <p className="mt-8 max-w-xl text-lg text-muted">That page doesn&apos;t exist, or it moved when the site was redesigned.</p>
      <Link href="/" className="label mt-10 inline-flex h-11 items-center border border-fg px-5 hover:bg-fg hover:text-bg">
        Back to the home page
      </Link>
    </section>
  );
}
