import { useState, useMemo, useEffect } from "react";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { getPageNumbers } from "./helpers";
import { LEFT_PAGE, PaginationData, RIGHT_PAGE } from "../../utils/types";
import "./index.css";

interface PaginationProps {
  totalRows: number;
  pageLimit: number;
  onPageChanged: (args: PaginationData) => void;
  setPageLimit: (args: number) => void;
}

const Pagination = ({
  totalRows,
  onPageChanged,
  pageLimit,
  setPageLimit,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.ceil(totalRows / pageLimit),
    [pageLimit, totalRows]
  );

  const pageNeighbours = useMemo(
    () =>
      currentPage === 1 || currentPage === totalPages
        ? 0
        : currentPage === 2 || currentPage === totalPages - 1
        ? 1
        : 2,
    [currentPage, totalPages]
  );

  const pages = useMemo(
    () => getPageNumbers(totalPages, currentPage, pageNeighbours),
    [currentPage, pageNeighbours, totalPages]
  );

  const goToPage = (page: number, pageLimit: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
    };
    setCurrentPage(currentPage);
    onPageChanged(paginationData);
  };

  const handleMoveToPage = (page: number) => () => {
    goToPage(page, pageLimit);
  };

  const handleMoveRight = () => {
    goToPage(currentPage + pageNeighbours + 1, pageLimit);
  };

  const handleMoveLeft = () => {
    goToPage(currentPage - pageNeighbours - 1, pageLimit);
  };

  // run everytime the row limit selection changes
  useEffect(() => {
    goToPage(1, pageLimit);
  }, [pageLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box className="pagination">
      <List component="nav" className="pagination-page-selection">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <ListItem key={index}>
                <Button onClick={handleMoveLeft}>
                  <ListItemIcon>
                    <NavigateBefore />
                  </ListItemIcon>
                </Button>
              </ListItem>
            );

          if (page === RIGHT_PAGE)
            return (
              <ListItem key={index}>
                <Button onClick={handleMoveRight}>
                  <ListItemIcon>
                    <NavigateNext />
                  </ListItemIcon>
                </Button>
              </ListItem>
            );

          return (
            <ListItem key={index}>
              <Button onClick={handleMoveToPage(page as number)}>
                <ListItemText
                  sx={{
                    color: page === currentPage ? "red" : "",
                    border: page === currentPage ? "1px solid red" : "",
                  }}
                >
                  {page}
                </ListItemText>
              </Button>
            </ListItem>
          );
        })}
      </List>
      <Select
        className="pagination-row-selection"
        value={pageLimit}
        onChange={(event: SelectChangeEvent<number>) => {
          setPageLimit(parseInt(event.target.value as string));
        }}
      >
        {[5, 10, 25, 50, 100].map((limit, index) => (
          <MenuItem key={index} value={limit}>
            {limit}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Pagination;
