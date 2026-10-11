import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center px-6">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Error 404</p>
      <h1 className="mt-3 font-display text-6xl font-semibold italic leading-none">Off the calendar.</h1>
      <p className="mt-4 text-muted">That page doesn&apos;t exist. Try a month like /january or head home.</p>
      <Link href="/" className="mt-8 rounded-full bg-ink px-6 py-3 font-semibold text-white">
        Back to home
      </Link>
    </div>
  );
}
