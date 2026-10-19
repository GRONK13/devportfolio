import { getFeaturedProjects, getNow, getProfile } from "@/lib/content";

/** Phase 1 placeholder: proves the content layer end to end. The real design lands in Phase 2. */
export default function HomePage() {
  const profile = getProfile();
  const now = getNow();
  const projects = getFeaturedProjects();

  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold">{profile.name}</h1>
      <p className="mt-2">{profile.role} · {profile.location}</p>
      <p className="mt-6">{profile.intro}</p>

      <h2 className="mt-12 text-xl font-semibold">Work</h2>
      <ul className="mt-4 list-disc pl-5">
        {projects.map((p) => (
          <li key={p.slug}>
            <strong>{p.title}</strong>: {p.summary}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-semibold">Now</h2>
      <dl className="mt-4">
        {now.items.map((item) => (
          <div key={item.label}>
            <dt className="inline font-medium">{item.label}: </dt>
            <dd className="inline">{item.text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-sm">
        Updated <time dateTime={now.updated}>{now.updated}</time>
      </p>
    </main>
  );
}
