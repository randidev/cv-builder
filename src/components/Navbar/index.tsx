import APP from "@/config/app";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const { pathname } = useRouter();

  const navItems = [
    {
      href: APP.LINKS.TEMPLATES.DEFAULT,
      label: "Template Builder",
      active: pathname.includes("templates"),
    },
    {
      href: APP.LINKS.CANDIDATES.DEFAULT,
      label: "Candidates List",
      active: pathname.includes("candidates"),
    },
  ];

  return (
    <div className="border-b border-gray-primary py-5">
      <div className="container mx-auto bg-white sm:px-5 2xl:px-0">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <Link href="/">
            <h5 className="text-xl font-bold">App - Resume Builder</h5>
          </Link>
          <nav>
            <ul className="flex items-center gap-5 text-sm">
              {navItems.map(({ href, label, active }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={clsx(
                      "block rounded-lg px-3 py-2 transition-all duration-200 ease-in-out hover:bg-slate-200",
                      {
                        "bg-slate-400 text-white": active,
                      },
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
