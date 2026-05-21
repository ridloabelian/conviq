"use client";

export function ShareButton() {
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link artikel berhasil disalin ke clipboard!");
    }
  };

  return (
    <button
      className="w-full bg-slate-50 hover:bg-slate-100 text-secondary font-bold text-xs py-2 px-3 rounded-lg border border-slate-200 transition-colors cursor-pointer"
      onClick={handleCopy}
      id="share-btn-copy"
    >
      Salin Link
    </button>
  );
}
