"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./catalog.module.css";
import { CamperCard } from "@/src/components/CamperCard/CamperCard";
import { useFilterStore } from "@/src/store/useFilterStore";

const EQUIPMENT = [
  { id: "AC", label: "AC", icon: "/icons/wind.svg" },
  { id: "automatic", label: "Automatic", icon: "/icons/auto.svg" },
  { id: "kitchen", label: "Kitchen", icon: "/icons/cup-hot.svg" },
  { id: "TV", label: "TV", icon: "/icons/tv.svg" },
  { id: "bathroom", label: "Bathroom", icon: "/icons/ph_shower.svg" },
];

const VEHICLE_TYPES = [
  { id: "van", label: "Van", icon: "/icons/bi_grid-1x2.svg" },
  {
    id: "fullyIntegrated",
    label: "Fully Integrated",
    icon: "/icons/bi_grid.svg",
  },
  { id: "alcove", label: "Alcove", icon: "/icons/bi_grid-3x3-gap.svg" },
];

export default function CatalogPage() {
  const {
    location,
    equipment,
    vehicleType,
    campers,
    isLoading,
    page,
    hasMore,

    setLocation,
    toggleEquipment,
    setVehicleType,

    fetchCampers,
    resetCampers,
    resetPage,
    nextPage,
  } = useFilterStore();

  useEffect(() => {
    fetchCampers({ page: 1, limit: 4 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildParams = (
    pageNumber: number,
  ): Record<string, string | number | boolean | undefined> => {
    const params: Record<string, string | number | boolean | undefined> = {
      page: pageNumber,
      limit: 4,
      location: location || undefined,
      form: vehicleType || undefined,
    };

    if (equipment.includes("AC")) params.AC = true;
    if (equipment.includes("kitchen")) params.kitchen = true;
    if (equipment.includes("TV")) params.TV = true;
    if (equipment.includes("bathroom")) params.bathroom = true;
    if (equipment.includes("automatic")) params.transmission = "automatic";

    return params;
  };

  const handleSearch = async () => {
    resetCampers();
    resetPage();
    await fetchCampers(buildParams(1));
  };

  const handleLoadMore = async () => {
    nextPage();
    await fetchCampers(buildParams(page + 1));
  };

  return (
    <main className={styles.catalogContainer}>
      <div className={styles.catalogLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <div className={styles.inputWrapper}>
              <Image
                src="/icons/map.svg"
                alt="Map"
                width={20}
                height={20}
                className={styles.mapIcon}
              />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City"
                className={styles.input}
              />
            </div>
          </div>
          <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
          <div className={styles.categoriesGrid}>
            {EQUIPMENT.map((item) => (
              <div
                key={item.id}
                className={`${styles.categoryItem} ${
                  equipment.includes(item.id) ? styles.active : ""
                }`}
                onClick={() => toggleEquipment(item.id)}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={32}
                  height={32}
                  style={{ height: "auto" }}
                />
                <p>{item.label}</p>
              </div>
            ))}
          </div>

          <h3 className={styles.sectionTitle}>Vehicle type</h3>
          <div className={styles.categoriesGrid}>
            {VEHICLE_TYPES.map((type) => (
              <div
                key={type.id}
                className={`${styles.categoryItem} ${
                  vehicleType === type.id ? styles.active : ""
                }`}
                onClick={() => setVehicleType(type.id)}
              >
                <Image
                  src={type.icon}
                  alt={type.label}
                  width={32}
                  height={32}
                  style={{ height: "auto" }}
                />
                <p>{type.label}</p>
              </div>
            ))}
          </div>

          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </aside>

        <section className={styles.content}>
          <div className={styles.list}>
            {Array.isArray(campers) &&
              campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
          </div>

          {isLoading && <p>Loading...</p>}

          {!isLoading && hasMore && campers.length > 0 && (
            <button onClick={handleLoadMore}>Load more</button>
          )}
        </section>
      </div>
    </main>
  );
}
