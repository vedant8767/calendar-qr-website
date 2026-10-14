"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ImagePlus, Loader2, Share2, X } from "lucide-react";
import { renderGreeting } from "@/lib/renderGreeting";

// Modal that turns an event template into a personalised card: the user adds a
// photo and name, sees a live preview, then downloads or shares the image.
export default function EGreetDialog({ greeting, onClose }) {
  return (
    <AnimatePresence>
      {greeting && <Dialog key={greeting.title} greeting={greeting} onClose={onClose} />}
    </AnimatePresence>
  );
}

function Dialog({ greeting, onClose }) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [result, setResult] = useState({ blob: null, url: null, error: null });
  const fileRef = useRef(null);
  const ext = greeting.template.mimeType === "image/jpeg" ? "jpg" : "png";
  const filename = `${greeting.name}-greeting.${ext}`;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  useEffect(() => () => photo && URL.revokeObjectURL(photo), [photo]);

  // Re-render the card (debounced while typing) whenever photo or name change.
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const blob = await renderGreeting(
          greeting.template,
          { background: `/${greeting.name}.png`, photo },
          { name: name.trim() },
        );
        if (cancelled) return;
        setResult({ blob, url: URL.createObjectURL(blob), error: null });
      } catch (err) {
        if (!cancelled) setResult({ blob: null, url: null, error: err.message });
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [greeting, photo, name]);

  useEffect(() => () => result.url && URL.revokeObjectURL(result.url), [result.url]);

  const file = result.blob && new File([result.blob], filename, { type: result.blob.type });
  const canShare = typeof navigator !== "undefined" && file && navigator.canShare?.({ files: [file] });

  async function share() {
    try {
      await navigator.share({ files: [file], title: greeting.title });
    } catch {
      // user cancelled the share sheet
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="egreet-title"
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] bg-paper shadow-2xl sm:rounded-[2rem]"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">E-greeting</p>
            <h2 id="egreet-title" className="font-display text-2xl font-semibold leading-tight">
              {greeting.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white transition hover:border-accent hover:text-accent"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 gap-5 overflow-y-auto p-5 sm:grid-cols-[1fr_1.1fr] sm:p-6">
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-line bg-white p-4 text-left transition hover:border-accent"
            >
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="" className="size-14 shrink-0 rounded-xl object-cover" />
              ) : (
                <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <ImagePlus className="size-6" />
                </span>
              )}
              <span>
                <span className="block font-semibold">{photo ? "Change photo" : "Add your photo"}</span>
                <span className="text-sm text-muted">JPG or PNG from your phone</span>
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPhoto(URL.createObjectURL(f));
                e.target.value = "";
              }}
            />

            <label className="block">
              <span className="mb-1.5 block px-1 text-sm font-medium">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Asha Patil"
                maxLength={60}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none transition focus:border-accent"
              />
            </label>

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={result.url ?? undefined}
                download={filename}
                aria-disabled={!result.url}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 aria-disabled:pointer-events-none aria-disabled:opacity-50"
              >
                <Download className="size-4" /> Download
              </a>
              {canShare && (
                <button
                  type="button"
                  onClick={share}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
                >
                  <Share2 className="size-4" /> Share
                </button>
              )}
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-white"
            style={{ aspectRatio: `${greeting.template.width} / ${greeting.template.height}` }}
          >
            {result.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={result.url} alt={`${greeting.title} greeting preview`} className="size-full object-contain" />
            ) : (
              <div className="grid size-full place-items-center p-6 text-center text-sm text-muted">
                {result.error ? (
                  <span>
                    Card artwork not found.
                    <br />
                    Add <code className="font-mono">public/{greeting.name}.png</code>
                  </span>
                ) : (
                  <Loader2 className="size-6 animate-spin text-accent" />
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
