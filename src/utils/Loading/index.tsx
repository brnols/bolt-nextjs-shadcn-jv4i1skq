import styles from "./index.module.css";

type LoadingProps = {
    variant?: "background" | "foreground";
};

export default function Loading({ variant = "foreground" }: LoadingProps) {
    return <div className={`${styles.loader} ${variant}`}></div>;
}
