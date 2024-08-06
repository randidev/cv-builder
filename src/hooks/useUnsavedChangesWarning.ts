import { useRouter } from "next/router";
import { useEffect } from "react";

const useUnsavedChangesWarning = (
  message: string = "You have unsaved changes. Are you sure you want to leave?"
) => {
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnloadRouter = (e: string) => {
      const passed = String(e).indexOf("?success") >= 0;

      console.log(e);

      if (!passed && !confirm(message)) {
        router.events.emit("routeChangeError");
        throw "Route change aborted due to unsaved changes";
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      console.log(e);
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleBeforeUnloadRouter);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleBeforeUnloadRouter);
    };
  }, [message]);
};

export default useUnsavedChangesWarning;
