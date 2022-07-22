import styles from "./Button.module.css";

const Button = (props) => {
  const { as } = props;

  const Tag = as ? as : "button";
  return (
    <Tag className={styles.button} {...props}>
      {props.children}
    </Tag>
  );
};

export default Button;
