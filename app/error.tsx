"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 text-4xl font-semibold">That didn&apos;t load properly</h1>
        <button type="button" onClick={reset} className="mt-8 rounded-lg bg-accent px-5 py-3 font-medium text-accent-fg">
          Try again
        </button>
      </div>
    </div>
  );
}
