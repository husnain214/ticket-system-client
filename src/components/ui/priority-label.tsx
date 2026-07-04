const variants = {
  low: "text-gray-500",
  medium: "text-blue-400",
  high: "text-amber-400",
  critical: "text-red-500",
};

export function PriorityLabel({ priority }) {
  return (
    <span
      className={`
        text-xs font-mono font-medium uppercase tracking-wider
        ${variants[priority] ?? variants.low}
      `}
    >
      {priority}
    </span>
  );
}
