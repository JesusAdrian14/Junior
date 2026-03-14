import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import type { Skills } from "../types";
import { skills } from "../lib/info";
import { Button } from "./ui/button";

function SkillsC() {
  const [skillsFetch, setSkillsFetch] = useState<Skills[]>([]);

  const [opcion, setOpcion] = useState<number>(0);

  useEffect(() => {
    fetchSkills();
  }, [opcion]);

  const fetchSkills = async () => {

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      let filteredSkills: Skills[] = [];

      switch (opcion) {
        case 1: // Frontend
          filteredSkills = skills.filter((skill) =>
            skill.sector.some((s) => s.toLowerCase().includes("frontend")),
          );
          console.log("Frontend:", filteredSkills.length);
          break;

        case 2: // Backend
          filteredSkills = skills.filter((skill) =>
            skill.sector.some((s) => s.toLowerCase().includes("backend")),
          );
          console.log("Backend:", filteredSkills.length);
          break;

        case 3: // Databases
          filteredSkills = skills.filter((skill) =>
            skill.sector.some(
              (s) =>
                s.toLowerCase().includes("database") ||
                s.toLowerCase().includes("db"),
            ),
          );
          console.log("Databases:", filteredSkills.length);
          break;

        case 4: // Herramientas
          filteredSkills = skills.filter((skill) =>
            skill.sector.some((s) => s.toLowerCase().includes("herramientas")),
          );
          console.log("Herramientas:", filteredSkills.length);
          break;

        default: // Todas
          filteredSkills = skills;
          break;
      }

      console.log("Skills filtradas:", filteredSkills);
      setSkillsFetch(filteredSkills);
    } catch (error) {
      console.error("Error al cargar habilidades:", error);
    }
  };

  return (
    <div className={styles.container} id="skills">
      <h2 className="text-title">Stack de habilidades</h2>
      <div className={styles["skills-wrapper"]}>
        <div className={styles.options}>
          <Button
            onClick={() => setOpcion(0)}
            variant={opcion === 0 ? "default" : "outline"}
          >
            Todas <span className={styles.count}>({skills.length})</span>
          </Button>
          <Button
            onClick={() => setOpcion(1)}
            variant={opcion === 1 ? "default" : "outline"}
          >
            Frontend
          </Button>
          <Button
            onClick={() => setOpcion(2)}
            variant={opcion === 2 ? "default" : "outline"}
          >
            Backend
          </Button>
          <Button
            onClick={() => setOpcion(3)}
            variant={opcion === 3 ? "default" : "outline"}
          >
            Databases
          </Button>
          <Button
            onClick={() => setOpcion(4)}
            variant={opcion === 4 ? "default" : "outline"}
          >
            Herramientas
          </Button>
        </div>


        <div className={styles["skill-grid"]}>
          {skillsFetch.map((skill, index) => (
            <div key={index} className={styles["skill-card"]}>
              <div className={styles["skill-image-container"]}>
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className={styles["skill-logo"]}
                  loading="lazy"
                  onError={(e) => {
                    console.log(`Error cargando imagen: ${skill.logo}`);
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    // Mostrar iniciales como fallback
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement("div");
                      fallback.className = styles["image-fallback"];
                      fallback.textContent = skill.name.charAt(0);
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <h3 className={styles["skill-name"]}>{skill.name}</h3>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default SkillsC;
