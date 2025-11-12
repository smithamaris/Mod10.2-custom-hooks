// Objective: Create a hook to manage pagination logic for a list of items.
import { useState, useMemo, useCallback } from "react";
// import UsePagination from "../../components/PaginationDemo";

// Function Inputs:
// totalItems: The total number of items to be paginated.
// itemsPerPage: The number of items to display per page (default to 10).
// initialPage: The page to start on (default to 1).

function usePagination(totalItems: number,itemsPerPage: number = 10,initialPage: number = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate totalPages correctly (e.g., using Math.ceil).
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Ensure currentPage stays within valid range
  const safeSetPage = useCallback(
    (pageNumber: number) => {
      const clampedPage = Math.max(1, Math.min(pageNumber, totalPages));
      setCurrentPage(clampedPage);
    },
    [totalPages]
  );

  // Derived values based on currentPage
  const { startIndex, endIndex, itemsOnCurrentPage } = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
    const itemsOnCurrentPage = endIndex - startIndex + 1;

    return { startIndex, endIndex, itemsOnCurrentPage };
  }, [currentPage, itemsPerPage, totalItems]);

  // Booleans and navigation functions
  const canPrevPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;

  const nextPage = useCallback(() => {
    if (canNextPage) safeSetPage(currentPage + 1);
  }, [currentPage, canNextPage, safeSetPage]);

  const prevPage = useCallback(() => {
    if (canPrevPage) safeSetPage(currentPage - 1);
  }, [currentPage, canPrevPage, safeSetPage]);

    

    

  // Return Values (Object):
  return {
    currentPage, // currentPage: The current active page number.
    totalPages, // totalPages: The total number of pages calculated based on totalItems and itemsPerPage.
    startIndex, // startIndex: The starting index of items for the current page (0-based).
    endIndex, // endIndex: The ending index of items for the current page (0-based).
    itemsOnCurrentPage, // itemsOnCurrentPage: The actual number of items on the current page (useful for the last page).
    setPage: setCurrentPage, // setPage(pageNumber): A function to jump to a specific page number.
    nextPage: () => setCurrentPage(currentPage + 1), // nextPage(): A function to go to the next page.
    prevPage: () => setCurrentPage(currentPage - 1), // prevPage(): A function to go to the previous page.
    canNextPage: currentPage < totalPages, // canNextPage: Boolean indicating if there is a next page.
    canPrevPage: currentPage > 1, // canPrevPage: Boolean indicating if there is a previous page.
  };
}

export default usePagination;