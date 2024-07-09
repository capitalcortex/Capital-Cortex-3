import "@/styles/globals.css";
import "@/styles/breadCrumbNav.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import NiceModal from "@ebay/nice-modal-react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Wrapper from "@/components/Wrapper";
import { useState } from "react";
import { Inter } from 'next/font/google'
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'swiper/css';
import 'swiper/css/pagination';
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-theme",
});
const inter = Inter({ subsets: ['latin'], variable: "--font-inter" })
export default function App({ Component, pageProps }: AppProps) {
  const [layout, setLayout] = useState(false);
  return (
    <div className={`wrapper ${inter.variable} ${jakarta.variable}`}>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        <Provider store={store}>
          <NiceModal.Provider>
            <Wrapper setLayout={setLayout}>
              <style jsx global>{`* {font-family: ${jakarta.style.fontFamily};}`}</style>
              <Component {...pageProps} />
            </Wrapper>
          </NiceModal.Provider>
        </Provider>
      </GoogleOAuthProvider>
    </div>
  );
}
