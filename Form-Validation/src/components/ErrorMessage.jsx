import styles from "./Form.module.css";

const ErrorMessage = ({ error }) => {

  if (!error) return null;

  return (
    <span className={styles.error}>
      {error}
    </span>
  );
};

export default ErrorMessage;