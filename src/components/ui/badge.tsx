const variants = {
  pending: "bg-info/10    text-info    border-info/20",
  processing: "bg-active/10  text-active  border-active/20",
  resolved: "bg-success/10 text-success border-success/20",
  escalated: "bg-warning/10 text-warning border-warning/20",
  closed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export function Badge({ status }) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded border
        text-xs font-mono font-medium capitalize
        ${variants[status] ?? variants.pending}
      `}
    >
      {status}
    </span>
  );
}
