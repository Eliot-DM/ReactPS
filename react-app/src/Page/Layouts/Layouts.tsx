import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import styles from "./Layouts.module.css";

interface LayoutsProps {}

export const Layouts = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      Layouts
    </>
  );
};
