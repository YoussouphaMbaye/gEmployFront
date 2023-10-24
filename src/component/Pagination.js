import React from "react";



const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];
    console.log(currentPage)
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="card-shadow lespage mb-3 py-1">
        <div className=''>
            <nav aria-label="..." >
            <ul className="pagination pagination-sm">
            {pages.map((page, index) => {
                
                return (
                    <li key={index} className={page == currentPage ? "page-item active cliquable" : "page-item cliquable"} aria-current="page" onClick={() => setCurrentPage(page)}>
                        <a className="page-link">{page}</a>
                    </li>
                    
                );
            })}
            </ul>
            </nav>
        </div>
        </div>
    );
};

export default Pagination;