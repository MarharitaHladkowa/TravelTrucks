import Image from "next/image";
import Link from "next/link";
import { Camper } from "../types/camper";
import styles from "./CamperCard.module.css";

export const CamperCard = ({ camper }: { camper: Camper }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.gallery[0]?.thumb || ""}
          alt={camper.name}
          fill
          className={styles.image}
          sizes="290px"
        />
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.name}>{camper.name}</h2>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>€{camper.price.toFixed(2)}</span>
            <button className={styles.favoriteBtn}>♡</button>
          </div>
        </div>

        <div className={styles.meta}>
          <span>
            ⭐ {camper.rating} ({camper.reviews.length} Reviews)
          </span>
          <span>📍 {camper.location}</span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.categories}>
          <span className={styles.categoryTag}>{camper.transmission}</span>
          <span className={styles.categoryTag}>{camper.engine}</span>
          {camper.AC && <span className={styles.categoryTag}>AC</span>}
          {camper.kitchen && (
            <span className={styles.categoryTag}>Kitchen</span>
          )}
        </div>

        {/* Ссылка на страницу деталей по ТЗ */}
        <Link href={`/catalog/${camper.id}`} className="button-primary">
          Show more
        </Link>
      </div>
    </div>
  );
};
