import { useForm } from "ui-components";

import { DEFAULT_VALUES } from "./constants";
import { TaskFormModel, UseTaskFormReturn } from "./types";

const useTaskForm = (): UseTaskFormReturn => {
  const form = useForm<TaskFormModel>({
    defaultValues: DEFAULT_VALUES,
  });

  return { form };
};

export default useTaskForm;
