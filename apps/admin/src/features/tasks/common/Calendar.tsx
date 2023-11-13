import clsx from "clsx";
import {
  addDays,
  subDays,
  isAfter,
  isBefore,
  isThisMonth,
  isToday,
} from "date-fns";
import { FC } from "react";
import ReactCalendar from "react-calendar";
import {
  Icon,
  IconButton,
  IconSize,
  IconType,
  Text,
  TextVariant,
} from "ui-components";

import { Task } from "../types";

type CalendarProps = {
  tasks: Array<Task>;
  previewTask: (task: Task) => void;
};

const Calendar: FC<CalendarProps> = ({ tasks, previewTask }) => (
  <ReactCalendar
    onChange={() => {}}
    className="w-full"
    onClickDay={() => {}}
    defaultActiveStartDate={new Date()}
    tileClassName="[&>abbr]:hidden"
    nextLabel={
      <div className="flex items-center justify-center pr-4">
        <IconButton
          iconProps={{
            type: IconType.ARROW_RIGHT,
            size: IconSize.SMALL,
          }}
        />
      </div>
    }
    prevLabel={
      <div className="flex items-center justify-center pl-2 mr-4">
        <IconButton
          iconProps={{
            type: IconType.ARROW_LEFT_LG,
            size: IconSize.SMALL,
          }}
        />
      </div>
    }
    next2Label={null}
    prev2Label={null}
    navigationAriaLabel="something"
    navigationLabel={(prop) => <Text>{prop.label}</Text>}
    tileContent={(prop) => {
      const today = isToday(prop.date);
      const thisMonth = isThisMonth(prop.date);

      const hasTask = tasks.some((task) => {
        if (
          (isToday(task.startDate) && today && thisMonth) ||
          (isToday(task.endDate) && today && thisMonth) ||
          (isAfter(task.startDate, subDays(prop.date, 1)) &&
            isBefore(task.endDate, addDays(prop.date, 1)))
        ) {
          return true;
        }
        return false;
      });

      return (
        <div
          className={clsx(
            "m-1 !rounded-2xl h-8 w-8 flex items-center justify-center hover:bg-primary-100 relative transition-all ease-out duration-200",
            {
              "bg-primary-600 shadow-[0px_3px_3px_0px_#00000026]":
                today && thisMonth,
              "bg-white shadow-[0px_3px_3px_0px_#00000026]":
                !today && thisMonth,
              "bg-transparent": !thisMonth,
            }
          )}
        >
          {hasTask && (
            <div className="text-[10px] absolute bg-primary-800 rounded-2xl top-[2px] right-0 text-white h-2 w-2" />
          )}
          <Text
            customClasses={clsx({ "text-white": today })}
            variant={TextVariant.OVERLINE}
          >
            {prop.date.getDate()}
          </Text>
        </div>
      );
    }}
  />
);

export default Calendar;
