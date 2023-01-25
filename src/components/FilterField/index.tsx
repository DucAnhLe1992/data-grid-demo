import { Context, useContext } from "react";
import { HeaderRendererProps, useFocusRef } from "react-data-grid";

import { Filter } from "../../types";

export function FilterField<R, SR, T extends HTMLOrSVGElement>({
  isCellSelected,
  column,
  FilterContext,
  children,
}: HeaderRendererProps<R, SR> & {
  FilterContext: Context<Filter | undefined>;
  children: (args: {
    ref: React.RefObject<T>;
    tabIndex: number;
    filters: Filter;
  }) => React.ReactElement;
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
