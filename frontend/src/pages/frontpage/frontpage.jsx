//? Styles -----------------------------------------------------
import styles from "./frontpage.module.css";

//? Frontpage --------------------------------------------------
export default function Frontpage() {
  return (
    <section className={styles.frontpage}>
      <a href="/login">
        <button className={styles.log}>Log in</button>
      </a>
      <a href="#">
        <button className={styles.sign}>Sign up</button>
      </a>
    </section>
  );
}
