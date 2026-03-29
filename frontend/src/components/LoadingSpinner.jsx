export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="inline-flex items-center justify-center gap-2 text-sm text-slate-600">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
      <span>{text}</span>
    </div>
  );
}
