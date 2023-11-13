import { useToastContext } from "context/toast/ToastContext";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import {
  DatePickerField,
  Form,
  IconType,
  InputField,
  InputType,
  Modal,
} from "ui-components";
import { colors } from "ui-components/src/config/tailwind-config";

import { useCreateCaseProposalMutation } from "~graphql-api";

export type CreateCaseProposalModalProps = {
  name: string;
  isOpen: boolean;
  close: () => void;
  caseId: string;
};

const CreateCaseProposalModal: FC<CreateCaseProposalModalProps> = ({
  name,
  isOpen,
  close,
  caseId,
}) => {
  type ProposalFormModel = {
    deadline: Date;
    price: number;
  };

  const DEFAULT_VALUES: ProposalFormModel = {
    deadline: new Date(),
    price: 0,
  };

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const [sendProposal, { loading }] = useCreateCaseProposalMutation();

  const { success } = useToastContext();

  const onSubmit = (data: ProposalFormModel) => {
    const { deadline, price } = data;

    sendProposal({
      onCompleted: () => {
        success("Proposal sent successfully");
        close();
        form.reset();
      },
      variables: {
        caseId,
        deadline,
        price,
      },
    });
  };

  return (
    <Modal
      formName="create-case-proposal"
      modalIcon={{
        type: IconType.INFO,
        fill: "none",
        stroke: colors.primary[500],
      }}
      title="SEND PROPOSAL"
      description="Are you sure you want to send a proposal for case"
      boldedEndOfDescription={`${name} ?`}
      isOpen={isOpen}
      close={close}
      onConfirm={form.handleSubmit(onSubmit)}
      confirmButtonLoading={loading}
    >
      <div className="flex flex-col w-96">
        <Form<ProposalFormModel> form={form} formName="create-case-proposal">
          {({ control }) => (
            <div className="space-y-5">
              <DatePickerField
                control={control}
                fieldName="deadline"
                label="Estimated deadline"
                minDate={new Date()}
              />
              <InputField
                label="Estimated Total Cost"
                fieldName="price"
                control={control}
                type={InputType.NUMBER}
              />
            </div>
          )}
        </Form>
      </div>
    </Modal>
  );
};

export default CreateCaseProposalModal;
