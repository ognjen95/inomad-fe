import { FCWithChildren } from "ui-components";

export type FormContainerProps = {
  title?: string;
};

const FormContainer: FCWithChildren = ({ children }) => (
  <div className="px-2 m-auto h-0 overflow-y-auto space-y-5 flex-grow w-full">
    <div className="m-auto max-w-[650px] flex flex-col space-y-5">
      {children}
    </div>
  </div>
);

export default FormContainer;
