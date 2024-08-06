import { PDFViewer } from "@react-pdf/renderer";
import useAppSelector from "@/hooks/useAppSelector";
import { selectors } from "@/redux/templates";
import useDebounceState from "@/hooks/useDebounceState";
import { useEffect, useMemo, useRef } from "react";
import { dummyCandidate } from "@/dummy/candidate";
import { Template1, Template2 } from "../PDFTemplates";
import toast from "react-hot-toast";

interface TemplatePreviewProps {
  template: Template;
}

export default function TemplatePreview({ template }: TemplatePreviewProps) {
  const { data: debouncedTemplate, loading } = useDebounceState(template, 1000);
  const toastId = useRef<null | string>(null);

  const PDFPreview = useMemo(
    () => (
      <PDFViewer width={"100%"} height={"100%"} showToolbar={false}>
        {debouncedTemplate.type === "1" ? (
          <Template1 template={debouncedTemplate} candidate={dummyCandidate} />
        ) : (
          <Template2 template={debouncedTemplate} candidate={dummyCandidate} />
        )}
      </PDFViewer>
    ),
    [debouncedTemplate]
  );

  useEffect(() => {
    if (loading !== null && !loading) {
      toastId.current = toast.loading("Loading...");
    } else {
      if (toastId.current !== null) {
        toast.success("Preview updated.", {
          id: toastId.current,
        });
        toastId.current = null;
      }
    }
  }, [loading]);

  if (!template || !debouncedTemplate) {
    return (
      <>
        <div>Template not found.</div>
      </>
    );
  }

  return (
    <>
      <div className="bg-dot bg-repeat bg-left-top bg-fixed w-full md:w-[calc(100%-600px)]">
        <div className="p-10 h-full">
          <div className="bg-white shadow-lg h-full">{PDFPreview}</div>
        </div>
      </div>
    </>
  );
}
