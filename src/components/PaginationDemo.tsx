import { arrNumbers } from '../data/Numbers';
import usePagination from '../assets/hooks/usePagination';
import { useState } from 'react';

function UsePagination(){

const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const {
        canPrevPage,
        canNextPage,
        prevPage,
        nextPage,
        setPage,
        itemsOnCurrentPage,
        endIndex,
        startIndex,
        totalPages,
        currentPage
    } = usePagination(arrNumbers.length, 10)

    console.log(startIndex, endIndex, canNextPage, canPrevPage);

    // TODO: map over the currentItems and show each item 
    const visibleItems = arrNumbers.slice(startIndex, endIndex+1);


    return(
        <div>
            <h2>Pagination Demo</h2> 
            <label htmlFor="">Items per page:  </label>           

            {/* <h2>{currentPage} of {totalPages}</h2> */}

        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <div>Total Items: </div>
            

        <p>
            Showing <strong>{itemsOnCurrentPage}</strong> items | Page{" "}
            <strong>{currentPage}</strong> of {totalPages}
        </p>

            <ul>
                {visibleItems.map((item, index )=> (
                <li key={index}>{item}</li>
                ))}
            </ul>

            <button onClick={prevPage} disabled={!canPrevPage}>Previous</button>

            <span style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</span>

            <button onClick={nextPage} disabled={!canNextPage}>Next</button>
             {/* {totalPages.map(page => (
                <button>{page}</button>
             ))} */}

             {/* Optional: Jump to specific page */}
        <div>
            {Array.from({ length: totalPages }, (_, i) => (
            <button
                key={i}
                onClick={() => setPage(i + 1)}
                disabled={currentPage === i + 1}
                >
                {i + 1}
            </button>
            ))}
        </div>

    </div>
    );
}

export default UsePagination;