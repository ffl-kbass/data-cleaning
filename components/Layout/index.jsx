import styles from "./Home.module.css";

const Layout = ({ children, darkMode }) => {
  return (
    <section className={`${styles.layout} ${darkMode ? "dark" : ""}`}>
      {children}
    </section>
  );
};

export default Layout;
