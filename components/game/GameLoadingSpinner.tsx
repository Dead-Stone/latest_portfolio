export default function GameLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-3 bg-black text-zinc-400">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      <p className="text-[11px] font-mono uppercase tracking-widest">loading gallery…</p>
    </div>
  )
}
