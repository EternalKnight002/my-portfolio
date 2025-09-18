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
  LucideProps,
} from "lucide-react";

type Node = {
  id: string;
  name: string;
  left: number; // percentage (desktop layout)
  top: number; // percentage (desktop layout)
  Icon: React.ComponentType<LucideProps>;
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
      "Building production-ready AI applications using transformer architectures, exploring the nuances of prompt engineering and context optimization for real-world use cases.",
      "Diving deep into fine-tuning techniques including LoRA, QLoRA, and parameter-efficient methods to customize models for specific domains and tasks.",
      "Implementing retrieval-augmented generation (RAG) systems with vector databases, semantic search, and hybrid architectures to ground AI responses in factual data.",
      "Studying AI alignment, safety considerations, and responsible deployment practices to ensure reliable and ethical AI integration.",
      "Experimenting with multimodal AI capabilities, combining text, image, and audio processing to create comprehensive intelligent systems.",
    ],
  },
  {
    id: "quantum",
    name: "Quantum Computing",
    left: 86,
    top: 18,
    Icon: QuantumIcon,
    details: [
      "Mastering quantum mechanics fundamentals including superposition, entanglement, and quantum interference to understand the theoretical foundation of quantum computation.",
      "Learning quantum algorithm design through hands-on implementation of Shor&apos;s algorithm, Grover&apos;s search, and quantum machine learning algorithms using Qiskit and Cirq.",
      "Exploring quantum cryptography and post-quantum security implications, understanding how quantum computing will reshape cybersecurity landscapes.",
      "Investigating near-term quantum applications in optimization, simulation of molecular systems, and financial modeling using NISQ (Noisy Intermediate-Scale Quantum) devices.",
      "Understanding quantum error correction, fault-tolerant quantum computing, and the path to achieving quantum advantage in practical applications.",
    ],
  },
  {
    id: "edge",
    name: "Edge Computing",
    left: 16,
    top: 80,
    Icon: EdgeIcon,
    details: [
      "Architecting distributed systems that process data closer to its source, reducing latency and bandwidth requirements for real-time applications.",
      "Implementing edge-native applications using containerization technologies like Docker and Kubernetes at the edge, with focus on resource-constrained environments.",
      "Building serverless edge functions and exploring CDN-based computing platforms to create globally distributed, low-latency applications.",
      "Integrating IoT devices with edge processing capabilities, creating intelligent sensor networks that can make autonomous decisions locally.",
      "Studying edge security challenges, including device authentication, secure communication protocols, and distributed trust mechanisms.",
      "Exploring 5G network integration and how edge computing enables new possibilities in autonomous vehicles, industrial automation, and smart cities.",
    ],
  },
  {
    id: "drone",
    name: "Drone Tech",
    left: 66,
    top: 86,
    Icon: DroneIcon,
    details: [
      "Understanding autonomous flight control systems, including PID controllers, sensor fusion algorithms, and computer vision for navigation and obstacle avoidance.",
      "Implementing SLAM (Simultaneous Localization and Mapping) algorithms for autonomous mapping and exploration in unknown environments.",
      "Exploring swarm robotics principles to coordinate multiple drones for complex missions like search and rescue, environmental monitoring, and precision agriculture.",
      "Building computer vision pipelines for real-time object detection, tracking, and classification from aerial perspectives using deep learning models.",
      "Learning regulatory frameworks, airspace management systems, and safety protocols for commercial and research drone operations.",
      "Investigating applications in precision agriculture, infrastructure inspection, disaster response, and environmental conservation through aerial data collection.",
    ],
  },
  {
    id: "blockchain",
    name: "Blockchain",
    left: 46,
    top: 50,
    Icon: BlockchainIcon,
    details: [
      "Deep-diving into consensus mechanisms like Proof of Stake, Proof of Work, and emerging alternatives, understanding their trade-offs in security, scalability, and energy efficiency.",
      "Developing smart contracts using Solidity, Rust, and other blockchain languages, with emphasis on security best practices and gas optimization techniques.",
      "Exploring Layer 2 scaling solutions including state channels, sidechains, and rollups to address blockchain scalability challenges.",
      "Building decentralized applications (dApps) with focus on user experience, integrating with Web3 wallets and handling blockchain state management.",
      "Investigating decentralized identity solutions, zero-knowledge proofs, and privacy-preserving technologies for next-generation blockchain applications.",
      "Understanding tokenomics, DeFi protocols, NFT ecosystems, and the broader implications of decentralized finance on traditional financial systems.",
    ],
  },
  {
    id: "arvr",
    name: "AR / VR",
    left: 92,
    top: 68,
    Icon: VrIcon,
    details: [
      "Creating immersive 3D experiences using WebXR, Three.js, and Unity, focusing on cross-platform compatibility and performance optimization.",
      "Implementing spatial computing concepts including hand tracking, eye tracking, and gesture recognition for natural human-computer interaction.",
      "Exploring haptic feedback systems and multi-sensory interfaces to create more engaging and realistic virtual experiences.",
      "Developing AR applications that seamlessly blend digital content with the real world, using computer vision and simultaneous localization and mapping.",
      "Building VR training simulations for education, healthcare, and industrial applications, incorporating learning analytics and assessment frameworks.",
      "Investigating the metaverse concept, social VR platforms, and the future of remote collaboration through immersive technologies.",
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
          Emerging technologies I&apos;m exploring and planning to work with.
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
            {CONNECTORS.map(([a, b]) => {
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
                      <Icon className="w-7 h-7 text-black" />
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
                  <Icon className="w-6 h-6 text-black" />
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
          {/* Background overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20" />
          </Transition.Child>

          {/* Sliding panel */}
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-200">
                        <div className="flex-1">
                          <Dialog.Title className="text-xl font-semibold text-gray-900">
                            {active?.name}
                          </Dialog.Title>
                          <p className="mt-2 text-sm text-gray-600">Deep dive into emerging technologies and their transformative potential.</p>
                        </div>

                        <button 
                          onClick={() => setActive(null)} 
                          className="flex-shrink-0 p-2 rounded hover:bg-gray-100 transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      {/* Scrollable content */}
                      <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-900">Why This Technology Matters</h3>
                          <ul className="space-y-4 text-gray-700">
                            {active?.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                                <span className="text-sm leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                          <h3 className="font-medium text-gray-900 mb-4">Learning Approach & Goals</h3>
                          <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                              <span>Build comprehensive understanding through theoretical study combined with practical implementation</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                              <span>Create portfolio projects that demonstrate real-world applications and problem-solving capabilities</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                              <span>Engage with research communities, attend conferences, and contribute to open-source projects in the field</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                              <span>Establish learning partnerships and mentorship relationships with industry experts and researchers</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                              <span>Document the learning journey through technical blog posts, tutorials, and knowledge-sharing presentations</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                              <span>Apply interdisciplinary thinking to explore intersections between these technologies and existing expertise</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
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