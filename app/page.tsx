"use client";

import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

const Card = ({ children }) => <div className="border p-4 rounded shadow bg-white my-4">{children}</div>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const Select = ({ children, ...props }) => (
  <select className="border p-2 rounded w-full mb-4" {...props}>{children}</select>
);
const Button = ({ children, ...props }) => (
  <button className="border p-2 rounded bg-blue-500 text-white mt-2" {...props}>{children}</button>
);

const getDimensionDescription = (dimension, value) => {
  const base = {
    Communicating: "Communication style:",
    Evaluating: "Feedback approach:",
    Leading: "Leadership tendency:",
    Deciding: "Decision-making process:",
    Trusting: "Trust-building style:",
    Disagreeing: "Handling disagreements:",
    Scheduling: "Time orientation:",
    Persuading: "Persuasion logic:"
  };

  const details = {
    Communicating: [
      "Highly implicit, reliant on context and shared understanding.",
      "Very explicit, with emphasis on clarity and directness."
    ],
    Evaluating: [
      "Feedback is softened, nuanced, often indirect to preserve harmony.",
      "Feedback is blunt and transparent, prioritizing clarity over harmony."
    ],
    Leading: [
      "Flat hierarchy, leaders seen as equals among the team.",
      "Clear chain of command with authority respected and rarely challenged."
    ],
    Deciding: [
      "Group consensus is valued, even if it delays action.",
      "Quick decisions made by leaders with minimal consultation."
    ],
    Trusting: [
      "Personal relationships and long-term bonding drive trust.",
      "Trust is based on reliability and task performance."
    ],
    Disagreeing: [
      "Avoided or expressed very carefully to maintain harmony.",
      "Encouraged openly, seen as part of healthy debate."
    ],
    Scheduling: [
      "Flexible, context-sensitive scheduling with tolerance for change.",
      "Rigid, deadline-driven with a strong respect for punctuality."
    ],
    Persuading: [
      "Starts from principles and theories before applying them.",
      "Begins with facts and examples, then draws generalizations."
    ]
  };

  const midpoint = 2.5;
  const isLow = typeof value === "number" && value < midpoint;
  const explanation = details[dimension]?.[isLow ? 0 : 1] || "No explanation available.";

  return {
    label: base[dimension] || dimension,
    explanation,
    value
  };
};

const protagonistPOVs = [
  "As Yuki, a Japanese team leader...",
  "As Michael, an expat manager in Tokyo...",
  "As Satoshi, a local employee at a joint venture...",
  "As Keiko, a senior HR officer...",
  "As Haruto, a young Japanese engineer...",
  "As Claire, a French intern in a Japanese firm...",
  "As Hiroshi, a global project coordinator...",
  "As Emi, a translator between teams...",
  "As Daiki, a new hire returning from overseas...",
  "As Naomi, a Japanese client facing foreign vendors..."
];

const scenarioStories = [
  "Yuki used indirect language assuming shared understanding, but their Western colleague interpreted the silence as a lack of engagement.",
  "Michael delivered direct feedback intending to be constructive, but his tone was perceived as harsh by local staff.",
  "Satoshi was confused when his Western teammates insisted on pushing decisions forward without full team consensus.",
  "Keiko noticed that employees were quietly resisting a new policy sent from global HQ, though no formal objection was raised.",
  "Haruto assumed the project deadline was flexible, while his international collaborator insisted on strict adherence.",
  "Claire received vague instructions and felt anxious about asking too many questions, unsure of her standing.",
  "Hiroshi realized that his Western partners wanted immediate proof of delivery while local teams sought trust via long-term relationships.",
  "Emi saw rising tensions from unresolved disagreements that were never explicitly stated during meetings.",
  "Daiki, having studied abroad, questioned hierarchy and was met with cold responses from senior Japanese staff.",
  "Naomi described requirements in a high-context way, but her foreign vendor misinterpreted them, leading to poor results."
];

const scenarioTitles = [
  "Misinterpreted Silence",
  "Feedback Shock",
  "Fast vs. Consensus Decisions",
  "Policy Resistance",
  "Deadline Duality",
  "Lost in Translation",
  "Trust Misalignment",
  "Unspoken Disagreements",
  "Reverse Hierarchy Clash",
  "Indirect Specifications"
];

const scenarioScores = [
  { Communicating: 1.2, Evaluating: 3.9, Leading: 2.7, Deciding: 3.5, Trusting: 2.6, Disagreeing: 4.0, Scheduling: 3.2, Persuading: 2.9 },
  { Communicating: 2.8, Evaluating: 4.6, Leading: 2.9, Deciding: 3.8, Trusting: 2.3, Disagreeing: 4.2, Scheduling: 2.7, Persuading: 3.0 },
  { Communicating: 2.5, Evaluating: 3.2, Leading: 2.6, Deciding: 4.0, Trusting: 3.0, Disagreeing: 3.5, Scheduling: 3.1, Persuading: 2.4 },
  { Communicating: 1.9, Evaluating: 3.5, Leading: 3.1, Deciding: 2.9, Trusting: 2.8, Disagreeing: 3.8, Scheduling: 3.0, Persuading: 2.6 },
  { Communicating: 2.3, Evaluating: 3.3, Leading: 3.0, Deciding: 3.7, Trusting: 2.5, Disagreeing: 4.4, Scheduling: 2.4, Persuading: 2.8 },
  { Communicating: 1.7, Evaluating: 4.0, Leading: 2.8, Deciding: 3.6, Trusting: 2.7, Disagreeing: 3.9, Scheduling: 3.3, Persuading: 3.1 },
  { Communicating: 2.0, Evaluating: 3.6, Leading: 3.3, Deciding: 3.4, Trusting: 2.9, Disagreeing: 4.1, Scheduling: 2.8, Persuading: 3.2 },
  { Communicating: 2.4, Evaluating: 3.8, Leading: 3.2, Deciding: 3.5, Trusting: 2.6, Disagreeing: 4.5, Scheduling: 3.1, Persuading: 3.3 },
  { Communicating: 2.2, Evaluating: 4.1, Leading: 3.5, Deciding: 3.9, Trusting: 2.4, Disagreeing: 3.7, Scheduling: 2.6, Persuading: 3.0 },
  { Communicating: 1.5, Evaluating: 3.7, Leading: 3.0, Deciding: 3.3, Trusting: 2.8, Disagreeing: 3.6, Scheduling: 3.0, Persuading: 3.4 }
];

function generateStableUseCases() {
  return scenarioTitles.map((title, i) => {
    return {
      id: i + 1,
      title,
      protagonistPOV: protagonistPOVs[i],
      story: scenarioStories[i],
      dimensions: scenarioScores[i],
      resolution: [
        {
          style: "Avoiding",
          pros: "Reduces tension in the short term.",
          cons: "Leaves core issue unresolved, potentially worsening misunderstanding.",
          successRate: 35
        },
        {
          style: "Accommodating",
          pros: "Shows flexibility and willingness to adjust.",
          cons: "May reinforce cultural imbalance or reduce assertiveness.",
          successRate: 50
        },
        {
          style: "Competing",
          pros: "Demands clarity and sets explicit norms.",
          cons: "Risks escalating tensions or appearing culturally insensitive.",
          successRate: 45
        },
        {
          style: "Compromising",
          pros: "Balances both styles and sets mutual expectations.",
          cons: "May not fully satisfy either party.",
          successRate: 65
        },
        {
          style: "Collaborating",
          pros: "Creates shared understanding and long-term cultural awareness.",
          cons: "Time-consuming and requires emotional intelligence.",
          successRate: 85
        }
      ]
    };
  });
}

const useCases = generateStableUseCases();

export default function SilentCodesApp() {
  const [selectedCaseId, setSelectedCaseId] = useState(0);
  const [chartType, setChartType] = useState("radar");

  const selected = useCases[selectedCaseId];
  const chartData = Object.entries(selected.dimensions).map(([key, value]) => ({ dimension: key, value }));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Silent Codes - Cultural Scenario Explorer</h1>

      <Select value={selectedCaseId} onChange={e => setSelectedCaseId(Number(e.target.value))}>
        {useCases.map((useCase, index) => (
          <option key={useCase.id} value={index}>{useCase.title}</option>
        ))}
      </Select>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">{selected.title}</h2>
          <p className="italic text-gray-700 mb-2">{selected.protagonistPOV}</p>
          <p className="mb-4">{selected.story}</p>
          <label className="block font-medium mb-2">Graph type:</label>
          <Select value={chartType} onChange={e => setChartType(e.target.value)}>
            <option value="radar">Radar Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </Select>

          <ResponsiveContainer width="100%" height={300}>
            {chartType === "radar" && (
              <RadarChart outerRadius={90} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="dimension" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar name="Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            )}
            {chartType === "bar" && (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dimension" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            )}
            {chartType === "line" && (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dimension" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Detailed Cultural Map Analysis</h3>
          {chartData.map(d => {
            const desc = getDimensionDescription(d.dimension, d.value);
            return (
              <div key={d.dimension} className="mb-4">
                <div className="font-medium">{desc.label} ({d.value.toFixed(1)})</div>
                <div className="text-gray-600 text-sm">{desc.explanation}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Conflict Resolution Approaches</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Style</th>
                  <th className="border px-4 py-2 text-left">Pros</th>
                  <th className="border px-4 py-2 text-left">Cons</th>
                  <th className="border px-4 py-2 text-left">Success %</th>
                </tr>
              </thead>
              <tbody>
                {selected.resolution.map((r, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="border px-4 py-2 font-medium">{r.style}</td>
                    <td className="border px-4 py-2 text-sm">{r.pros}</td>
                    <td className="border px-4 py-2 text-sm">{r.cons}</td>
                    <td className="border px-4 py-2 text-sm text-center">{r.successRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
