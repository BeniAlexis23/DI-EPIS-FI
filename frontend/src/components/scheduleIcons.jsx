const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const ScheduleSectionIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="4" width="18" height="17" rx="2.5" />
    <path d="M8 2.5v3M16 2.5v3M3 9.5h18" />
    <path d="M8 13.5h2.5M8 17h4M14 13.5h3M14 17h3" />
  </svg>
);

export const getActivityIconType = (name = "", type = "") => {
  const n = name.toLowerCase();
  if (n.includes("recepción") || n.includes("registro")) return "checkin";
  if (n.includes("ceremonia")) return "ceremony";
  if (n.includes("clausura")) return "closing";
  if (n.includes("break") || n.includes("café")) return "break";
  if (n.includes("campeonato") || n.includes("deportivo")) return "sports";
  if (n.includes("tecnología")) return "tech";
  if (n.includes("blandas")) return "softskills";
  if (n.includes("conferencia") || n.includes("magistral")) return "talk";
  if (type === "keynote") return "ceremony";
  if (type === "break") return "break";
  if (type === "networking") return "sports";
  return "talk";
};

export const getSpeakerIconType = (speaker = "") => {
  const s = speaker.toLowerCase();
  if (s.includes("comité") || s.includes("organizador")) return "committee";
  if (s.includes("tecnología")) return "tech";
  if (s.includes("blandas")) return "softskills";
  if (s.includes("invitado")) return "guest";
  if (s.includes("deportes")) return "sports";
  return "speaker";
};

export const ActivityIcon = ({ iconType = "talk" }) => {
  switch (iconType) {
    case "checkin":
      return (
        <svg {...iconProps}>
          <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <path d="M9 9h6M9 12h4" />
          <path d="M9.5 16.5l1.5 1.5 3.5-3.5" />
        </svg>
      );
    case "ceremony":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="9" r="4.5" />
          <path d="M8.5 13.5L12 20l3.5-6.5" />
          <path d="M7 7.5h10" />
        </svg>
      );
    case "closing":
      return (
        <svg {...iconProps}>
          <path d="M5 5h14v12H5z" />
          <path d="M9 9h6M9 12h4" />
          <path d="M8 18l4-2 4 2" />
        </svg>
      );
    case "break":
      return (
        <svg {...iconProps}>
          <path d="M8 10h8v7a3 3 0 0 1-6 0v-7z" />
          <path d="M10 7h4v3h-4z" />
          <path d="M6 11H4M20 11h-2" />
          <path d="M10 14h4" />
        </svg>
      );
    case "sports":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M4.5 12h15M12 3.5a8.5 8.5 0 0 1 0 17M12 3.5a8.5 8.5 0 0 0 0 17" />
          <path d="M6.5 7.5l3 2.5M17.5 7.5l-3 2.5M6.5 16.5l3-2.5M17.5 16.5l-3-2.5" />
        </svg>
      );
    case "tech":
      return (
        <svg {...iconProps}>
          <path d="M8 7h8l1 3H7l1-3z" />
          <rect x="6" y="10" width="12" height="9" rx="1.5" />
          <path d="M10 20h4" />
        </svg>
      );
    case "softskills":
      return (
        <svg {...iconProps}>
          <path d="M12 4a4 4 0 0 1 0 8 4 4 0 0 1 0-8z" />
          <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
          <path d="M16 9l2 1.5M8 9L6 10.5" />
        </svg>
      );
    case "talk":
    default:
      return (
        <svg {...iconProps}>
          <path d="M5 6h14v9H10l-3 3V6z" />
          <path d="M9 10.5h6M9 13.5h4" />
          <circle cx="18" cy="7" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
  }
};

export const SpeakerIcon = ({ iconType = "speaker" }) => {
  switch (iconType) {
    case "committee":
      return (
        <svg {...iconProps}>
          <path d="M12 3l7 4v6c0 4.2-3.1 6.4-7 7-3.9-.6-7-2.8-7-7V7l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "tech":
      return (
        <svg {...iconProps}>
          <path d="M12 2l2 6h5l-4 3 1.5 6L12 14l-4.5 3L9 11 5 8h5l2-6z" />
        </svg>
      );
    case "softskills":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
          <path d="M16 11.5l1.5 1.5M8 11.5L6.5 13" />
        </svg>
      );
    case "guest":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="7" r="3.5" />
          <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
          <path d="M18 8l2 2M6 8L4 10" />
        </svg>
      );
    case "sports":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M5 12h14M12 5v14" />
        </svg>
      );
    case "speaker":
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        </svg>
      );
  }
};
