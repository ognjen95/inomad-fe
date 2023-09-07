import clsx from "clsx";

import { colors } from "../config/tailwind-config";
import { IconSize, IconType } from "../icon/enums";
import Icon from "../icon/Icon";
import Select from "../select";
import { SelectSize } from "../select/enums";
import Text from "../text";
import { TextVariant } from "../text/enums";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 text-gray-600">
      <div className="flex items-center justify-center gap-2">
        <div className="flex justify-center items-center  whitespace-nowrap">
          <Text variant={TextVariant.BODY4} color="text-gray-600">
            Rows per page
          </Text>
        </div>
        <Select
          size={SelectSize.SMALL}
          menuPlacement="top"
          selectColor={colors.grey[100]}
          largeIndicator
          placeholder="20"
          options={[
            { value: "20", label: "20" },
            { value: "50", label: "50" },
            { value: "100", label: "100" },
          ]}
        />
      </div>
      <div className="flex items-center">
        <Text variant={TextVariant.BODY4} color="text-gray-600">
          {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
            currentPage * itemsPerPage,
            totalItems
          )} of ${totalItems}`}
        </Text>
        <div
          className={clsx("cursor-pointer p-2", {
            "pointer-events-none": currentPage === 1,
          })}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <Icon
            type={IconType.CHEVRON_LEFT}
            size={IconSize.MEDIUM}
            fill="transparent"
            stroke={currentPage === 1 ? "#C9CDD5" : "currentColor"}
          />
        </div>

        <div
          className={clsx("cursor-pointer p-2", {
            "pointer-events-none": currentPage === totalPages,
          })}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <Icon
            type={IconType.CHEVRON_RIGHT}
            size={IconSize.MEDIUM}
            fill="transparent"
            stroke={currentPage === totalPages ? "#C9CDD5" : "currentColor"}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
