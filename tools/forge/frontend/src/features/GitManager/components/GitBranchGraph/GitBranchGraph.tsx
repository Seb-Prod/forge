import { useMemo, useRef, useState } from "react";

export type Branch = {
  name: string;
  parent: string | null;
};

export type CommitNode = {
  id: string;
  message: string;
  parents: string[];
  refs: string[];
};

export type GitEdge = {
  from: string;
  to: string;
};

type Props = {
  branches: Branch[];
  currentBranch: string;
  nodes: CommitNode[];
  edges: GitEdge[];
  /** Max height of the graph area before scrolling (default: 420) */
  maxHeight?: number;
};

const BRANCH_COLORS = [
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

const LANE_HEIGHT = 52;
const COMMIT_R    = 9;
const COL_WIDTH   = 68;
const LABEL_W     = 152;
const PAD_TOP     = 36;
const PAD_LEFT    = 0;

// ─── Layout ──────────────────────────────────────────────────────────────────
function buildLayout(branches: Branch[], nodes: CommitNode[], currentBranch: string) {
  // 1. Lane order from branchTree (root first)
  const ordered: string[] = [];
  const visited = new Set<string>();
  const push = (name: string) => {
    if (visited.has(name)) return;
    visited.add(name);
    ordered.push(name);
    branches.filter(b => b.parent === name).forEach(b => push(b.name));
  };
  const root = branches.find(b => b.parent === null);
  if (root) push(root.name);
  branches.forEach(b => push(b.name));

  const laneOf: Record<string, number> = {};
  const colorOf: Record<string, string> = {};
  ordered.forEach((name, i) => {
    laneOf[name]  = i;
    colorOf[name] = BRANCH_COLORS[i % BRANCH_COLORS.length];
  });

  // 2. children map + initial branch assignment from refs
  const children: Record<string, string[]> = {};
  const branchOfCommit: Record<string, string> = {};

  nodes.forEach(n => {
    n.parents.forEach(p => {
      if (!children[p]) children[p] = [];
      if (!children[p].includes(n.id)) children[p].push(n.id);
    });
    n.refs.forEach(ref => {
      const clean = ref.replace("origin/", "").trim();
      if (laneOf[clean] !== undefined) branchOfCommit[n.id] = clean;
    });
  });

  // 3. Topological sort (tips → roots)
  const tips = nodes.filter(n => !children[n.id]?.length).map(n => n.id);
  const topoOrder: string[] = [];
  const queue = [...tips];
  const seen = new Set<string>();
  while (queue.length) {
    const id = queue.shift()!;
    if (seen.has(id)) continue;
    seen.add(id);
    topoOrder.push(id);
    nodes.find(n => n.id === id)?.parents.forEach(p => queue.push(p));
  }
  // Any node not reached (isolated)
  nodes.forEach(n => { if (!seen.has(n.id)) topoOrder.push(n.id); });

  // 4. X columns
  const colOf: Record<string, number> = {};
  topoOrder.forEach((id, i) => (colOf[id] = i));

  // 5. Propagate branch: iterate until stable
  //    Pass 1: child → parent (tip to root)
  //    Pass 2: parent → child (root to tip) to fill gaps
  let changed = true;
  let guard = 0;
  while (changed && guard++ < 20) {
    changed = false;
    // tip→root
    topoOrder.forEach(id => {
      if (branchOfCommit[id]) return;
      const ch = children[id]?.[0];
      if (ch && branchOfCommit[ch]) {
        branchOfCommit[id] = branchOfCommit[ch];
        changed = true;
      }
    });
    // root→tip
    [...topoOrder].reverse().forEach(id => {
      if (branchOfCommit[id]) return;
      const node = nodes.find(n => n.id === id);
      const p = node?.parents[0];
      if (p && branchOfCommit[p]) {
        branchOfCommit[id] = branchOfCommit[p];
        changed = true;
      }
    });
  }

  // 6. Position
  const positioned = nodes.map(n => {
    const branch = branchOfCommit[n.id] ?? ordered[0] ?? "";
    const lane   = laneOf[branch] ?? 0;
    const col    = colOf[n.id] ?? 0;
    return {
      ...n,
      branch,
      lane,
      col,
      x: LABEL_W + col * COL_WIDTH + COL_WIDTH / 2,
      y: PAD_TOP + lane * LANE_HEIGHT,
      color: colorOf[branch] ?? BRANCH_COLORS[0],
    };
  });

  const commitMap: Record<string, typeof positioned[0]> = {};
  positioned.forEach(c => (commitMap[c.id] = c));

  const totalCols  = topoOrder.length;
  const totalLanes = ordered.length;
  const svgW = LABEL_W + totalCols * COL_WIDTH + 60;
  const svgH = PAD_TOP + totalLanes * LANE_HEIGHT + PAD_TOP;

  return { positioned, commitMap, colorOf, ordered, svgW, svgH, totalCols };
}

// ─── Edge ─────────────────────────────────────────────────────────────────────
function EdgePath({ from, to, color }: { from: {x:number;y:number}; to: {x:number;y:number}; color: string }) {
  const dx = Math.abs(to.x - from.x);
  const cp = Math.min(dx * 0.55, 55);
  const d  = from.y === to.y
    ? `M ${from.x} ${from.y} L ${to.x} ${to.y}`
    : `M ${from.x} ${from.y} C ${from.x + cp} ${from.y}, ${to.x - cp} ${to.y}, ${to.x} ${to.y}`;
  return <path d={d} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" opacity={0.82} />;
}

// ─── Main component ───────────────────────────────────────────────────────────
export const GitBranchGraph = ({
  branches,
  currentBranch,
  nodes = [],
  edges = [],
  maxHeight = 420,
}: Props) => {
  const [hovered,  setHovered]  = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { positioned, commitMap, colorOf, ordered, svgW, svgH } = useMemo(
    () => buildLayout(branches, nodes, currentBranch),
    [branches, nodes, currentBranch]
  );

  const selectedCommit = selected ? commitMap[selected] : null;

  if (!nodes.length) {
    return <SimpleBranchTree branches={branches} currentBranch={currentBranch} />;
  }

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      background: "#0d1117",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #21262d",
    }}>
      {/* ── Header ── */}
      <div style={{
        padding: "10px 16px",
        borderBottom: "1px solid #21262d",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#161b22",
      }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#58a6ff">
          <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm3-8.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"/>
        </svg>
        <span style={{ color: "#e6edf3", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>
          Branch Graph
        </span>
        <span style={{ marginLeft: "auto", color: "#8b949e", fontSize: 11 }}>
          {branches.length} branches · {nodes.length} commits
        </span>
      </div>

      {/* ── Graph area: sticky labels + scrollable commits ── */}
      <div style={{ display: "flex", maxHeight, overflow: "hidden" }}>

        {/* Sticky branch labels (left column, scrolls vertically with graph) */}
        <div
          style={{
            flexShrink: 0,
            width: LABEL_W,
            overflowY: "hidden",
            borderRight: "1px solid #21262d",
            background: "#0d1117",
          }}
          ref={el => {
            // sync vertical scroll with main scroll
            if (el) (el as any).__labelEl = true;
          }}
          id="git-labels"
        >
          <svg width={LABEL_W} height={svgH} style={{ display: "block" }}>
            {ordered.map((name, i) => {
              const y       = PAD_TOP + i * LANE_HEIGHT;
              const color   = colorOf[name];
              const isActive = name === currentBranch;
              return (
                <g key={name}>
                  <rect
                    x={0} y={y - LANE_HEIGHT / 2}
                    width={LABEL_W} height={LANE_HEIGHT}
                    fill={i % 2 === 0 ? "#161b22" : "#0d1117"}
                  />
                  {isActive && (
                    <rect
                      x={6} y={y - 11}
                      width={LABEL_W - 14} height={22}
                      rx={4} fill={color} opacity={0.13}
                    />
                  )}
                  <circle cx={14} cy={y} r={4} fill={color} />
                  <text
                    x={26} y={y + 4}
                    fill={isActive ? color : "#8b949e"}
                    fontSize={11}
                    fontWeight={isActive ? 700 : 400}
                    fontFamily="inherit"
                  >
                    {name.length > 15 ? name.slice(0, 13) + "…" : name}
                  </text>
                  {isActive && (
                    <text
                      x={LABEL_W - 8} y={y + 4}
                      textAnchor="end"
                      fill={color}
                      fontSize={9}
                      fontWeight={700}
                      fontFamily="inherit"
                      opacity={0.75}
                    >
                      HEAD
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Scrollable commits area */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            minWidth: 0,
            overflowX: "auto",
            overflowY: "auto",
            maxHeight,
          }}
          onScroll={e => {
            const labels = document.getElementById("git-labels");
            if (labels) labels.scrollTop = (e.target as HTMLDivElement).scrollTop;
          }}
        >
          <svg width={svgW - LABEL_W} height={svgH} style={{ display: "block", minWidth: svgW - LABEL_W }}>
            {/* Lane stripes */}
            {ordered.map((name, i) => {
              const y = PAD_TOP + i * LANE_HEIGHT;
              return (
                <rect
                  key={name}
                  x={0} y={y - LANE_HEIGHT / 2}
                  width={svgW} height={LANE_HEIGHT}
                  fill={i % 2 === 0 ? "#161b22" : "#0d1117"}
                />
              );
            })}

            {/* Lane dashed lines */}
            {ordered.map((name, i) => {
              const y = PAD_TOP + i * LANE_HEIGHT;
              return (
                <line
                  key={name}
                  x1={0} y1={y}
                  x2={svgW} y2={y}
                  stroke={colorOf[name]}
                  strokeWidth={1}
                  opacity={0.18}
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Edges */}
            {positioned.map(commit =>
              commit.parents.map(parentId => {
                const parent = commitMap[parentId];
                if (!parent) return null;
                const isCross = commit.lane !== parent.lane;
                const color   = isCross ? colorOf[commit.branch] ?? commit.color : commit.color;
                return (
                  <EdgePath
                    key={`${commit.id}-${parentId}`}
                    from={{ x: commit.x - LABEL_W, y: commit.y }}
                    to={{ x: parent.x - LABEL_W, y: parent.y }}
                    color={color}
                  />
                );
              })
            )}

            {/* Commits */}
            {positioned.map(commit => {
              const isHovered  = hovered  === commit.id;
              const isSelected = selected === commit.id;
              const isTip = commit.refs.some(r => {
                const clean = r.replace("origin/", "").trim();
                return clean === commit.branch;
              });
              const cx = commit.x - LABEL_W;
              const cy = commit.y;

              return (
                <g
                  key={commit.id}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(commit.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(selected === commit.id ? null : commit.id)}
                >
                  {(isHovered || isSelected) && (
                    <circle cx={cx} cy={cy} r={COMMIT_R + 6} fill={commit.color} opacity={0.18} />
                  )}
                  <circle
                    cx={cx} cy={cy} r={COMMIT_R + 2}
                    fill="#0d1117"
                    stroke={commit.color}
                    strokeWidth={isSelected ? 2 : 1.5}
                    opacity={isSelected ? 1 : 0.55}
                  />
                  <circle
                    cx={cx} cy={cy} r={COMMIT_R}
                    fill={isTip ? commit.color : "#161b22"}
                    stroke={commit.color}
                    strokeWidth={1.5}
                  />
                  {isHovered && (
                    <g>
                      <rect
                        x={cx - 26} y={cy - LANE_HEIGHT / 2 + 4}
                        width={52} height={16}
                        rx={3} fill="#21262d"
                        stroke="#30363d" strokeWidth={0.5}
                      />
                      <text
                        x={cx} y={cy - LANE_HEIGHT / 2 + 15}
                        textAnchor="middle"
                        fill="#8b949e" fontSize={9} fontFamily="inherit"
                      >
                        {commit.id.slice(0, 7)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── Selected commit detail ── */}
      {selectedCommit && (
        <div style={{
          borderTop: "1px solid #21262d",
          padding: "12px 16px",
          background: "#161b22",
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: selectedCommit.color,
            flexShrink: 0, marginTop: 5,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#e6edf3", fontSize: 12, fontWeight: 600, marginBottom: 6, lineHeight: 1.5 }}>
              {selectedCommit.message || "(no message)"}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ color: "#8b949e", fontSize: 10 }}>
                {selectedCommit.id.slice(0, 12)}
              </span>
              <span style={{
                background: selectedCommit.color + "22",
                color: selectedCommit.color,
                fontSize: 10, padding: "1px 7px",
                borderRadius: 4, fontWeight: 600,
              }}>
                {selectedCommit.branch}
              </span>
              {selectedCommit.refs.filter(r => !r.includes("HEAD")).map(ref => (
                <span key={ref} style={{
                  background: "#21262d", color: "#8b949e",
                  fontSize: 10, padding: "1px 7px", borderRadius: 4,
                }}>
                  {ref.startsWith("origin/") ? "⬆ " + ref.replace("origin/", "") : ref}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setSelected(null)}
            style={{ background: "none", border: "none", color: "#8b949e", cursor: "pointer", fontSize: 18, padding: 0, lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Fallback ─────────────────────────────────────────────────────────────────
const SimpleBranchTree = ({ branches, currentBranch }: { branches: Branch[]; currentBranch: string }) => {
  const renderTree = (parent: string | null = null, level = 0): React.JSX.Element[] =>
    branches.filter(b => b.parent === parent).map(branch => {
      const isActive = branch.name === currentBranch;
      const color = BRANCH_COLORS[level % BRANCH_COLORS.length];
      return (
        <div key={branch.name}>
          <div style={{
            marginLeft: level * 20, padding: "6px 10px",
            borderRadius: 6, display: "flex", alignItems: "center", gap: 8,
            background: isActive ? color + "18" : "transparent",
          }}>
            <span style={{ color, fontSize: 10 }}>●</span>
            <span style={{ color: isActive ? color : "#8b949e", fontSize: 12, fontWeight: isActive ? 700 : 400 }}>
              {branch.name}
            </span>
            {isActive && <span style={{ color, fontSize: 9, fontWeight: 700 }}>HEAD</span>}
          </div>
          {renderTree(branch.name, level + 1)}
        </div>
      );
    });
  return (
    <div style={{ background: "#0d1117", borderRadius: 12, padding: 16, border: "1px solid #21262d", fontFamily: "monospace" }}>
      {renderTree()}
    </div>
  );
};