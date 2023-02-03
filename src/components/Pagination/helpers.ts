import { LEFT_PAGE, RIGHT_PAGE } from "../../utils/types";

export const getPaginationRange = (
  from: number,
  to: number,
  step: number = 1
): (string | number)[] => {
  const range: number[] = [];
  for (let i = from; i <= to; i += step) {
    range.push(i);
  }
  return range;
};

export const getPageNumbers = (
  totalPages: number,
  currentPage: number,
  pageNeighbours: number
): (string | number)[] => {
  // make the pagination look like this: (1) < {4 5} [6] {7 8} > (10)
  // total blocks: 2 times page neighbours blocks, 3 more for the first/last/current pages, and 2 more for the previous/next signs,
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages = getPaginationRange(startPage, endPage);

    const hasHiddenLeftPages = startPage > 2;
    const hasHiddenRightPages = totalPages - endPage > 1;
    const totalHiddenPages = totalNumbers - (pages.length + 1);

    switch (true) {
      case hasHiddenLeftPages && !hasHiddenRightPages: {
        const extraPages = getPaginationRange(
          startPage - totalHiddenPages,
          startPage - 1
        );
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }
      case !hasHiddenLeftPages && hasHiddenRightPages: {
        const extraPages = getPaginationRange(
          endPage + 1,
          endPage + totalHiddenPages
        );
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }
      case hasHiddenLeftPages && hasHiddenRightPages:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }

    return [1, ...pages, totalPages];
  }

  return getPaginationRange(1, totalPages);
};
