import clsx from 'clsx';
import { FC } from 'react'
import { TextVariant, Text, Input, IconPlacement, IconType, Paper, Tooltip, Icon } from 'ui-components';
import { colors } from 'ui-components/src/config/tailwind-config';
import { TooltipPlacement } from 'ui-components/src/tooltip';
import { CaseListModel } from '../../cases/case-list/types';

export type CaseListForAssignmentProps = {
  selectedCaseId: string | null
  setSelectedCaseId: (id: string) => void
  caseList: CaseListModel[]
}

const CaseListForAssignment: FC<CaseListForAssignmentProps> = ({
  caseList,
  selectedCaseId,
  setSelectedCaseId
}) => {
  return (
    <div className="h-full w-full relative overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto pb-5">
        <div className="px-5 pt-3 flex flex-col space-y-3">
          <Text variant={TextVariant.HEADING6}>Active cases</Text>
          <div>
            <Input
              iconPlacement={IconPlacement.LEFT}
              iconColor="none"
              strokeColor={colors.primary[500]}
              iconType={IconType.SEARCH}
              placeholder="Search cases..."
            />
          </div>
          {caseList?.map((c) => (
            <div
              key={c.id}
              className={clsx({
                "opacity-40": !!selectedCaseId,
              })}
            >
              <Paper>
                <div className="flex items-center w-full">
                  <div className="space-y-2 flex flex-col flex-1 overflow-hidden">
                    <Text truncate variant={TextVariant.HEADING6}>
                      {c.name}
                    </Text>
                    <Text
                      light
                      bolded
                    >{`${c.applicant.firstName} ${c.applicant.lastName}`}</Text>
                  </div>
                  <div>
                    {!selectedCaseId && (
                      <Tooltip
                        triggerEl={
                          <div
                            onClick={() => {
                              setSelectedCaseId(c.id);
                            }}
                            className="bg-gradient-to-br from-primary-400 via-primary-700 to-secondary-800 shadow-sm hover:opacity-90 shadow-primary-500 cursor-pointer hover:bg-green-300 rounded-xl p-2 flex flex-col items-center justify-center"
                          >
                            <Icon
                              type={IconType.ADD_PLUS_CIRCLE}
                              fill="none"
                              stroke="white"
                            />
                            <Text
                              bolded
                              customClasses="text-white"
                              variant={TextVariant.BODY4}
                            >
                              Assign
                            </Text>
                          </div>
                        }
                        placement={TooltipPlacement.RIGHT}
                        contentEl={
                          <Text customClasses="text-white">
                            Assign Tempalte to this case
                          </Text>
                        }
                      />
                    )}
                  </div>
                </div>
              </Paper>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CaseListForAssignment