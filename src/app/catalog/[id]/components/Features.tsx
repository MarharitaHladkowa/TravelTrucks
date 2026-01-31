import Image from "next/image";
import styles from "../CamperDetails.module.css";
import { Camper } from "@/src/types/camper";

const featuresConfig = [
  // Используем реальные имена файлов из твоей папки icons
  { key: "transmission", icon: "auto" }, // auto.svg
  { key: "engine", icon: "fuel-pump" }, // fuel-pump.svg
  { key: "AC", label: "AC", icon: "wind" }, // wind.svg
  { key: "kitchen", label: "Kitchen", icon: "cup-hot" }, // cup-hot.svg
  { key: "bathroom", label: "Bathroom", icon: "ph_shower" }, // ph_shower.svg
  { key: "TV", label: "TV", icon: "tv" }, // tv.svg
  { key: "radio", label: "Radio", icon: "ui-radios" }, // ui-radios.svg
  { key: "refrigerator", label: "Refrigerator", icon: "solar_fridge-outline" },
  { key: "microwave", label: "Microwave", icon: "lucide_microwave" },
  { key: "gas", label: "Gas", icon: "hugeicons_gas-stove" },
  { key: "water", label: "Water", icon: "ion_water-outline" },
];

export function Features({ camper }: { camper: Camper }) {
  return (
    <div className={styles.featuresTab}>
      <div className={styles.badges}>
        {featuresConfig.map((item) => {
          const value = camper[item.key as keyof Camper];
          if (!value) return null;

          const displayLabel = typeof value === "string" ? value : item.label;

          return (
            <div key={item.key} className={styles.badge}>
              <Image
                src={`/icons/${item.icon}.svg`}
                width={20}
                height={20}
                alt={String(displayLabel)}
                className={styles.badgeIcon}
              />
              <span className={styles.badgeText}>{String(displayLabel)}</span>
            </div>
          );
        })}
      </div>

      <h3 className={styles.subtitle}>Vehicle details</h3>

      <ul className={styles.details}>
        {[
          { label: "Form", value: camper.form },
          { label: "Length", value: camper.length },
          { label: "Width", value: camper.width },
          { label: "Height", value: camper.height },
          { label: "Tank", value: camper.tank },
          { label: "Consumption", value: camper.consumption },
        ].map(
          ({ label, value }) =>
            value && (
              <li key={label}>
                <span className={styles.detailLabel}>{label}</span>

                <span className={styles.detailValue}>
                  {/* Добавляем пробел перед заглавной буквой, если это строка */}
                  {typeof value === "string"
                    ? value.replace(/([A-Z])/g, " $1").trim()
                    : value}
                </span>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}
