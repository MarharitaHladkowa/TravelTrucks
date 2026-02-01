"use client";

import { useState } from "react";
import styles from "../CamperDetails.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";

export function BookingForm() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      ...formData,
      date: startDate?.toLocaleDateString(),
    });
    alert("Booking successful! We will contact you soon.");

    setFormData({ name: "", email: "", date: "", comment: "" });
    setStartDate(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formText}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={styles.inputsContainer}>
        <input
          type="text"
          placeholder="Name*"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="Email*"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={styles.inputField}
        />
        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            placeholderText="Select a date between today"
            className={styles.inputField}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            required
          />
        </div>
        <textarea
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          className={styles.commentArea}
        ></textarea>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Send
      </button>
    </form>
  );
}
