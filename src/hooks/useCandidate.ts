import { selectors, actions } from "@/redux/candidate";
import {
  selectors as templateSelectors,
  actions as templateActions,
} from "@/redux/templates";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";
import { useCallback, useEffect, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import APP from "@/config/app";
import { initialTempState } from "@/redux/candidate/slices";

export default function useCandidate(id?: string | string[] | undefined) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const temporaryCandidate = useAppSelector(selectors.candidateTemporary);
  const candidates = useAppSelector(selectors.candidate);
  const templates = useAppSelector(templateSelectors.templates);
  const toastId = useRef<null | string>(null);

  const candidate = useMemo(() => {
    return candidates.find((c) => c.id === id) as CandidateItem;
  }, [id, candidates]);

  const selectedTemplate = useMemo(() => {
    return templates.find(
      (t) => t.id === temporaryCandidate.idTemplate
    ) as Template;
  }, [temporaryCandidate, templates]);

  useEffect(() => {
    if (candidate) {
      dispatch(actions.setTempCandidateAction(candidate));
    }
  }, [candidate, dispatch]);

  useEffect(() => {
    if (selectedTemplate) {
      dispatch(templateActions.setTempTemplateAction(selectedTemplate));
    }
  }, [selectedTemplate, dispatch]);

  const handleSubmit = useCallback(() => {
    toastId.current = toast.loading("Loading...");
    try {
      if (
        !temporaryCandidate.idTemplate ||
        temporaryCandidate.idTemplate === ""
      ) {
        // template is required at least
        throw "Please choose resume template first.";
      }
      if (
        !temporaryCandidate.firstName ||
        temporaryCandidate.firstName === ""
      ) {
        // first name is required at least
        throw "Please fill the candidate's detail.";
      }

      const uuid = uuidv4();

      if (id) {
        const newCandidate = { ...temporaryCandidate };
        dispatch(actions.editCandidateAction(newCandidate));
        toast.success("Successfully edit candidate's detail.", {
          id: toastId.current,
        });
        toastId.current = null;
      } else {
        const newTemplate = { ...temporaryCandidate, id: uuid };
        dispatch(actions.addNewCandidateAction(newTemplate));
        toast.success("Successfully adding new candidate.", {
          id: toastId.current,
        });
        toastId.current = null;
      }
      dispatch(actions.setTempCandidateAction(initialTempState.detail));

      setTimeout(() => {
        router.push(APP.LINKS.CANDIDATES.DEFAULT + "?success");
      }, 1000);
    } catch (error: any) {
      console.error(error);
      toast.error(error, {
        id: toastId.current ?? "",
      });
      toastId.current = null;
    }
  }, [dispatch, temporaryCandidate, router, id]);

  const handleChange = useCallback(
    (key: keyof CandidateItem, value: string) => {
      const currCandidate = { ...temporaryCandidate, [key]: value };
      dispatch(actions.setTempCandidateAction(currCandidate));
    },
    [dispatch, temporaryCandidate]
  );

  return {
    templates,
    selectedTemplate,
    temporaryCandidate,
    candidate,
    handleChange,
    handleSubmit,
  };
}
