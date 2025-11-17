
import Image from "next/image";
import styles from "./page.module.css";
import MainTop from "@/components/MainTop";
import SearchString from "@/components/search/SearchString";
import Catalog from "@/components/catalog/Catalog";

export default function Home() {
    
  return (
      <div className={styles.container}>
          <div className="main">
              <MainTop />
              <SearchString />
              <Catalog />
          </div>
          
      </div>
  );
}
