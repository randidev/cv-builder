import { useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { actions, selectors } from "@/redux/templates";
import { v4 as uuidv4 } from "uuid";
import APP from "@/config/app";

const useTemplate = (id?: string | string[] | undefined) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toastId = useRef<null | string>(null);
  const templates = useAppSelector(selectors.templates);
  const tempTemplate = useAppSelector(selectors.templateTemporary);

  const template = useMemo(() => {
    return templates.find((t) => t.id === id) as Template;
  }, [id, templates]);

  useEffect(() => {
    if (template) {
      dispatch(actions.setTempTemplateAction(template));
    }
  }, [template, dispatch]);

  const handleSubmit = useCallback(() => {
    toastId.current = toast.loading("Loading...");
    try {
      const uuid = uuidv4();

      if (id) {
        const newTemplate = { ...tempTemplate };
        dispatch(actions.editTemplateAction(newTemplate));
        toast.success("Successfully edit template's detail.", {
          id: toastId.current,
        });
      } else {
        const newTemplate = { ...tempTemplate, id: uuid };
        dispatch(actions.addNewTemplateAction(newTemplate));
        toast.success("Successfully adding new template.", {
          id: toastId.current,
        });
      }

      setTimeout(() => {
        router.push(APP.LINKS.TEMPLATES.DEFAULT + "?success");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later.", {
        id: toastId.current,
      });
    }
  }, [dispatch, tempTemplate, router, id]);

  const handleChange = useCallback(
    (key: keyof Template, value: string) => {
      const currTemplate = { ...tempTemplate, [key]: value };
      dispatch(actions.setTempTemplateAction(currTemplate));
    },
    [dispatch, tempTemplate]
  );

  return {
    template,
    tempTemplate,
    handleSubmit,
    handleChange,
  };
};

export default useTemplate;
