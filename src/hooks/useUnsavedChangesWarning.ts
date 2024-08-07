import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useUnsavedChangesWarning = (
  message: string = "Are you sure you want to leave?"
) => {
  const router = useRouter();
  const isRedirecting = useRef(false);

  useEffect(() => {
    const handleBeforeUnloadRouter = (url: string) => {
      if (isRedirecting.current) {
        // Skip if already redirecting
        return;
      }

      const passed = String(url).indexOf("?success") >= 0;
      if (!passed) {
        const userConfirmed = window.confirm(message);
        if (userConfirmed) {
          isRedirecting.current = true;
          window.location.href = url;
        } else {
          // Cancel the route change
          router.events.emit("routeChangeError");
          throw "routeChange aborted by user"; // This is necessary to prevent the route change
        }
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isRedirecting.current) {
        // Skip if already redirecting
        return;
      }

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
  }, [message, router, isRedirecting]);

  return null; // Ensure the hook doesn't render anything
};

export default useUnsavedChangesWarning;
