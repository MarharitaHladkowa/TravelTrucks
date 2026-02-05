"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./CamperCard.module.css";

import type { Camper, GalleryItem } from "@/src/types/camper";
import { FEATURE_ICONS, ALL_FEATURE_KEYS } from "@/src/constants/features";
import { useFilterStore } from "@/src/store/useFilterStore";

type Props = {
  camper: Camper;
};

export const CamperCard = ({ camper }: Props) => {
  const { favorites, toggleFavorite } = useFilterStore();

  const isFavorite = favorites.includes(camper.id);

  // ✅ SAFE image source resolving
  const firstImage = camper.gallery?.[0];

  let imageSrc = "/images/placeholder.jpg";

  if (typeof firstImage === "string") {
    imageSrc = firstImage;
  } else if (
    typeof firstImage === "object" &&
    firstImage !== null &&
    "thumb" in firstImage
  ) {
    imageSrc = (firstImage as GalleryItem).thumb;
  }

  const activeFeatures = ALL_FEATURE_KEYS.filter((key) => {
    const value = camper[key as keyof Camper];
    return value === true || typeof value === "string";
  });

  return (
    <div className={styles.card}>
      {/* Возвращаем блок с картинкой, который использует imageSrc */}
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={camper.name}
          fill
          sizes="(max-width: 768px) 100vw, 290px"
          className={styles.image}
          priority={false}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.name}>{camper.name}</h2>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>€{camper.price.toFixed(2)}</span>
            <button
              type="button"
              className={styles.favoriteBtn}
              onClick={() => toggleFavorite(camper.id)}
            >
              <Image
                src={isFavorite ? "/icons/pressed.svg" : "/icons/Default.svg"}
                alt="Favorite"
                width={26}
                height={24}
              />
            </button>
          </div>
        </div>

        <ul className={styles.meta}>
          <li className={styles.metaItem}>
            <Image src="/icons/star.svg" alt="Rating" width={16} height={16} />
            <span className={styles.ratingText}>
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
          </li>
          <li className={styles.metaItem}>
            <Image src="/icons/map.svg" alt="Location" width={16} height={16} />
            {camper.location}
          </li>
        </ul>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.categories}>
          {activeFeatures.slice(0, 6).map((key) => {
            const value = camper[key as keyof Camper];
            return (
              <li key={key} className={styles.categoryTag}>
                <Image
                  src={FEATURE_ICONS[key]}
                  alt={key}
                  width={20}
                  height={20}
                />
                <span className={styles.tagText}>
                  {typeof value === "string" ? value : key}
                </span>
              </li>
            );
          })}
        </ul>

        <Link href={`/catalog/${camper.id}`} className="button-primary">
          Show more
        </Link>
      </div>
    </div>
  );
};
