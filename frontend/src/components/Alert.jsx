export default function Alert({ type = "success", message }) {
  if (!message) return null;

  const classes =
    type === "error"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <div className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${classes}`} role="alert">
      <span className="mt-0.5">
        {type === "error" ? (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 10-1.5 0v4a.75.75 0 001.5 0v-4zm0 7a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.415l-7.107 7.11a1 1 0 01-1.414 0L3.295 8.924a1 1 0 111.414-1.415l4.18 4.18 6.4-6.398a1 1 0 011.415 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      <p>{message}</p>
    </div>
  );
}
