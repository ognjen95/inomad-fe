import clsx from "clsx";
import { FC } from "react";
import { UserRoles } from "src/common/enums";
import { Text } from "ui-components";

export type UserRoleBadgeProps = {
  role: UserRoles;
};

const UserRoleBadge: FC<UserRoleBadgeProps> = ({ role }) => (
  <div
    className={clsx(
      {
        "border-2 border-primary-400": role === UserRoles.PROVIDER_SUPERVISOR,
        "border-2 border-yellow-400": role === UserRoles.PROVIDER_EMPLOYEE,
      },
      "px-6 py-1 w-fit text-center rounded-xl"
    )}
  >
    <Text truncate>
      {role === UserRoles.PROVIDER_SUPERVISOR ? "Supervisor" : "Employee"}
    </Text>
  </div>
);

export default UserRoleBadge;
