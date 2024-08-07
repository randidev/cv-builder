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
        className="block hover:translate-y-1 transition-all duration-200 w-fit"
        href={`${APP.LINKS.CANDIDATES.EDIT}/${candidate.id}`}>
        <PDFViewer width={"100%"} height={"200px"} showToolbar={false}>
          {template.type === "1" ? (
            <Template1 template={template} candidate={candidate} />
          ) : (
            <Template2 template={template} candidate={candidate} />
          )}
        </PDFViewer>
        <h3 className="mt-4">
          {candidate.firstName} {candidate.lastName}
        </h3>
      </Link>

      <PDFDownloadLink
        document={
          template.type === "1" ? (
            <Template1 template={template} candidate={candidate} />
          ) : (
            <Template2 template={template} candidate={candidate} />
          )
        }
        fileName={`${candidate.firstName}_${candidate.lastName}_CV.pdf`}
        className="button-gray w-full text-center mt-5">
        {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
      </PDFDownloadLink>

      <button
        onClick={(e) => handleDelete(e, candidate.id)}
        className="button-gray w-full text-center mt-5">
        Delete Candidate
      </button>
    </div>
  );

  return (
    <div className="container mx-auto py-5 lg:px-0 px-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-lg">My Candidates</h1>
        <Link className="button-gray block" href={APP.LINKS.CANDIDATES.CREATE}>
          Add New Candidate+
        </Link>
      </div>
      <div className="mt-6">
        {candidates.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {candidates.map((candidate) => {
              const selectedTemplate = templates.find(
                (t) => t.id === candidate.idTemplate
              );
              return (
                selectedTemplate && (
                  <CandidateItem
                    key={candidate.id}
                    candidate={candidate}
                    template={selectedTemplate}
                  />
                )
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
