import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LoginForm from "../components/loginForm/LoginForm";
import homePic from "../public/images/trainpichomepage.jpeg";

export default function Home() {
  return (
    <>
      <div className={styles["outer-container"]}>
        <Image src={homePic} height="960px" width="1860px" />
        <div className={styles["login-cont"]}>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
