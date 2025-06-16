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
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const useCases = [
  {
    id: 1,
    title: "French Manager in Japan",
    protagonistPOV: "Marie Dupont, a French manager, navigating feedback culture at a Tokyo office.",
    story: "Marie Dupont assigned feedback during a team meeting with her Japanese colleagues Hiroshi Tanaka and Yuki Sato. She noticed discomfort as her direct style felt too public, causing Hiroshi to withdraw and Yuki to avoid eye contact, leading to silent resistance.",
    dimensions: { Communicating: 2, Evaluating: 4, Leading: 3, Deciding: 2, Trusting: 1, Disagreeing: 4, Scheduling: 3 },
    dimensionRationale: {
      Communicating: "Score 2: Marie Dupont (French manager) noticed Hiroshi Tanaka (team lead) pull back when her direct feedback stopped informal consensus, reflecting lower communication.",
      Evaluating: "Score 4: When Marie openly critiqued Yuki Sato’s report, the blunt nature exemplified a high direct evaluation style.",
      Leading: "Score 3: Marie balanced asserting decisions with inviting team comments, blending hierarchy and collaboration.",
      Deciding: "Score 2: Her push for quick decisions clashed with the team’s preference for harmony.",
      Trusting: "Score 1: She focused on tasks first, giving little time to build personal rapport.",
      Disagreeing: "Score 4: She encouraged open debate, making colleagues uncomfortable in avoidance-oriented culture.",
      Scheduling: "Score 3: She adhered to schedule but allowed flexibility if team needed."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Marie can enforce urgent deadlines and clarity, ensuring project milestones stay on track when time is critical.",
        cons: "This direct, top-down approach may exacerbate discomfort for Hiroshi and Yuki, potentially eroding morale and trust.",
        successRate: 30
      },
      {
        style: "Collaborating",
        pros: "By working with Hiroshi and Yuki to co-create feedback norms, Marie fosters sustainable understanding and mutual respect.",
        cons: "Requires significant time investment and high emotional intelligence to bridge cultural gaps, delaying immediate outputs.",
        successRate: 80
      },
      {
        style: "Compromising",
        pros: "Marie and the team agree on a halfway feedback format—combining private one-on-ones with group summaries—to balance preferences.",
        cons: "May only partially satisfy either party, leading to diluted feedback effectiveness.",
        successRate: 65
      },
      {
        style: "Avoiding",
        pros: "Temporarily deferring strict feedback reduces conflict peaks, giving the team time to adjust.",
        cons: "Risk of unresolved issues lingering, causing larger problems later and signaling weak leadership.",
        successRate: 40
      },
      {
        style: "Accommodating",
        pros: "Marie defers to local norms by soliciting feedback in writing, preserving harmony.",
        cons: "May suppress her managerial guidance, leaving key performance issues unaddressed.",
        successRate: 55
      }
    ]
  },
  {
    id: 2,
    title: "Indian Engineer in Japan",
    protagonistPOV: "Rajesh Kumar, an Indian engineer, adapting to Japanese directness at Tokyo R&D.",
    story: "During a sprint review Rajesh presented to Satoshi Yamamoto, who gave blunt feedback without small talk and enforced strict deadlines, surprising Rajesh and making him feel rushed.",
    dimensions: { Communicating: 3, Evaluating: 5, Leading: 2, Deciding: 4, Trusting: 3, Disagreeing: 5, Scheduling: 5 },
    dimensionRationale: {
      Communicating: "Score 3: A mix of direct instruction from Satoshi and polite indirect cues from peers.",
      Evaluating: "Score 5: Satoshi’s blunt code critique reflects top direct evaluation.",
      Leading: "Score 2: Leadership was collaborative but respectful of rank.",
      Deciding: "Score 4: Deadlines set top-down with some team input.",
      Trusting: "Score 3: Rajesh earned trust through competence.",
      Disagreeing: "Score 5: Open criticism was welcomed in reviews.",
      Scheduling: "Score 5: Strict adherence to timelines expected."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Rajesh can firmly restate his own work boundaries and highlight task dependencies, ensuring mutual understanding.",
        cons: "Risk of coming across as defensive, straining rapport with Satoshi and peers who value directness.",
        successRate: 35
      },
      {
        style: "Collaborating",
        pros: "By inviting Satoshi and the team to define feedback protocols together, Rajesh fosters clarity and collective buy-in.",
        cons: "Requires multiple meetings and negotiation, delaying technical progress.",
        successRate: 75
      },
      {
        style: "Compromising",
        pros: "Establishing interim deadlines acceptable to both Rajesh and Satoshi balances speed and mutual comfort.",
        cons: "May not fully align with organizational timelines, risking downstream delays.",
        successRate: 60
      },
      {
        style: "Avoiding",
        pros: "Taking time to observe local work patterns lets Rajesh acclimate before addressing differences.",
        cons: "Delays necessary adjustments, and perceived passivity can reduce credibility.",
        successRate: 45
      },
      {
        style: "Accommodating",
        pros: "Rajesh can adopt Satoshi’s direct feedback style temporarily to build rapport and trust.",
        cons: "Suppressing his own preferences long-term may lead to burnout or miscommunication.",
        successRate: 50
      }
    ]
  },
  {
    id: 3,
    title: "American Team Leader in Japan",
    protagonistPOV: "Emily Johnson, an American leader, running standups at Sakura Tech.",
    story: "Emily held a 9AM standup with Takeshi Ito and Mei Kobayashi, who arrived quietly and deferred to each other. Her strict agenda felt rigid, causing them to disengage.",
    dimensions: { Communicating: 4, Evaluating: 3, Leading: 4, Deciding: 3, Trusting: 4, Disagreeing: 3, Scheduling: 1 },
    dimensionRationale: {
      Communicating: "Score 4: Emily’s clarity contrasted with subtle local cues.",
      Evaluating: "Score 3: Feedback was direct but tempered.",
      Leading: "Score 4: Assertive direction paired with respect.",
      Deciding: "Score 3: Guided consensus.",
      Trusting: "Score 4: Casual chats built rapport.",
      Disagreeing: "Score 3: Polite objections possible.",
      Scheduling: "Score 1: Flexible time norms caused delays."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Emily can strictly enforce start times and agenda to instill discipline.",
        cons: "May alienate Takeshi and Mei, reinforcing a sense of foreignness and weakening team cohesion.",
        successRate: 25
      },
      {
        style: "Collaborating",
        pros: "Co-designing meeting rituals with the team ensures schedules respect cultural norms while maintaining productivity.",
        cons: "Takes multiple iterations to find balance, delaying immediate improvements.",
        successRate: 70
      },
      {
        style: "Compromising",
        pros: "Allowing a flexible window for standups respects local timing while keeping structure.",
        cons: "May introduce unpredictability and reduce efficiency if over-relaxed.",
        successRate: 60
      },
      {
        style: "Avoiding",
        pros: "Temporarily dropping strict agendas reduces initial friction.",
        cons: "Risk of long-term lack of focus and unclear deliverables.",
        successRate: 30
      },
      {
        style: "Accommodating",
        pros: "Emily joins informal pre-standup conversations to honor local social rhythms.",
        cons: "Her core leadership objectives may be sidelined by extended socializing.",
        successRate: 50
      }
    ]
  },
  {
    id: 4,
    title: "Japanese Consultant with Foreign Team",
    protagonistPOV: "Aiko Nakamura, a Japanese consultant, bridging gaps at NeoWorks Tokyo.",
    story: "Aiko led a workshop with Mark Thompson and Priya Singh. She stayed silent to maintain harmony, but they misread it as disinterest and excluded her.",
    dimensions: { Communicating: 1, Evaluating: 2, Leading: 2, Deciding: 3, Trusting: 2, Disagreeing: 1, Scheduling: 4 },
    dimensionRationale: {
      Communicating: "Score 1: Aiko’s minimal input was misinterpreted by Mark and Priya.",
      Evaluating: "Score 2: Feedback was indirect and gentle.",
      Leading: "Score 2: She guided softly rather than directed.",
      Deciding: "Score 3: Balanced consensus with occasional guidance.",
      Trusting: "Score 2: Prioritized relationships first.",
      Disagreeing: "Score 1: Avoided public conflict.",
      Scheduling: "Score 4: Punctuality emphasized."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Aiko can assert explicit checkpoints to clarify engagement expectations.",
        cons: "May conflict with her norms of indirect communication, causing discomfort.",
        successRate: 35
      },
      {
        style: "Collaborating",
        pros: "Co-creating workshop guidelines with Mark and Priya builds mutual awareness.",
        cons: "Requires extra facilitation skills and time investment.",
        successRate: 75
      },
      {
        style: "Compromising",
        pros: "Agreeing on mixed communication styles (verbal + written) satisfies both direct and indirect preferences.",
        cons: "May lead to inconsistent application without strong follow-up.",
        successRate: 50
      },
      {
        style: "Avoiding",
        pros: "Stepping back temporarily reduces potential misinterpretation.",
        cons: "May reinforce exclusion and reduce influence.",
        successRate: 30
      },
      {
        style: "Accommodating",
        pros: "Offering one-on-one sessions respects personal comfort.",
        cons: "Limits broader team visibility and may be seen as side-stepping.",
        successRate: 40
      }
    ]
  },
  {
    id: 5,
    title: "German Manager in Japan",
    protagonistPOV: "Anke Weber, a German manager, working with Tokyo devs.",
    story: "Anke requested 10AM updates at TechFusion Tokyo. Naoko Suzuki replied politely but missed deadlines, leaving Anke uncertain.",
    dimensions: { Communicating: 3, Evaluating: 5, Leading: 4, Deciding: 4, Trusting: 2, Disagreeing: 4, Scheduling: 2 },
    dimensionRationale: {
      Communicating: "Score 3: Clear yet polite directives to Naoko.",
      Evaluating: "Score 5: Direct critique when tasks lagged.",
      Leading: "Score 4: Authoritative with consult.",
      Deciding: "Score 4: Data-driven with input.",
      Trusting: "Score 2: Focused on task over rapport.",
      Disagreeing: "Score 4: Critique accepted.",
      Scheduling: "Score 2: Some flexibility needed."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Anke can enforce strict follow-up protocols, ensuring clarity on deliverables.",
        cons: "May be perceived as overly rigid, straining relationship with Naoko.",
        successRate: 30
      },
      {
        style: "Collaborating",
        pros: "Co-developing a shared reporting template empowers Naoko and aligns expectations.",
        cons: "Requires training and ongoing support, delaying immediate fixes.",
        successRate: 75
      },
      {
        style: "Compromising",
        pros: "Agreeing on interim check-ins offers balance between oversight and autonomy.",
        cons: "Potentially burdens both parties with extra meetings.",
        successRate: 60
      },
      {
        style: "Avoiding",
        pros: "Giving Naoko space to self-organize reduces immediate tension.",
        cons: "Risks missing critical deadlines and eroding accountability.",
        successRate: 40
      },
      {
        style: "Accommodating",
        pros: "Anke can accept less frequent updates to preserve goodwill.",
        cons: "May sacrifice timely information, impacting decision-making.",
        successRate: 50
      }
    ]
  },
  {
    id: 6,
    title: "Brazilian Designer in Japan",
    protagonistPOV: "Lucas Oliveira, a Brazilian designer at PixelArt Tokyo.",
    story: "Lucas expected quick approvals but faced lengthy consensus led by Haruka Yamamoto, causing frustration.",
    dimensions: { Communicating: 4, Evaluating: 3, Leading: 2, Deciding: 1, Trusting: 4, Disagreeing: 3, Scheduling: 4 },
    dimensionRationale: {
      Communicating: "Score 4: Lucas’s warmth softened Yamamoto’s reserve.",
      Evaluating: "Score 3: Constructive feedback delivered.",
      Leading: "Score 2: Egalitarian process.",
      Deciding: "Score 1: Slow consensus.",
      Trusting: "Score 4: Built through informal chats.",
      Disagreeing: "Score 3: Moderate openness.",
      Scheduling: "Score 4: Balanced timing."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Lucas can push for final sign-off when projects stall, ensuring momentum.",
        cons: "May undermine group rapport and be seen as disrespectful.",
        successRate: 25
      },
      {
        style: "Collaborating",
        pros: "Facilitating design charrettes with Haruka builds shared ownership.",
        cons: "Time-consuming and may overextend resources.",
        successRate: 70
      },
      {
        style: "Compromising",
        pros: "Agreeing on phased approvals balances thoroughness and speed.",
        cons: "Complex to manage multiple approval stages.",
        successRate: 60
      },
      {
        style: "Avoiding",
        pros: "Pausing approvals temporarily cools tensions.",
        cons: "Delays project deliverables significantly.",
        successRate: 35
      },
      {
        style: "Accommodating",
        pros: "Allowing Yamamoto’s extended sessions respects local norms.",
        cons: "Design timelines may slip, risking client satisfaction.",
        successRate: 50
      }
    ]
  },
  {
    id: 7,
    title: "American Analyst in Japan",
    protagonistPOV: "Samantha Lee, an American analyst at GlobalInsights Tokyo.",
    story: "Samantha challenged Kenji Watanabe publicly. He ended the briefing and colleagues avoided her.",
    dimensions: { Communicating: 3, Evaluating: 3, Leading: 5, Deciding: 4, Trusting: 2, Disagreeing: 1, Scheduling: 4 },
    dimensionRationale: {
      Communicating: "Score 3: Direct but respectful.",
      Evaluating: "Score 3: Balanced critique.",
      Leading: "Score 5: Assertive.",
      Deciding: "Score 4: Quick decisions.",
      Trusting: "Score 2: Moderate trust.",
      Disagreeing: "Score 1: Public dissent avoided.",
      Scheduling: "Score 4: Punctual."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Samantha can firmly restate analytical conclusions to regain meeting control.",
        cons: "May escalate tension and further isolate her.",
        successRate: 20
      },
      {
        style: "Collaborating",
        pros: "Setting up a private debrief with Kenji fosters mutual understanding.",
        cons: "Delays group resolution and requires vulnerability.",
        successRate: 70
      },
      {
        style: "Compromising",
        pros: "Agreeing to adjust tone in exchange for increased data access balances needs.",
        cons: "May dilute analytical rigor.",
        successRate: 60
      },
      {
        style: "Avoiding",
        pros: "Skipping immediate confrontation gives space.",
        cons: "Allows misunderstandings to persist.",
        successRate: 30
      },
      {
        style: "Accommodating",
        pros: "Samantha defers to Kenji’s preferred format to rebuild rapport.",
        cons: "Suppresses her own style, possibly stifling insights.",
        successRate: 40
      }
    ]
  },
  {
    id: 8,
    title: "Chinese Tech Lead in Japan",
    protagonistPOV: "Li Wei, overseeing dev at SakuraSoft Tokyo.",
    story: "Li Wei gave indirect suggestions, but Yui Nakamura and Takahiro Suzuki openly critiqued him, feeling disrespectful.",
    dimensions: { Communicating: 2, Evaluating: 3, Leading: 3, Deciding: 3, Trusting: 2, Disagreeing: 5, Scheduling: 4 },
    dimensionRationale: {
      Communicating: "Score 2: Mixed indirect and direct styles.",
      Evaluating: "Score 3: Moderately direct feedback.",
      Leading: "Score 3: Balanced.",
      Deciding: "Score 3: Joint decisions.",
      Trusting: "Score 2: Trust built over time.",
      Disagreeing: "Score 5: Open critique.",
      Scheduling: "Score 4: Timely updates."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Li Wei can set firm code standards to eliminate ambiguity.",
        cons: "May heighten friction with team used to collaborative inputs.",
        successRate: 25
      },
      {
        style: "Collaborating",
        pros: "Hosting joint code review sessions promotes shared understanding.",
        cons: "Requires facilitation and time.",
        successRate: 70
      },
      {
        style: "Compromising",
        pros: "Agreeing on a code review checklist balances inputs and expectations.",
        cons: "May feel bureaucratic and slow down velocity.",
        successRate: 60
      },
      {
        style: "Avoiding",
        pros: "Pausing direct feedback temporarily reduces tension.",
        cons: "Delays critical quality improvements.",
        successRate: 30
      },
      {
        style: "Accommodating",
        pros: "Adopting team-preferred review style respects local norms.",
        cons: "Could compromise on technical rigor.",
        successRate: 45
      }
    ]
  },
  {
    id: 9,
    title: "Russian Director in Japan",
    protagonistPOV: "Olga Petrov, joining a Tokyo investment board.",
    story: "Olga presented bold plans at Sakura Capital Tokyo. Kenji Yamada and Liu Chen expected consensus, so her direct style stalled discussion.",
    dimensions: { Communicating: 3, Evaluating: 4, Leading: 5, Deciding: 5, Trusting: 3, Disagreeing: 4, Scheduling: 5 },
    dimensionRationale: {
      Communicating: "Score 3: Assertive yet respectful.",
      Evaluating: "Score 4: Clear feedback.",
      Leading: "Score 5: Top-down.",
      Deciding: "Score 5: Fast.",
      Trusting: "Score 3: Professional respect.",
      Disagreeing: "Score 4: Board debated openly.",
      Scheduling: "Score 5: Strict schedule."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Olga can drive swift strategic decisions during critical market shifts.",
        cons: "May alienate board members who prefer inclusive discussion.",
        successRate: 25
      },
      {
        style: "Collaborating",
        pros: "Structured workshops to integrate stakeholder input ensure shared ownership.",
        cons: "Time-consuming and may delay urgent actions.",
        successRate: 80
      },
      {
        style: "Compromising",
        pros: "Balancing her bold proposals with board concerns maintains momentum.",
        cons: "May dilute strategic vision.",
        successRate: 55
      },
      {
        style: "Avoiding",
        pros: "Temporarily stepping back lets tensions cool.",
        cons: "Risks losing strategic initiative time.",
        successRate: 35
      },
      {
        style: "Accommodating",
        pros: "Adopting a consensus-seeking tone builds rapport.",
        cons: "Can reduce decisiveness in fast-moving markets.",
        successRate: 45
      }
    ]
  },
  {
    id: 10,
    title: "Nigerian Sales Director in Japan",
    protagonistPOV: "Chinedu Okafor, negotiating at NipponTrades Tokyo.",
    story: "Chinedu pitched to Takumi Ito and Aya Nakamura. His energetic style was seen as disruptive and he was cut off mid-sentence.",
    dimensions: { Communicating: 3, Evaluating: 3, Leading: 3, Deciding: 2, Trusting: 1, Disagreeing: 2, Scheduling: 4 },
    dimensionRationale: {
      Communicating: "Score 3: Lively but adapted to silence.",
      Evaluating: "Score 3: Mixed praise and critique.",
      Leading: "Score 3: Led pitch but adjusted style.",
      Deciding: "Score 2: Needed consensus.",
      Trusting: "Score 1: Limited rapport.",
      Disagreeing: "Score 2: Gentle objections.",
      Scheduling: "Score 4: Punctual appreciated."
    },
    resolution: [
      {
        style: "Competing",
        pros: "Chinedu can insist on core deal points to highlight their urgency.",
        cons: "May reinforce perceptions of disruptiveness among executives.",
        successRate: 30
      },
      {
        style: "Collaborating",
        pros: "Facilitating a joint pitch rehearsal with Takumi and Aya cultivates mutual respect.",
        cons: "Requires extra preparation and coordination.",
        successRate: 75
      },
      {
        style: "Compromising",
        pros: "Blending his enthusiasm with structured pausing respects local norms.",
        cons: "May dampen his natural energy and authenticity.",
        successRate: 55
      },
      {
        style: "Avoiding",
        pros: "Holding off on high-energy pitches until trust builds.",
        cons: "Could miss timely opportunities.",
        successRate: 40
      },
      {
        style: "Accommodating",
        pros: "He can adopt a more subdued delivery to honor local etiquette.",
        cons: "His impact may be less memorable.",
        successRate: 45
      }
    ]
  }
];

export default function App() {
  const [selectedCase, setSelectedCase] = useState(useCases[0]);
  const [chartType, setChartType] = useState<'radar' | 'bar' | 'line'>('radar');
  const radarData = Object.entries(selectedCase.dimensions).map(([dimension, value]) => ({ dimension, value }));
  const dimExplanations = {
    Communicating: "Low = high-context; High = low-context",
    Evaluating: "Low = indirect feedback; High = direct feedback",
    Leading: "Low = egalitarian; High = hierarchical",
    Deciding: "Low = consensual; High = top-down",
    Trusting: "Low = task-based; High = relationship-based",
    Disagreeing: "Low = avoids confrontation; High = embraces confrontation",
    Scheduling: "Low = flexible time; High = linear time"
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Silent Codes: Cultural Conflict Analyzer</h1>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select scenario:</label>
        <select
          className="p-2 border rounded"
          value={selectedCase.id}
          onChange={e => setSelectedCase(useCases.find(c => c.id === +e.target.value)!)}
        >
          {useCases.map(c => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{selectedCase.title}</h2>
        <p className="italic text-gray-700">{selectedCase.protagonistPOV}</p>
        <p className="mt-2 mb-4">{selectedCase.story}</p>
        <h3 className="text-lg font-semibold mb-2">Conflict Resolution Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedCase.resolution.map((r, i) => (
            <div key={i} className="border p-4 rounded shadow">
              <h4 className="font-bold">{r.style}</h4>
              <p className="text-sm text-green-700"><strong>✔ Pros:</strong> {r.pros}</p>
              <p className="text-sm text-red-700"><strong>✘ Cons:</strong> {r.cons}</p>
              <p className="text-sm font-semibold">🎯 Success Rate: {r.successRate}%</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Chart Type</h3>
        <select
          className="border p-1 rounded mb-4"
          value={chartType}
          onChange={e => setChartType(e.target.value as any)}
        >
          <option value="radar">Radar</option>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
        </select>
        {chartType === 'radar' && (
          <RadarChart outerRadius={120} width={500} height={400} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" />
            <PolarRadiusAxis angle={30} domain={[0,5]} />
            <Radar name="Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip formatter={(val: number, name: string, item: any) => {
              const dim = item && item.payload && item.payload.dimension;
              return [val, dim ? dimExplanations[dim as keyof typeof dimExplanations] : ""];
            }} />
          </RadarChart>
        )}
        {chartType === 'bar' && (
          <BarChart width={600} height={300} data={radarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dimension" interval={0} tick={{ angle: -45, textAnchor: 'end' }} height={60} />
            <YAxis domain={[0,5]} />
            <Tooltip formatter={(val: number, _: any, props: { payload: { dimension: string } }) => [val, dimExplanations[props.payload.dimension as keyof typeof dimExplanations]]} />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}
        {chartType === 'line' && (
          <LineChart width={600} height={300} data={radarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dimension" interval={0} tick={{ angle: -45, textAnchor: 'end' }} height={60} />
            <YAxis domain={[0,5]} />
            <Tooltip formatter={(val: number, _: any, props: { payload: { dimension: keyof typeof dimExplanations } }) => [val, dimExplanations[props.payload.dimension]]} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Dimension Details</h3>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Dimension</th>
              <th className="border px-4 py-2 text-left">Explanation</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedCase.dimensionRationale).map(([dim, text]) => (
              <tr key={dim}>
                <td className="border px-4 py-2 font-semibold">{dim}</td>
                <td className="border px-4 py-2">{text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
