import { SelectionProps } from "src/shared/uielements/SelectModal";
import { BusinessType } from "src/utils/types";

const list: SelectionProps[] = [
  {
    "value": BusinessType.SOLE_PROPRIETORSHIP,
    "name": BusinessType.SOLE_PROPRIETORSHIP,
  },
  {
    "value": BusinessType.CORPORATION,
    "name": BusinessType.CORPORATION,
  },
  {
    "value": BusinessType.LLC,
    "name": BusinessType.LLC,
  },
  {
    "value": BusinessType.PARTNERSHIP,
    "name": BusinessType.PARTNERSHIP,
  },
  {
    "value": BusinessType.NON_PROFIT,
    "name": BusinessType.NON_PROFIT,
  }
]

export default list;
