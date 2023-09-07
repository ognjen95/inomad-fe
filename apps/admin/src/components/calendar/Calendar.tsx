import clsx from "clsx";
import { isThisMonth, isToday } from "date-fns";
import ReactCalendar from "react-calendar";
import { Icon, IconSize, IconType, Text, TextVariant } from "ui-components";

const Calendar = () => (
  <ReactCalendar
    onChange={() => {}}
    className="w-full"
    onClickDay={() => {}}
    defaultActiveStartDate={new Date()}
    tileClassName="[&>abbr]:hidden"
    nextLabel={
      <div className="flex items-center justify-center pr-4  ">
        <Icon type={IconType.ARROW_RIGHT} size={IconSize.SMALL} />
      </div>
    }
    prevLabel={
      <div className="flex items-center justify-center pl-2 mr-3">
        <Icon type={IconType.ARROW_LEFT_LG} size={IconSize.SMALL} />
      </div>
    }
    next2Label={null}
    prev2Label={null}
    navigationAriaLabel="something"
    navigationLabel={(prop) => <Text>{prop.label}</Text>}
    tileContent={(prop) => {
      const today = isToday(prop.date);
      const thisMonth = isThisMonth(prop.date);

      const hasTask = prop.date.getDay() % 3 === 0;
      return (
        <div
          className={clsx(
            "m-1 rounded-full h-8 w-8 flex items-center justify-center hover:bg-primary-100 relative transition-all ease-out duration-200",
            {
              "bg-primary-500 shadow-[0px_3px_3px_0px_#00000026]":
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
