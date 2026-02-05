"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import styles from "./CamperDetails.module.css";
import { BookingForm } from "./components/BookingForm";
import { Features } from "./components/Features";
import { Reviews } from "./components/Reviews";
import { Camper } from "@/src/types/camper";
import { GalleryItem } from "@/src/types/camper";
import Image from "next/image";
export default function CamperDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [activeTab, setActiveTab] = useState<"features" | "reviews">(
    "features",
  );

  useEffect(() => {
    axios
      .get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`)
      .then((res) => setCamper(res.data));
  }, [id]);

  if (!camper) return <p>Loading...</p>;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{camper.name}</h1>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Image src="/icons/star.svg" alt="Rating" width={16} height={16} />
          <span className={styles.ratingText}>
            {camper.rating} ({camper.reviews.length} Reviews)
          </span>
        </span>

        <span className={styles.metaItem}>
          <Image src="/icons/map.svg" alt="Location" width={16} height={16} />
          {camper.location}
        </span>
      </div>

      <p className={styles.price}>€{camper.price.toFixed(2)}</p>

      {/* ✅ ГАЛЕРЕЯ */}
      <ul className={styles.gallery}>
        {camper.gallery.slice(0, 3).map((img, idx) => {
          // slice(0, 3) лучше для сетки 1440px
          const item = img as GalleryItem;
          const imgSrc: string = typeof img === "object" ? item.original : img;

          return (
            <li key={idx} className={styles.galleryItem}>
              <Image
                src={imgSrc}
                alt={camper.name}
                width={292}
                height={312}
                className={styles.galleryImage}
                priority={idx === 0}
              />
            </li>
          );
        })}
      </ul>

      <p className={styles.description}>{camper.description}</p>

      {/* ✅ 60 / 40 layout */}
      <div className={styles.layout}>
        <div className={styles.left}>
          {/* Tabs */}
          <ul className={styles.tabs}>
            <li>
              <button
                className={activeTab === "features" ? styles.activeTab : ""}
                onClick={() => setActiveTab("features")}
              >
                Features
              </button>
            </li>
            <li>
              <button
                className={activeTab === "reviews" ? styles.activeTab : ""}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </li>
          </ul>

          {activeTab === "features" && <Features camper={camper} />}
          {activeTab === "reviews" && <Reviews reviews={camper.reviews} />}
        </div>

        <div className={styles.right}>
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
