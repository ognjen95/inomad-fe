import clsx from "clsx";
import { FC } from "react";
import {
  Button,
  Text,
  IconType,
  TextVariant,
  IconButton,
  DropdownMenu,
  EmptyList,
} from "ui-components";
import { ButtonColor } from "ui-components/src/button/enums";

import SearchInput from "../../../components/search/SearchInput";
import TemplateCard from "../components/TemplateCard";
import { Template } from "../types";

export type TemplatesListProps = {
  templates: Template[];
  selectedCaseId: string | null;
  setSelectedCaseId: () => void;
  assignTemplate: (id: string) => void;
  assignLoading: boolean;
  templateId: string | null;
  isEmptyList: boolean;
  setTemplateId: (id: string) => void;
};

const TemplatesList: FC<TemplatesListProps> = ({
  templates,
  selectedCaseId,
  setSelectedCaseId,
  assignTemplate,
  assignLoading,
  templateId,
  isEmptyList,
  setTemplateId,
}) => (
  <div className="flex flex-wrap px-2">
    <div className="w-full flex justify-between items-center space-x-5 pb-3">
      <div className="pl-5">
        <Text variant={TextVariant.HEADING5}>Template list</Text>
      </div>
      <div className="flex justify-between items-center space-x-5">
        {selectedCaseId && (
          <Button onClick={setSelectedCaseId} color={ButtonColor.RED}>
            Clear
          </Button>
        )}
        <SearchInput placeholder="Search templates..." />
      </div>
    </div>
    {templates?.map((template) => (
      <div
        key={template.id}
        className={clsx("w-1/3 p-2", {
          "opacity-40": !!templateId,
        })}
      >
        <TemplateCard
          name={template.name}
          questionGroupCount={template.questionGroupIds.length}
          actions={
            selectedCaseId ? (
              <div className="bg-green-400 cursor-pointer hover:bg-green-300 rounded-xl">
                <IconButton
                  iconProps={{
                    type: IconType.FOLDER_ADD,
                    fill: "none",
                    stroke: "white",
                  }}
                  onClick={() => {
                    assignTemplate(template.id);
                  }}
                  loading={assignLoading}
                />
              </div>
            ) : (
              <DropdownMenu
                isIconButton
                iconType={IconType.MORE_VERTICAL}
                items={[
                  {
                    iconType: IconType.FOLDER_ADD,
                    iconFill: "none",
                    label: "Assign to case",
                    onClick: () => {
                      setTemplateId(template.id);
                    },
                  },
                ]}
              />
            )
          }
        />
      </div>
    ))}
    {isEmptyList && (
      <EmptyList
        url="/images/empty-file.png"
        title="No question groups found"
        description="Click on elements on the right side and build your form"
      />
    )}
  </div>
);

export default TemplatesList;
