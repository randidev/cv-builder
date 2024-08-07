import { Template1, Template2 } from "@/components/PDFTemplates";
import { dummyCandidate } from "@/dummy/candidate";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { actions, selectors } from "@/redux/templates";
import {
  actions as candidateActions,
  selectors as candidateSelectors,
} from "@/redux/candidate";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Link from "next/link";
import APP from "@/config/app";
import { MouseEvent } from "react";

interface CandidateProps {
  candidate: Candidate;
  template: Template;
}

export default function ResumeList() {
  const dispatch = useAppDispatch();
  const templates = useAppSelector(selectors.templates);
  const candidates = useAppSelector(candidateSelectors.candidate);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    const candidate = candidates.find((c) => c.id === id);
    if (
      candidate &&
      confirm("Are you sure you want to delete this candidate?")
    ) {
      dispatch(candidateActions.removeCandidateAction(candidate));
    }
  };

  const CandidateItem = ({ candidate, template }: CandidateProps) => (
    <div key={candidate.id} className="flex flex-col">
      <Link
        className="block w-fit transition-all duration-200 hover:translate-y-1"
        href={`${APP.LINKS.CANDIDATES.EDIT}/${candidate.id}`}
      >
        {template ? (
          <PDFViewer width={"100%"} height={"200px"} showToolbar={false}>
            {template.type === "1" ? (
              <Template1 template={template} candidate={candidate} />
            ) : (
              <Template2 template={template} candidate={candidate} />
            )}
          </PDFViewer>
        ) : (
          <span>Template not found or has been deleted.</span>
        )}
        <h3 className="mt-4">
          {candidate.firstName} {candidate.lastName}
        </h3>
      </Link>

      {template && (
        <PDFDownloadLink
          document={
            template.type === "1" ? (
              <Template1 template={template} candidate={candidate} />
            ) : (
              <Template2 template={template} candidate={candidate} />
            )
          }
          fileName={`${candidate.firstName}_${candidate.lastName}_CV.pdf`}
          className="button-gray mt-5 w-full text-center"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      )}

      <button
        onClick={(e) => handleDelete(e, candidate.id)}
        className="button-gray mt-5 w-full text-center"
      >
        Delete Candidate
      </button>
    </div>
  );

  return (
    <div className="container mx-auto min-h-bodyMobile px-5 py-5 sm:min-h-body lg:px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">My Candidates</h1>
        <Link className="button-gray block" href={APP.LINKS.CANDIDATES.CREATE}>
          Add New Candidate+
        </Link>
      </div>
      <div className="mt-6">
        {candidates.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {candidates.map((candidate) => {
              const selectedTemplate = templates.find(
                (t) => t.id === candidate.idTemplate,
              );
              return (
                <CandidateItem
                  key={candidate.id}
                  candidate={candidate}
                  template={selectedTemplate as Template}
                />
              );
            })}
          </div>
        ) : (
          <p>
            No candidates found.{" "}
            <Link href={APP.LINKS.CANDIDATES.CREATE} className="underline">
              Add
            </Link>{" "}
            new candidate.
          </p>
        )}
      </div>
    </div>
  );
}
