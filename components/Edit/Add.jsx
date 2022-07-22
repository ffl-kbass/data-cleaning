import styles from "./Edit.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { SelectedContext } from "../../Context/context";
import { useToastContext, ADD, REMOVE_ALL } from "../../Context/ToastContext";

const Add = () => {
  const { toastDispatch } = useToastContext();

  return (
    <motion.div
      initial={{ opacity: 0, height: "1rem" }}
      animate={{ opacity: 1, height: "auto" }}
      className="fixed bottom-52 z-40 h-64 min-w-[24rem] max-w-3xl overflow-hidden rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
    >
      <div className="flex w-full flex-col flex-wrap gap-4">
        <label className={styles.input_container}>
          <p className={styles.title}>Purpose</p>
          <input type="text" />
        </label>
        <label className={styles.input_container}>
          <p className={styles.title}>Download Speed (Mbps)</p>
          <input type="text" />
        </label>
        <label className={styles.input_container}>
          <p className={styles.title}>Shared</p>
          <input type="checkbox" />
        </label>
        <label className={styles.input_container}>
          <p className={styles.title}>Quantity</p>
          <input type="text" />
        </label>
        <label className={styles.input_container}>
          <p className={styles.title}>Lines Allocated</p>
          <input type="text" />
        </label>
        <label className={styles.input_container}>
          <p className={styles.title}>Monthly Elig Recurring</p>
          <input type="text" />
        </label>
        <label className={styles.input_container}>
          <p className={styles.title}>Total Elig Non-Recurring</p>
          <input type="text" />
        </label>
        <label className={styles.input_container}>
          <p className={styles.title}>Months of Service</p>
          <input type="text" />
        </label>
        <label className={styles.input_container}>
          <p className={styles.title}>Contract End Date</p>
          <input type="text" />
        </label>
        <button
          className="h-10 w-full rounded-md bg-blue-500 text-center font-semibold text-white hover:bg-blue-600"
          onClick={() =>
            toastDispatch({
              type: ADD,
              payload: {
                content: { success: "Success", message: "Sucessfully Added" },
                type: "success",
              },
            })
          }
        >
          Add
        </button>
      </div>
    </motion.div>
  );
};

export default Add;
