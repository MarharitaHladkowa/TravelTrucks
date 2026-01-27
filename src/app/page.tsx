import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      {/* Контейнер не используем, так как отступы заданы в .content для точности по Figma */}
      <div className={styles.content}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className="button-primary">
          View Now
        </Link>
      </div>
    </main>
  );
}
