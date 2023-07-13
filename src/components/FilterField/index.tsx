import { Context, useContext } from "react";
import { HeaderRendererProps, useFocusRef } from "react-data-grid";

import { Filter } from "../../utils/types";

export default function FilterField<R, SR, T extends HTMLOrSVGElement>({
  isCellSelected,
  column,
  children,
  FilterContext,
}: HeaderRendererProps<R, SR> & {
  children: (args: {
    ref: React.RefObject<T>;
    tabIndex: number;
    filters: Filter;
  }) => React.ReactElement;
  FilterContext: Context<Filter | undefined>;
}) {
  const filters = useContext(FilterContext)!;
  const { ref, tabIndex } = useFocusRef<T>(isCellSelected);

  return (
    <div>
      <div>{column.name}</div>
      <div>{children({ ref, tabIndex, filters })}</div>
    </div>
  );
}
