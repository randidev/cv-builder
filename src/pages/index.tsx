import APP from "@/config/app";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="h-body flex flex-col gap-5 items-center justify-center">
        <h1>Welcome Recruitment Agency!</h1>
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push(APP.LINKS.TEMPLATES.CREATE)}
            className="button-gray">
            Create Template+
          </button>
          <button
            onClick={() => router.push(APP.LINKS.CANDIDATES.CREATE)}
            className="button-gray">
            Create Resume+
          </button>
        </div>
      </div>
    </>
  );
}
