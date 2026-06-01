import { 
  HiCalendar, 
  HiClipboardCheck, 
  HiAcademicCap, 
  HiFlag, 
  HiLightningBolt, // Reemplazo para break si no hay café
  HiDesktopComputer, 
  HiUserGroup, 
  HiChat,
  HiShieldCheck,
  HiCode,
  HiHeart,
  HiStar,
  HiUser
} from 'react-icons/hi';
import { FaCoffee, FaTrophy } from 'react-icons/fa'; // Usamos FA para los que faltan en HI

const iconProps = {
  size: 24,
  "aria-hidden": true,
};

export const ScheduleSectionIcon = () => (
  <HiCalendar {...iconProps} />
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
      return <HiClipboardCheck {...iconProps} />;
    case "ceremony":
      return <HiAcademicCap {...iconProps} />;
    case "closing":
      return <HiFlag {...iconProps} />;
    case "break":
      return <FaCoffee {...iconProps} />; // Corregido a FaCoffee
    case "sports":
      return <FaTrophy {...iconProps} />; // Corregido a FaTrophy
    case "tech":
      return <HiDesktopComputer {...iconProps} />;
    case "softskills":
      return <HiUserGroup {...iconProps} />;
    case "talk":
    default:
      return <HiChat {...iconProps} />;
  }
};

export const SpeakerIcon = ({ iconType = "speaker" }) => {
  switch (iconType) {
    case "committee":
      return <HiShieldCheck {...iconProps} />;
    case "tech":
      return <HiCode {...iconProps} />;
    case "softskills":
      return <HiHeart {...iconProps} />;
    case "guest":
      return <HiStar {...iconProps} />;
    case "sports":
      return <FaTrophy {...iconProps} />; // Corregido a FaTrophy
    case "speaker":
    default:
      return <HiUser {...iconProps} />;
  }
};
