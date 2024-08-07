import APP from "@/config/app";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="flex h-bodyMobile flex-col items-center justify-center gap-5 sm:h-body">
        <h1>Welcome Recruitment Agency!</h1>
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push(APP.LINKS.TEMPLATES.CREATE)}
            className="button-gray"
          >
            Create Template+
          </button>
          <button
            onClick={() => router.push(APP.LINKS.CANDIDATES.CREATE)}
            className="button-gray"
          >
            Create Resume+
          </button>
        </div>
      </div>
    </>
  );
}
