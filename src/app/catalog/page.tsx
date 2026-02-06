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
  { id: "panelTruck", label: "Van", icon: "/icons/bi_grid-1x2.svg" },
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
    getFilterParams,
    searchCampers,
    nextPage,
  } = useFilterStore();

  useEffect(() => {
    if (campers.length === 0) {
      const params = getFilterParams(1);
      fetchCampers(params);
    }
  }, []);

  const handleSearch = async () => {
    await searchCampers();
  };

  const handleLoadMore = async () => {
    const nextP = page + 1;
    nextPage();
    const params = getFilterParams(nextP);
    await fetchCampers(params);
  };

  return (
    <main className={styles.catalogContainer}>
      <div className={styles.catalogLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <div className={styles.inputWrapper}>
              <Image
                src="/icons/map.svg"
                alt="Map"
                width={20}
                height={20}
                className={styles.mapIcon}
              />
              <input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City"
                className={styles.input}
              />
            </div>
          </div>

          <p className={styles.filterTitle}>Filters</p>
          <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
          <ul className={styles.categoriesGrid}>
            {EQUIPMENT.map((item) => (
              <li
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
              </li>
            ))}
          </ul>

          <h3 className={styles.sectionTitle}>Vehicle type</h3>
          <ul className={styles.categoriesGrid}>
            {VEHICLE_TYPES.map((type) => (
              <li
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
              </li>
            ))}
          </ul>

          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </aside>

        <section className={styles.content}>
          <ul className={styles.list}>
            {Array.isArray(campers) &&
              campers.map((camper) => (
                <li key={camper.id}>
                  <CamperCard camper={camper} />
                </li>
              ))}
          </ul>

          {isLoading && <p className={styles.loading}>Loading...</p>}

          {!isLoading && campers.length === 0 && (
            <p className={styles.emptyText}>Nothing found</p>
          )}

          {!isLoading && hasMore && campers.length > 0 && (
            <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
              Load more
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
