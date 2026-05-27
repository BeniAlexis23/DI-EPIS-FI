import React from "react";
import {
  ActivityIcon,
  getActivityIconType,
  getSpeakerIconType,
  ScheduleSectionIcon,
  SpeakerIcon,
} from "./scheduleIcons";

const parseActivityText = (text = "") => {
  const parts = text.split(" - ");
  if (parts.length >= 3) {
    return {
      time: parts[0],
      endTime: parts[1],
      place: parts.slice(2).join(" - "),
    };
  }
  return { time: text, endTime: "", place: "" };
};

const getActivityMeta = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("recepción") || n.includes("registro")) return { type: "break", speaker: "" };
  if (n.includes("ceremonia") || n.includes("clausura") || n.includes("reconocimiento")) return { type: "keynote", speaker: "Comité Organizador" };
  if (n.includes("break") || n.includes("café")) return { type: "break", speaker: "" };
  if (n.includes("campeonato") || n.includes("deportivo")) return { type: "networking", speaker: "Delegados de Deportes" };
  if (n.includes("tecnología") || n.includes("inteligencia artificial")) return { type: "talk", speaker: "Ponente: Ing. Jair Manrique" };
  if (n.includes("conferencia") || n.includes("magistral")) return { type: "talk", speaker: "Ponente: Lic. Ivo Yance" };
  return { type: "talk", speaker: "" };
};

export const Services = (props) => {
  return (
    <div id="services">
      <div className="container">
        <div className="section-title section-title--schedule">
          <h2>Cronograma de Actividades</h2>
          <p>
            Programación oficial del evento · 10 de junio de 2025 · Casa de la
            Cultura
          </p>
        </div>

        <div className="sched-list">
          {props.data
            ? props.data.map((d, i) => {
              const activity = parseActivityText(d.text);
              const { type, speaker } = getActivityMeta(d.name);
              const itemType = d.type || type;
              const itemSpeaker = d.speaker || speaker;
              const activityIconType = getActivityIconType(d.name, itemType);
              const speakerIconType = getSpeakerIconType(itemSpeaker);

              return (
                <div key={`${d.name}-${i}`} className={`sched-card sched-type-${itemType} reveal-scroll-item`}>
                  <div className="sched-time">
                    <span className="sched-activity-icon" aria-hidden="true">
                      <ActivityIcon iconType={activityIconType} />
                    </span>
                    <span className="sched-time-start">{activity.time}</span>
                    {activity.endTime && (
                      <span className="sched-time-end">{activity.endTime}</span>
                    )}
                  </div>
                  <div className="sched-divider" aria-hidden="true" />
                  <div className="sched-body">
                    <p className="sched-title">{d.name}</p>
                    {itemSpeaker && (
                      <p className="sched-speaker">
                        <span className="sched-meta-icon" aria-hidden="true">
                          <SpeakerIcon iconType={speakerIconType} />
                        </span>
                        {itemSpeaker}
                      </p>
                    )}
                    {activity.place && (
                      <p className="sched-place">
                        <span className="sched-meta-icon sched-meta-icon--place" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                            <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="11" r="2.5" />
                          </svg>
                        </span>
                        {activity.place}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
            : null}
        </div>
      </div>
    </div>
  );
};
