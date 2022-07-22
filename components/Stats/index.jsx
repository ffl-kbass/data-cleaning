import styles from "./Stat.module.css";

const Stat = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h4>{title}</h4>
      </div>
      <div className={styles.stats}>{children}</div>
    </div>
  );
};

export default Stat;
