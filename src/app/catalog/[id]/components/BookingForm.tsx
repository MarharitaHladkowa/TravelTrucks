"use client";

import { useState } from "react";
import styles from "../CamperDetails.module.css";

export function BookingForm() {
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking successful!");
  };

  return (
    <form className={styles.form}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formText}>
        Stay connected! We are always ready to help you.
      </p>

      <input
        type="text"
        placeholder="Name*"
        required
        className={styles.input}
      />
      <input
        type="email"
        placeholder="Email*"
        required
        className={styles.input}
      />

      {/* Поле даты делаем текстовым для кастомной стилизации, как в макете */}
      <div className={styles.dateWrapper}>
        <input
          type="text"
          placeholder="Booking date*"
          onFocus={(e) => (e.target.type = "date")} // Превращается в календарь при клике
          onBlur={(e) => (e.target.type = "text")}
          required
          className={styles.input}
        />
      </div>

      <textarea placeholder="Comment" className={styles.textarea}></textarea>

      <button type="submit" className={styles.submitBtn}>
        Send
      </button>
    </form>
  );
}
