"use client";

import { useEffect } from "react";
import { useCamperStore } from "../../store/useCamperStore";
import { getCampers } from "../../api/campers";
import styles from "./catalog.module.css";
import { CamperCard } from "@/src/components/CamperCard";
import { Camper } from "@/src/types/camper";

// Определяем интерфейс ответа, чтобы избежать 'any'
interface CampersResponse {
  items: Camper[];
  total: number;
}

export default function CatalogPage() {
  const { items, setItems, isLoading, setLoading, setError, error } =
    useCamperStore();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getCampers();

        // Проверяем структуру данных без использования 'any'
        if (Array.isArray(data)) {
          setItems(data);
        } else if (data && typeof data === "object" && "items" in data) {
          // Если API вернул объект { items: [], total: ... }
          setItems((data as CampersResponse).items);
        } else {
          setItems([]);
        }
      } catch (err) {
        // Используем переменную 'err' для логов, чтобы ESLint не ругался
        console.error("Ошибка при загрузке данных:", err);
        setError("Не вдалося завантажити список кемперів");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setItems, setLoading, setError]);

  // Loader обязателен по ТЗ при асинхронных запросах
  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <main className={styles.catalogContainer}>
      <div className={styles.catalogLayout}>
        {/* Боковая панель фильтров согласно макету */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <label className={styles.label}>Location</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Kyiv, Ukraine"
                className={styles.input}
              />
            </div>
          </div>

          <p className={styles.filterTitle}>Filters</p>

          <div className={styles.filterGroup}>
            <h3 className={styles.groupHeader}>Vehicle equipment</h3>
            <hr className={styles.divider} />
            <div className={styles.filterGrid}>
              <div className={styles.filterItem}>AC</div>
              <div className={styles.filterItem}>Automatic</div>
              <div className={styles.filterItem}>Kitchen</div>
              <div className={styles.filterItem}>TV</div>
              <div className={styles.filterItem}>Bathroom</div>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.groupHeader}>Vehicle type</h3>
            <hr className={styles.divider} />
            <div className={styles.filterGrid}>
              <div className={styles.filterItem}>Van</div>
              <div className={styles.filterItem}>Fully Integrated</div>
              <div className={styles.filterItem}>Alcove</div>
            </div>
          </div>

          <button
            className="button-primary"
            style={{ width: "173px", marginTop: "32px" }}
          >
            Search
          </button>
        </aside>

        {/* Секция со списком карточек */}
        <section className={styles.content}>
          {error ? (
            <div className={styles.error}>{error}</div>
          ) : items.length > 0 ? (
            <div className={styles.list}>
              {items.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </div>
          ) : (
            <div className={styles.notFound}>Кемперів не знайдено</div>
          )}

          {/* Кнопка Load More для пагинации на бэкенде */}
          {!isLoading && items.length > 0 && (
            <button className={styles.loadMoreBtn}>Load More</button>
          )}
        </section>
      </div>
    </main>
  );
}
