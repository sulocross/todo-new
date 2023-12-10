import React from 'react'
import { useGlobalContext } from "../../hooks/useGlobalContext"

export const PaginationButtons = ({currentPage, setCurrentPage, endIndex}) => {

    const {todos} = useGlobalContext()

    return (
        <div className='pagi-container'>
            <div className='pagi-btns'>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='prev-btn'>
                Previous
                </button>
                <span style={{marginTop: '3px'}}>Page: {currentPage}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= todos} className='next-btn'>
                Next
                </button>
            </div>
        </div>
    )
}
