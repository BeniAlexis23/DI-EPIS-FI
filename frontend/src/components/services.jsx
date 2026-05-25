import React from "react";

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
  if (n.includes("ceremonia") || n.includes("clausura")) return { type: "keynote", speaker: "Comité Organizador" };
  if (n.includes("break") || n.includes("café")) return { type: "break", speaker: "" };
  if (n.includes("campeonato") || n.includes("deportivo")) return { type: "networking", speaker: "Delegados de Deportes" };
  if (n.includes("tecnología")) return { type: "talk", speaker: "Ponente de Tecnología" };
  if (n.includes("blandas")) return { type: "talk", speaker: "Ponente de Habilidades Blandas" };
  if (n.includes("conferencia") || n.includes("magistral")) return { type: "talk", speaker: "Ponente Invitado" };
  return { type: "talk", speaker: "" };
};

export const Services = (props) => {
  return (
    <div id="services">
      <div className="container">
        <div className="section-title">
          <h2>Cronograma de Actividades</h2>
          <p>
            Programación oficial del evento · 05 de junio de 2025 · Casa de la
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

                return (
                  <div key={`${d.name}-${i}`} className={`sched-card sched-type-${itemType} reveal-scroll-item`}>
                    <div className="sched-time">
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
                          <i className="fa fa-user-o" aria-hidden="true" />
                          {itemSpeaker}
                        </p>
                      )}
                      {activity.place && (
                        <p className="sched-place">
                          <i className="fa fa-map-marker" aria-hidden="true" />
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
