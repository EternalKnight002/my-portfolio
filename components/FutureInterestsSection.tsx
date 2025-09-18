// components/FutureInterestsSection.tsx
"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  Activity as GenerativeIcon,
  Cpu as QuantumIcon,
  RadioTower as EdgeIcon,
  Drone as DroneIcon,
  Grid as BlockchainIcon,
  Headphones as VrIcon,
  X,
} from "lucide-react";

type Node = {
  id: string;
  name: string;
  left: number; // percentage (desktop layout)
  top: number; // percentage (desktop layout)
  Icon: (props: any) => JSX.Element;
  details: string[];
};

const NODES: Node[] = [
  {
    id: "generative-ai",
    name: "Generative AI",
    left: 6,
    top: 36,
    Icon: GenerativeIcon,
    details: [
      "Working with LLMs and generative models to augment workflows.",
      "Learning fine-tuning, retrieval-augmented generation and evaluation.",
      "Building small assistants and tooling prototypes.",
    ],
  },
  {
    id: "quantum",
    name: "Quantum Computing",
    left: 86,
    top: 18,
    Icon: QuantumIcon,
    details: [
      "Exploring quantum algorithms and Qiskit basics.",
      "Understanding implications for optimization and cryptography.",
    ],
  },
  {
    id: "edge",
    name: "Edge Computing",
    left: 16,
    top: 80,
    Icon: EdgeIcon,
    details: [
      "Real-time processing near devices and serverless edge patterns.",
      "Integrating cloud-native practices for low-latency apps.",
    ],
  },
  {
    id: "drone",
    name: "Drone Tech",
    left: 66,
    top: 86,
    Icon: DroneIcon,
    details: [
      "Aerial autonomy, mapping and fleet orchestration.",
      "Combining sensors, control loops and AI at the edge.",
    ],
  },
  {
    id: "blockchain",
    name: "Blockchain",
    left: 46,
    top: 50,
    Icon: BlockchainIcon,
    details: [
      "Smart contracts, dApps and decentralized identity.",
      "Building small proofs-of-concept and exploring ecosystems.",
    ],
  },
  {
    id: "arvr",
    name: "AR / VR",
    left: 92,
    top: 68,
    Icon: VrIcon,
    details: [
      "Immersive UX, Three.js / WebXR experiments.",
      "Prototyping training and visualization use-cases.",
    ],
  },
];

/** connectors between nodes (centered at blockchain to reduce clutter) */
const CONNECTORS: Array<[string, string]> = [
  ["generative-ai", "blockchain"],
  ["quantum", "blockchain"],
  ["edge", "blockchain"],
  ["drone", "blockchain"],
  ["arvr", "blockchain"],
];

export default function FutureInterestsSection() {
  const [active, setActive] = useState<Node | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const byId = (id: string) => NODES.find((n) => n.id === id)!;

  return (
    <section id="interests" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-900">Future Interests</h2>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Emerging technologies I’m exploring and planning to work with.
        </p>

        {/* ---------- DESKTOP NETWORK (md+) ---------- */}
        <div className="hidden md:block mt-12 relative rounded-lg border border-gray-100 bg-white/60 p-10 shadow-sm">
          {/* SVG layer using 0..100 coordinate space for responsiveness */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-6 w-[calc(100%-3rem)] h-[420px] md:h-[360px] lg:h-[320px] pointer-events-none"
            style={{ left: "1.5rem", right: "1.5rem" }}
            aria-hidden
          >
            <defs>
              {/* moving gradient (we animate the gradient offset via CSS keyframes below) */}
              <linearGradient id="gradMove" x1="0" x2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
              </linearGradient>

              {/* subtle soft glow */}
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* connectors as smooth cubic curves with subtle moving stroke */}
            {CONNECTORS.map(([a, b], i) => {
              const n1 = byId(a);
              const n2 = byId(b);
              const x1 = n1.left;
              const y1 = n1.top;
              const x2 = n2.left;
              const y2 = n2.top;

              // control points widened to make curves more open (less congested)
              const cx1 = x1 * 0.4 + x2 * 0.6;
              const cy1 = y1 - Math.abs(y2 - y1) * 0.32 - 6;
              const cx2 = x1 * 0.6 + x2 * 0.4;
              const cy2 = y2 + Math.abs(y2 - y1) * 0.32 + 6;

              const isActive =
                hoveredId === a ||
                hoveredId === b ||
                active?.id === a ||
                active?.id === b;

              return (
                <motion.path
                  key={`${a}-${b}`}
                  d={`M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`}
                  stroke="url(#gradMove)"
                  strokeWidth={isActive ? 1.6 : 0.7}
                  fill="none"
                  strokeLinecap="round"
                  className={`connector-path ${isActive ? "connector-active" : ""}`}
                  style={{ filter: "url(#softGlow)" }}
                  initial={{ opacity: isActive ? 0.95 : 0.28 }}
                  animate={{ opacity: isActive ? 0.95 : 0.28 }}
                  transition={{ duration: 0.28 }}
                />
              );
            })}
          </svg>

          {/* nodes (absolute positioning within the network area) */}
          <div className="relative w-full h-[420px] md:h-[360px] lg:h-[320px]">
            {NODES.map((node) => {
              const Icon = node.Icon;
              const isHovered = hoveredId === node.id;
              const isActive = active?.id === node.id;

              return (
                <motion.button
                  key={node.id}
                  onClick={() => setActive(node)}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(node.id)}
                  onBlur={() => setHoveredId(null)}
                  whileHover={{ scale: 1.06 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-left"
                  style={{ left: `${node.left}%`, top: `${node.top}%` }}
                  aria-label={node.name}
                >
                  <motion.div
                    animate={{
                      boxShadow: isHovered || isActive ? "0 14px 36px rgba(99,102,241,0.12)" : "0 6px 18px rgba(15,23,42,0.06)",
                      scale: isHovered || isActive ? 1.06 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-28 h-28 rounded-full bg-white border-2 border-transparent flex items-center justify-center relative overflow-hidden"
                    style={{
                      borderImageSource: "linear-gradient(135deg,#a78bfa,#60a5fa)",
                      borderImageSlice: 1,
                      boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.02)",
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 2px rgba(167,139,250,0.10)", borderRadius: "9999px" }}
                    />

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Icon className="w-7 h-7 text-indigo-600" />
                      <div className="sr-only">{node.name}</div>
                    </div>

                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: isHovered || isActive ? "radial-gradient(40% 40% at 50% 20%, rgba(96,165,250,0.08), transparent 30%)" : "transparent",
                      }}
                    />
                  </motion.div>

                  <div className="mt-3 text-sm font-medium text-gray-700" style={{ width: 140, textAlign: "center" }}>
                    {node.name}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ---------- MOBILE / SMALL SCREEN: stacked grid (connectors hidden) ---------- */}
        <div className="md:hidden mt-8 grid gap-4">
          {NODES.map((node) => {
            const Icon = node.Icon;
            return (
              <button
                key={node.id}
                onClick={() => setActive(node)}
                className="w-full flex items-center gap-4 p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2" style={{ borderImageSource: "linear-gradient(135deg,#a78bfa,#60a5fa)", borderImageSlice: 1 }}>
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">{node.name}</div>
                  <div className="text-sm text-gray-500">{node.details[0]}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* slide-in panel (shared between desktop & mobile) */}
      <Transition.Root show={!!active} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setActive(null)}>
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-xl font-semibold text-gray-900">
                    {active?.name}
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-600">Why I’m exploring this and practical goals.</p>
                </div>

                <button onClick={() => setActive(null)} className="p-2 rounded hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <ul className="mt-6 space-y-3 text-gray-700 list-disc list-inside">
                {active?.details.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>

              <div className="mt-6 text-sm text-gray-600">
                <strong>Learning Goals:</strong>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Hands-on prototypes and small projects</li>
                  <li>Attend workshops / apply courses</li>
                  <li>Keep a learning log and publish notes</li>
                </ul>
              </div>
            </Dialog.Panel>
          </Transition.Child>

          <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        </Dialog>
      </Transition.Root>

      {/* ---------- Inline CSS for the connector animation ---------- */}
      <style>{`
        /* stroke dash movement: gives the gradient a subtle sense of flow */
        .connector-path {
          stroke-dasharray: 12 8;
          stroke-dashoffset: 0;
          transform-origin: center;
          transition: stroke-width 0.28s ease, opacity 0.28s ease;
        }

        /* continuous "flow" animation */
        @keyframes dashmove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -80; }
        }

        /* apply the movement (subtle) */
        .connector-path {
          animation: dashmove 4s linear infinite;
          mix-blend-mode: normal;
          will-change: transform;
        }

        /* when connector is active (hover/selected) speed up movement & increase glow */
        .connector-active {
          filter: drop-shadow(0 8px 10px rgba(99,102,241,0.08));
          animation-duration: 2.2s;
        }

        /* respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .connector-path { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
