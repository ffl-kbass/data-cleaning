import styles from "./Edit.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { SelectedContext } from "../../Context/context";
import { useToastContext, ADD, REMOVE_ALL } from "../../Context/ToastContext";

const Edit = () => {
  const { toastDispatch } = useToastContext();

  return (
    <motion.div
      initial={{ opacity: 0, height: "1rem" }}
      animate={{ opacity: 1, height: "auto" }}
      className="z-40 fixed overflow-hidden h-64 max-w-3xl min-w-[24rem] bottom-52 p-2 rounded-md bg-slate-800 border border-slate-700 text-white"
    >
      <div className="flex flex-col gap-4 w-full flex-wrap">
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
        <button className="w-full h-10 rounded-md bg-blue-500 text-white font-semibold text-center hover:bg-blue-600">
          Save
        </button>
      </div>
    </motion.div>
  );
};

export default Edit;
