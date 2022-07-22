import { useEffect, useState, useRef } from "react";
import styles from "./Expand.module.css";

const Expand = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [expandable, setExpandable] = useState(true);
  const paragraph = useRef(null);

  useEffect(() => {
    if (paragraph.current.offsetHeight / 16 <= 3) {
      setExpandable(false);
    }
  }, []);
  return (
    <div
      className={`${styles.container} ${
        open || !expandable ? styles.open : styles.closed
      }`}
    >
      <p ref={paragraph}>{children}</p>
      {expandable && (
        <>
          <button className={styles.more} onClick={() => setOpen(!open)}>
            {!open ? "More" : "Less"}
          </button>
          <div className={styles.gradient}></div>
        </>
      )}
    </div>
  );
};

export default Expand;
