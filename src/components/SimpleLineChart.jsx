function buildPath(points, width, height, minValue, maxValue) {
  if (!points.length) {
    return '';
  }

  const xStep = points.length > 1 ? width / (points.length - 1) : width;
  const range = Math.max(maxValue - minValue, 0.0001);

  return points
    .map((point, index) => {
      const x = index * xStep;
      const y = height - ((point.value - minValue) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export default function SimpleLineChart({
  series,
  height = 240,
  emptyLabel = 'No chart data available for the current selection.',
}) {
  const validSeries = Array.isArray(series)
    ? series.filter((entry) => Array.isArray(entry?.points) && entry.points.length)
    : [];

  if (!validSeries.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/70 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400">
        {emptyLabel}
      </div>
    );
  }

  const allValues = validSeries.flatMap((entry) => entry.points.map((point) => point.value));
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const chartHeight = height - 32;
  const chartWidth = 760;
  const firstLabel = validSeries[0].points[0]?.date || '';
  const lastLabel =
    validSeries[0].points[validSeries[0].points.length - 1]?.date || '';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
        {validSeries.map((entry) => (
          <span key={entry.label} className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.label}
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/50">
        <svg
          viewBox={`0 0 ${chartWidth} ${height}`}
          className="h-60 w-full"
          role="img"
          aria-label="Historical portfolio replay chart"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = chartHeight - chartHeight * ratio;
            return (
              <line
                key={ratio}
                x1="0"
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="rgba(148, 163, 184, 0.2)"
                strokeDasharray="6 10"
              />
            );
          })}

          {validSeries.map((entry) => (
            <path
              key={entry.label}
              d={buildPath(entry.points, chartWidth, chartHeight, minValue, maxValue)}
              fill="none"
              stroke={entry.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>

        <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          <span>{firstLabel}</span>
          <span>{lastLabel}</span>
        </div>
      </div>
    </div>
  );
}

