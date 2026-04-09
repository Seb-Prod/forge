export const BRANCH_COLORS = [
  "#4ade80",
  "#818cf8",
  "#f472b6",
  "#38bdf8",
  "#fb923c",
  "#a78bfa",
  "#34d399",
  "#f87171",
  "#facc15",
  "#2dd4bf",
];

export const getColor = (depth: number) => BRANCH_COLORS[depth % BRANCH_COLORS.length];