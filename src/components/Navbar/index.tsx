import clsx from "clsx";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <div className="border-b border-gray-primary py-5">
        <div className="bg-white container mx-auto">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-xl">MANATAL - Resume Builder</h5>
            <nav>
              <ul className="flex items-center gap-5 text-sm">
                <li>
                  <a
                    href="templates"
                    className={clsx(
                      "block py-2 px-3 rounded-lg hover:bg-slate-200 transition-all ease-in-out duration-200",
                      {
                        "bg-slate-400 text-white":
                          pathname.indexOf("templates") >= 0,
                      }
                    )}>
                    Template Builder
                  </a>
                </li>
                <li>
                  <a
                    href="resume"
                    className={clsx(
                      "block py-2 px-3 rounded-lg hover:bg-slate-200 transition-all ease-in-out duration-200",
                      {
                        "bg-slate-400 text-white":
                          pathname.indexOf("resume") >= 0,
                      }
                    )}>
                    Resume Builder
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
