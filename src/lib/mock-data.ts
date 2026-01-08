export type CallTag =
  | "appointment"
  | "handoff"
  | "general"
  | "completed"
  | "incomplete";

export type Call = {
  id: string;
  customerName: string;
  agentName: string;
  tags: CallTag[];
  datetime: string;
  durationMinutes: number;
  summary: string;
  requiresHandoff?: boolean;
  sentiment?: "Positive" | "Neutral" | "Negative";
  recordingUrl?: string;
  callCost?: number;
  transcript: { speaker: "Agent" | "Caller"; text: string }[];
};

export type Appointment = {
  id: string;
  callId: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  summary: string;
  status: "confirmed" | "pending" | "rescheduled";
  service: string;
};

export const stats = {
  totalAppointments: 42,
  conversionRate: 36.5,
  totalCalls: 128,
  handoffs: 6,
  todaysSchedules: 5,
};

export const calls: Call[] = [
  {
    id: "CALL-1045",
    customerName: "Jordan Lee",
    agentName: "Ava (AI)",
    tags: ["appointment", "completed"],
    datetime: "2026-01-08T09:30:00Z",
    durationMinutes: 12,
    summary:
      "Booked follow-up consultation for next Tuesday. Confirmed contact details and noted preference for morning slots.",
    sentiment: "Positive",
    recordingUrl: "#",
    callCost: 0.28,
    transcript: [
      {
        speaker: "Agent",
        text: "Thanks for calling. I can schedule that follow-up for Tuesday morning.",
      },
      {
        speaker: "Caller",
        text: "Yes, 9:30 AM works best. Please confirm by email.",
      },
    ],
  },
  {
    id: "CALL-1044",
    customerName: "Priya Raman",
    agentName: "Nova (AI)",
    tags: ["handoff", "incomplete"],
    datetime: "2026-01-08T12:10:00Z",
    durationMinutes: 6,
    summary:
      "Caller requested to speak with a specialist about custom pricing. Needs callback today.",
    requiresHandoff: true,
    sentiment: "Neutral",
    recordingUrl: "https://dxc03zgurdly9.cloudfront.net/b85b6fb160d5172d39f7af65c4be1ce5f175ae104fc95e664ac9ec08244002ff/recording.wav",
    callCost: 0.15,
    transcript: [
      {
        speaker: "Caller",
        text: "Can someone walk me through custom pricing for multi-location?",
      },
      {
        speaker: "Agent",
        text: "I will route this to a human specialist and have them call you back.",
      },
    ],
  },
  {
    id: "CALL-1043",
    customerName: "Miguel Santos",
    agentName: "Ava (AI)",
    tags: ["general", "completed"],
    datetime: "2026-01-07T17:45:00Z",
    durationMinutes: 9,
    summary:
      "Answered service availability questions, shared address and weekend hours. No booking yet.",
    sentiment: "Positive",
    recordingUrl: "#",
    callCost: 0.19,
    transcript: [
      {
        speaker: "Caller",
        text: "Are you open this Saturday afternoon?",
      },
      {
        speaker: "Agent",
        text: "Yes, we are open until 6 PM. Would you like me to reserve a slot?",
      },
    ],
  },
  {
    id: "CALL-1042",
    customerName: "Kim Reynolds",
    agentName: "Nova (AI)",
    tags: ["appointment", "completed"],
    datetime: "2026-01-07T15:15:00Z",
    durationMinutes: 11,
    summary:
      "Rescheduled previous booking to Thursday 11:00 AM. Sent confirmation text.",
    sentiment: "Positive",
    recordingUrl: "#",
    callCost: 0.22,
    transcript: [
      {
        speaker: "Caller",
        text: "I need to move my appointment from Tuesday to Thursday.",
      },
      {
        speaker: "Agent",
        text: "You are confirmed for Thursday at 11:00 AM. A text confirmation is on the way.",
      },
    ],
  },
  {
    id: "CALL-1041",
    customerName: "Casey Morgan",
    agentName: "Ava (AI)",
    tags: ["handoff", "incomplete"],
    datetime: "2026-01-07T11:05:00Z",
    durationMinutes: 4,
    summary:
      "Caller mentioned urgent billing dispute. Needs human callback with invoice history.",
    requiresHandoff: true,
    sentiment: "Negative",
    recordingUrl: "#",
    callCost: 0.09,
    transcript: [
      {
        speaker: "Caller",
        text: "There is an incorrect charge on my invoice.",
      },
      {
        speaker: "Agent",
        text: "I'll flag this for our billing team and have them contact you shortly.",
      },
    ],
  },
  {
    id: "CALL-1040",
    customerName: "Taylor Brooks",
    agentName: "Nova (AI)",
    tags: ["general", "completed"],
    datetime: "2026-01-06T10:25:00Z",
    durationMinutes: 7,
    summary:
      "Provided directions, parking guidance, and service pricing overview. Caller will decide later.",
    sentiment: "Neutral",
    recordingUrl: "#",
    callCost: 0.12,
    transcript: [
      {
        speaker: "Caller",
        text: "How do I park when I arrive?",
      },
      {
        speaker: "Agent",
        text: "Use the west garage and take the elevator to level 2. I'll text directions.",
      },
    ],
  },
];

export const appointments: Appointment[] = [
  {
    id: "APT-301",
    callId: "CALL-1045",
    date: "2026-01-13",
    time: "09:30",
    customerName: "Jordan Lee",
    phone: "+1 (415) 555-0199",
    summary: "Follow-up consultation, prefers morning slot.",
    status: "confirmed",
    service: "Consultation",
  },
  {
    id: "APT-300",
    callId: "CALL-1042",
    date: "2026-01-08",
    time: "11:00",
    customerName: "Kim Reynolds",
    phone: "+1 (206) 555-0142",
    summary: "Rescheduled session, confirmed via SMS.",
    status: "confirmed",
    service: "Onboarding",
  },
  {
    id: "APT-299",
    callId: "CALL-1044",
    date: "2026-01-08",
    time: "15:00",
    customerName: "Priya Raman",
    phone: "+1 (917) 555-0114",
    summary: "Requested pricing deep-dive and callback.",
    status: "pending",
    service: "Pricing consult",
  },
  {
    id: "APT-298",
    callId: "CALL-1043",
    date: "2026-01-09",
    time: "10:45",
    customerName: "Miguel Santos",
    phone: "+1 (303) 555-0172",
    summary: "Considering Saturday booking; awaiting confirmation.",
    status: "pending",
    service: "Service Q&A",
  },
];

export const schedules = [
  { time: "09:00 AM", title: "Team standup", location: "Zoom · 25 min" },
  { time: "10:30 AM", title: "Client onboarding", location: "Meeting room 2" },
  { time: "01:00 PM", title: "AI agent tuning", location: "Ops board" },
  { time: "03:15 PM", title: "Callback window", location: "Handoffs queue" },
  { time: "05:00 PM", title: "Daily wrap-up", location: "Notes & follow-ups" },
];

export const recentBookings = [
  {
    id: "BK-2201",
    customer: "Jordan Lee",
    service: "Consultation",
    date: "Jan 13",
    time: "09:30 AM",
  },
  {
    id: "BK-2199",
    customer: "Kim Reynolds",
    service: "Onboarding",
    date: "Jan 08",
    time: "11:00 AM",
  },
  {
    id: "BK-2197",
    customer: "Priya Raman",
    service: "Pricing consult",
    date: "Jan 08",
    time: "03:00 PM",
  },
];

export const businessProfile = {
  name: "Northwind Voice Clinic",
  type: "Healthcare · Specialty",
  phone: "+1 (415) 555-0101",
  email: "hello@northwindvoice.com",
  address: "200 Market St, Suite 110, San Francisco, CA 94103",
  callNumber: "+1 (415) 555-0147",
  hours: [
    "Mon–Fri · 9:00 AM – 7:00 PM",
    "Sat · 10:00 AM – 5:00 PM",
    "Sun · Closed",
  ],
  services: ["Voice AI concierge", "Booking assistance", "Live agent handoffs"],
  link: "https://yourdomain.com/customer-view",
};

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    cadence: "/mo",
    features: ["Up to 500 calls", "Basic analytics", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$129",
    cadence: "/mo",
    features: [
      "2,500 calls",
      "Conversion insights",
      "Callback workflows",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: "Custom",
    cadence: "",
    features: [
      "Unlimited calls",
      "Dedicated CSM",
      "Advanced routing",
      "SLA & security reviews",
    ],
  },
];
