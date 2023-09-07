import Link from "next/link";
import { Paper, Text, Button, TextVariant } from "ui-components";
import { ButtonSize } from "ui-components/src/button/enums";

import Calendar from "~components/calendar/Calendar";
import TaskListFeature from "~features/tasks/task-list/TaskList";

const CaseAndTasksSidebar = () => (
  <div className="flex flex-col space-y-5 h-full overflow-hidden">
    <div className="h-min-fit">
      <Paper title="Case requests" titleClassName="text-gray-900">
        <div className="flex flex-col space-y-5 flex-grow">
          <div className="flex flex-col space-y-2">
            <Text light variant={TextVariant.BODY2}>
              You have <strong>0</strong> case requests.
            </Text>
            <Text light variant={TextVariant.BODY2}>
              Currently you have <strong>1</strong> active case.
            </Text>
          </div>
          <Link href="/cases?tab=requests">
            <Button fullWidth size={ButtonSize.SMALL}>
              View Requests
            </Button>
          </Link>
        </div>
      </Paper>
    </div>
    <div className="h3">
      <Calendar />
    </div>
    <TaskListFeature />
  </div>
);

export default CaseAndTasksSidebar;
