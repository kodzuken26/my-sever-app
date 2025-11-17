import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});


export const metadata = {
  title: "Северяночка",
  description: "Онлайн-каталог",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${montserrat.variable} font-sans`}>
            <Header/>
              {children}
              <Footer/>
      </body>
    </html>
  );
}
