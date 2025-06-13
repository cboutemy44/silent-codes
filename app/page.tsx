"use client";

// Silent Codes - Full App (Mocked Analysis for Testing)

import React, { useState } from "react";

const Card = ({ children }) => <div className="border p-4 rounded shadow bg-white">{children}</div>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const Button = ({ children, ...props }) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" {...props}>{children}</button>
);

const defaultCultureMap = [
  { dimension: "Communicating", value: 0 },
  { dimension: "Evaluating", value: 0 },
  { dimension: "Leading", value: 0 },
  { dimension: "Deciding", value: 0 },
  { dimension: "Trusting", value: 0 },
  { dimension: "Disagreeing", value: 0 },
  { dimension: "Scheduling", value: 0 },
  { dimension: "Persuading", value: 0 },
];

export default function SilentCodes() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [cultureMap, setCultureMap] = useState(defaultCultureMap);
  const [scenarios, setScenarios] = useState([]);
  const [conflictStyles, setConflictStyles] = useState([]);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    const mockData = {
      cultureMap: [
        { dimension: "Communicating", value: 1 },
        { dimension: "Evaluating", value: 2 },
        { dimension: "Leading", value: 1 },
        { dimension: "Deciding", value: 2 },
        { dimension: "Trusting", value: 2 },
        { dimension: "Disagreeing", value: 1 },
        { dimension: "Scheduling", value: 4 },
        { dimension: "Persuading", value: 1 }
      ],
      scenarios: [
        "A junior Japanese employee hesitates to correct a factual mistake made by their Western manager during a presentation.",
        "A French engineer expects immediate decision-making, but is frustrated by the Japanese team's preference for consensus.",
        "During a feedback session, the Japanese team avoids direct criticism, confusing an American colleague who interprets silence as approval.",
        "An international employee openly disagrees in a meeting, unintentionally making Japanese colleagues uncomfortable.",
        "A manager praises an employee publicly, but the employee feels embarrassed and isolated as a result."
      ],
      conflictStyles: [
        {
          style: "Accommodating",
          recommendation: "Effective in Japanese teams to preserve harmony, but should be balanced with speaking up when necessary."
        },
        {
          style: "Collaborating",
          recommendation: "Ideal for intercultural teams; encourages mutual understanding and respects both direct and indirect styles."
        },
        {
          style: "Avoiding",
          recommendation: "Common in Japan to de-escalate tension, but risks unresolved conflicts in global settings."
        },
        {
          style: "Competing",
          recommendation: "May be perceived as aggressive in Japan; use with caution unless the cultural norm supports it."
        },
        {
          style: "Compromising",
          recommendation: "A safe choice in multicultural teams, but might lead to shallow solutions if overused."
        }
      ]
    };

    setCultureMap(mockData.cultureMap);
    setScenarios(mockData.scenarios);
    setConflictStyles(mockData.conflictStyles);
    setAnalysisReady(true);
    setLoading(false);
  };

  const handleReset = () => {
    setInputText("");
    setCultureMap(defaultCultureMap);
    setScenarios([]);
    setConflictStyles([]);
    setAnalysisReady(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-end">
        <Button onClick={handleReset}>Reset</Button>
      </div>

      <Card>
        <CardContent>
          <textarea
            placeholder="Describe your cross-cultural situation here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-2 border rounded"
            rows={5}
          />
          <div className="mt-4">
            <Button onClick={handleSubmit} disabled={loading || !inputText.trim()}>
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysisReady && (
        <>
          <Card>
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Culture Map Analysis</h2>
              <div className="h-64 border rounded flex items-center justify-center bg-gray-50">
                (Radar Chart Placeholder — install and re-enable Recharts for production)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Possible Scenarios</h2>
              <ul className="list-disc ml-6 space-y-2">
                {scenarios.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Conflict Style Recommendations</h2>
              <ul className="space-y-4">
                {conflictStyles.map((style, idx) => (
                  <li key={idx}>
                    <strong>{style.style}</strong>: {style.recommendation}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
