"use client";

import { useForm, Controller } from "react-hook-form";
import styles from "../CamperDetails.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import toast from "react-hot-toast";

type BookingData = {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
};

export function BookingForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }, // Достаем объект с ошибками
  } = useForm<BookingData>({
    defaultValues: {
      name: "",
      email: "",
      bookingDate: null,
      comment: "",
    },
  });

  const onSubmit = (data: BookingData) => {
    toast.success("Booking successful!");
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formText}>Stay connected!</p>

      <div className={styles.inputsContainer}>
        <div className={styles.inputWrapper}>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name*"
            className={`${styles.inputField} ${errors.name ? styles.inputError : ""}`}
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name.message}</span>
          )}
        </div>

        {/* Поле Email */}
        <div className={styles.inputWrapper}>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            type="email"
            placeholder="Email*"
            className={`${styles.inputField} ${errors.email ? styles.inputError : ""}`}
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email.message}</span>
          )}
        </div>

        {/* Поле Дата */}
        <div className={styles.inputWrapper}>
          <div className={styles.datePickerWrapper}>
            <Controller
              control={control}
              name="bookingDate"
              rules={{ required: "Please select a date" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date | null) => field.onChange(date)}
                  placeholderText="Booking date*"
                  className={`${styles.inputField} ${errors.bookingDate ? styles.inputError : ""}`}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
              )}
            />
          </div>
          {errors.bookingDate && (
            <span className={styles.errorText}>
              {errors.bookingDate.message}
            </span>
          )}
        </div>

        {/* Комментарий */}
        <textarea
          {...register("comment")}
          placeholder="Comment"
          className={styles.commentArea}
        ></textarea>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Send
      </button>
    </form>
  );
}
