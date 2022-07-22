import React, { useEffect } from "react";
import { useToastContext, REMOVE } from "../../Context/ToastContext";
import { motion } from "framer-motion";
import styles from "./Toast.module.css";

const Toast = () => {
  const { toast, toastDispatch } = useToastContext();

  return (
    <div className={styles.container}>
      <div className={styles.toasts}>
        {toast.reverse().map((t, index) => {
          return (
            <motion.div
              style={{ zIndex: toast.length - index }}
              className={`${styles.toast} ${t.type ? styles[t.type] : ""}`}
              initial={{ translateX: 15 }}
              animate={{ translateX: 0 }}
              key={t.id}
            >
              <span
                role="img"
                aria-label="close toast"
                className={styles.close}
                onClick={() =>
                  toastDispatch({ type: REMOVE, payload: { id: t.id } })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <div className="flex flex-col">
                <p className="w-full truncate text-xs font-semibold">
                  {t.content.success}
                </p>
                <p className="w-full">{t.content.message}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Toast;
