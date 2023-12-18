import Image from "next/image";
import { FC } from "react";
import { Paper, Text, COUNTRIES, Avatar } from "ui-components";

import { GeneralApplicantData } from "./types";
import { DEFAULT_DATE_FORMAT } from "../../../common/constants";
import { formatDate } from "../../../common/utils/date-utils";

export type CaseGeneralInfoStepProps = {
  generalApplicantData: GeneralApplicantData;
};

const CaseGeneralInfoStep: FC<CaseGeneralInfoStepProps> = ({
  generalApplicantData,
}) => (
  <div className="mt-3 flex h-full flex-col space-y-5 overflow-y-auto no-scrollbar p-3 bg-gray-100 rounded-3xl border-2 border-gray-100">
    <Paper animateUp title="Applicant">
      <div className="flex items-center space-between space-x-5 w-full">
        <div className="overflow-hidden rounded-3xl w-40 h-40 relative shadow-sm shadow-primary-300">
          <Image src="/images/jenny-wilson.jpeg" alt="applicant photo" fill />
        </div>
        <div className="flex flex-col h-full space-y-2 w-full">
          <Text>
            Full Name:{" "}
            {`${generalApplicantData.firstName} ${generalApplicantData.lastName}`}
          </Text>
          <Text>
            Birthday:{" "}
            {generalApplicantData.birthday &&
              formatDate(generalApplicantData.birthday, DEFAULT_DATE_FORMAT)}
          </Text>
          <Text>Email: {generalApplicantData.email}</Text>
          <Text>Phone number: {generalApplicantData.phone}</Text>
          <Text>
            Natinality:{" "}
            {
              COUNTRIES.find(
                (country) => generalApplicantData.nationality === country.value
              )?.label
            }
          </Text>
          <Text>Case ID: {generalApplicantData.caseName}</Text>
        </div>
      </div>
    </Paper>
    {generalApplicantData.familyMembers?.spouse && (
      <Paper animateUp title="Family Members">
        <div className="max-w-fit flex flex-wrap space-x-3">
          <Paper>
            <div className="flex items-center">
              <div className="flex h-full items-center justify-center space-x-2">
                <Avatar imageSrc="/images/jenny-wilson.jpeg" />
                <div className="flex flex-col h-full space-y-3">
                  <Text>
                    {`${generalApplicantData.familyMembers.spouse
                      .name!} ${generalApplicantData.familyMembers.spouse
                      .lastName!}`}{" "}
                    (Spouse)
                  </Text>
                  <Text>
                    Birthday:{" "}
                    {generalApplicantData.familyMembers.spouse.birthday &&
                      formatDate(
                        generalApplicantData.familyMembers.spouse.birthday,
                        DEFAULT_DATE_FORMAT
                      )}
                  </Text>
                </div>
              </div>
            </div>
          </Paper>
          {generalApplicantData.familyMembers.children?.map((child) => (
            <Paper key={child.name}>
              <div className="flex items-center">
                <div className="flex h-full items-center space-x-2">
                  <Avatar imageSrc="/images/jenny-wilson.jpeg" />
                  <div className="flex flex-col h-full space-y-2">
                    <Text>{`${child.name!} ${child.lastName!}`} (Child)</Text>
                    <Text>
                      Birthday:{" "}
                      {child.birthday &&
                        formatDate(child.birthday, DEFAULT_DATE_FORMAT)}
                    </Text>
                  </div>
                </div>
              </div>
            </Paper>
          )) ?? ""}
        </div>
      </Paper>
    )}
    {generalApplicantData.caseDescription && (
      <Paper animateUp title="Case Description">
        <Text>{generalApplicantData.caseDescription}</Text>
      </Paper>
    )}
  </div>
);

export default CaseGeneralInfoStep;
