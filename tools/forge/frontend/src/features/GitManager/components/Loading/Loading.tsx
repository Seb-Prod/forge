import styles from "./Loading.module.css";

interface LoadingProps {
    label?:string;
}

export const Loading = ({label="Loading"}:LoadingProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinnerContainer}>
        <div className={styles.glow} />
        <div className={styles.ringOuter} />
        <div className={styles.ringMid} />
        <div className={styles.ringInner} />
        <div className={styles.dot} />
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};