import styles from "./footer.module.scss";
import packageJson from "../../../package.json";

export function Footer() {
  const appVersion = packageJson.version;

  return (
    <footer className={styles.container}>
      <ul className={styles.linkList}>
        <li>
          <a className={styles.anchor} href="#">
            Docs
          </a>
        </li>
        <li>
          <a className={styles.anchor} href="#">
            API
          </a>
        </li>
        <li>
          <a className={styles.anchor} href="#">
            Help
          </a>
        </li>
        <li>
          <a className={styles.anchor} href="#">
            Community
          </a>
        </li>
      </ul>
      <div className={styles.logoWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-small.svg" alt="logo" />
      </div>
      <p className={styles.appVersion}>Version: {appVersion}</p>
    </footer>
  );
}
