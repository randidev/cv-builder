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

        <footer className="flex items-center justify-center py-2 shadow-sm">
          <p className="text-sm">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/randidev"
              target="_blank"
              className="text-cyan-800 underline"
            >
              randidev
            </a>
          </p>
        </footer>

        <Toaster position="bottom-left" />
      </div>
    </>
  );
}
