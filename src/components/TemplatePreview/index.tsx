import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import useDebounceState from "@/hooks/useDebounceState";
import { useEffect, useMemo, useRef } from "react";
import { Template1, Template2 } from "../PDFTemplates";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import useAppDispatch from "@/hooks/useAppDispatch";
import { utilsActions } from "@/redux/utils/slices";

interface TemplatePreviewProps {
  template: Template;
  candidate: Candidate;
}

export default function TemplatePreview({
  template,
  candidate,
}: TemplatePreviewProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: debouncedTemplate, loading } = useDebounceState(template, 1000);
  const { data: debouncedCandidate, loading: loadingCandidate } =
    useDebounceState(candidate, 1000);
  const toastId = useRef<null | string>(null);

  const PDFPreview = useMemo(() => {
    if (debouncedTemplate) {
      const Template = debouncedTemplate.type === "1" ? Template1 : Template2;
      return (
        <PDFViewer width="100%" height="100%" showToolbar={false}>
          <Template template={debouncedTemplate} candidate={candidate} />
        </PDFViewer>
      );
    }
    return null;
  }, [debouncedTemplate, debouncedCandidate]);

  const PDFDownloadButton = useMemo(() => {
    if (debouncedTemplate) {
      const Template = debouncedTemplate.type === "1" ? Template1 : Template2;
      return (
        <PDFDownloadLink
          document={
            <Template template={debouncedTemplate} candidate={candidate} />
          }
          fileName={`${candidate?.firstName}_${candidate?.lastName}_CV.pdf`}
          className="border border-black bg-gray-primary text-black py-2 px-4 rounded-full">
          {({ blob, url, loading }) =>
            loading ? "Generating PDF..." : "Download PDF"
          }
        </PDFDownloadLink>
      );
    }
    return null;
  }, [debouncedTemplate]);

  useEffect(() => {
    if (
      ((loading !== null && !loading) ||
        (loadingCandidate !== null && !loadingCandidate)) &&
      toastId.current == null
    ) {
      toastId.current = toast.loading("Loading...");
    } else {
      if (toastId.current !== null) {
        toast.success("Preview updated.", {
          id: toastId.current,
        });
        toastId.current = null;
      }
    }
  }, [loading, loadingCandidate]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (toastId.current) {
        toast.success("Preview updated.", { id: toastId.current });
        toastId.current = null;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleBeforeUnload);
    };
  }, [router.events]);

  return (
    <div className="bg-dot relative bg-repeat bg-left-top bg-fixed w-full lg:w-[calc(100%-600px)]">
      <div className="p-10 h-full">
        <div className="bg-white shadow-lg h-full flex justify-center items-center">
          {!template || !debouncedTemplate ? (
            <>
              <p>Please choose the resume template first.</p>
              <button
                onClick={() =>
                  dispatch(utilsActions.setUtils({ showEditor: true }))
                }
                className="border absolute bottom-5 border-black bg-gray-primary text-black py-2 px-4 rounded-full">
                Editor
              </button>
            </>
          ) : (
            <>
              {PDFPreview}
              <div className="flex justify-center items-center gap-5 absolute bottom-5">
                {PDFDownloadButton}
                <div className="block lg:hidden">
                  <button
                    onClick={() =>
                      dispatch(utilsActions.setUtils({ showEditor: true }))
                    }
                    className="border border-black bg-gray-primary text-black py-2 px-4 rounded-full">
                    Editor
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
