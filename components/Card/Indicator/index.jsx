import { useState } from "react";
import styles from "./Indicator.module.css";

const Indicator = ({ children, cleared, edit = false, tooltip }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.activator}>
          {cleared ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <p>{children}</p>
        </div>
        {tooltip && <div className={styles.hover_container}>{tooltip}</div>}
      </div>
      {edit && (
        <div className="flex flex-row gap-1 py-0.5">
          <div className="grid flex-1 grid-cols-2 gap-1">
            <input className="flex flex-shrink rounded-md border bg-slate-50 px-1 text-sm" />
            <input className="flex flex-shrink rounded-md border bg-slate-50 px-1 text-sm" />
            {/* <input className="flex flex-shrink border bg-slate-50 rounded-md text-sm px-1"/> */}
          </div>
          <button className={styles.edit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Indicator;
