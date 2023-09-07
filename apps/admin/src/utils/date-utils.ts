import format from "date-fns/format";
import { DEFAULT_DATE_FORMAT } from "src/common/constants";

export const formatDate = (date: Date, dateFormat = DEFAULT_DATE_FORMAT) =>
  format(date, dateFormat);
