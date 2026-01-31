import styles from "../CamperDetails.module.css";

export function Reviews({ reviews }: { reviews: any[] }) {
  return (
    <ul className={styles.reviews}>
      {reviews.map((r, idx) => (
        <li key={idx} className={styles.reviewItem}>
          <div className={styles.avatar}>{r.reviewer_name[0]}</div>

          <div>
            <p className={styles.reviewName}>{r.reviewer_name}</p>

            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < r.reviewer_rating ? styles.starActive : styles.star
                  }
                >
                  ★
                </span>
              ))}
            </div>

            <p>{r.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
