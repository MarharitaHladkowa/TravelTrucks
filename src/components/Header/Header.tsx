"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css"; // Импорт модуля

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Travel<span style={{ color: "#475467" }}>Trucks</span>
      </Link>

      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === "/" ? styles.activeLink : ""}`}
        >
          Home
        </Link>
        <Link
          href="/catalog"
          className={`${styles.link} ${pathname === "/catalog" ? styles.activeLink : ""}`}
        >
          Catalog
        </Link>
      </nav>
      <div style={{ width: "150px" }}></div>
    </header>
  );
};
