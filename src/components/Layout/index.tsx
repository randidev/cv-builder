import { PropsWithChildren } from "react";
import Navbar from "../Navbar";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className={poppins.className}>
        <Navbar />

        <main>{children}</main>

        <Toaster position="bottom-left" />
      </div>
    </>
  );
}
