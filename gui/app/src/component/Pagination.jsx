import {Component} from 'react';
import '../style/homepage.scss';

class Pagination extends Component {
    constructor(props){
        super();
        this.state = {
            pageNumber: props.state.searchResults.pageNumber,
            totalPages: props.state.searchResults.totalPages,
            recordsPerPage: props.state.searchResults.recordsPerPage,
            totalRecords:props.state.searchResults.totalRecords
        }
    }

    makeHttpRequestWithPage(page) {
        this.props.onPageChange(page);
    }

    render() {
        
        let paginationComponent;
        const {pageNumber, totalPages} = this.props.state.searchResults; 

        paginationComponent = (
            <div className="pagination-container">
                <input className="pagination-navigation-button" type="button" onClick={() => this.makeHttpRequestWithPage(pageNumber-1)}  value="<"  disabled={pageNumber === 0}></input>
                <span>Page {pageNumber+1} of {totalPages+1}</span>
                <input className="pagination-navigation-button" type="button" onClick={() => this.makeHttpRequestWithPage(pageNumber+1)} value=">" disabled={pageNumber === totalPages}></input>
            </div>
        );

        return (
            <div className="search-results__pagination">
                {paginationComponent}
            </div>
        )
    }
}

export default Pagination