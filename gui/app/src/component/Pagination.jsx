import {Component} from 'react';
import '../style/homepage.scss';
const axios = require('axios');

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
        const {pageNumber, totalPages, recordsPerPage, totalRecords} = this.props.state.searchResults; 
        const pageNumbersArray = [];

        for(let i=0; totalPages > pageNumber && i < 10 ; i++) {
            pageNumbersArray.push(pageNumber+i);
        }

        paginationComponent = (
            <div>
                {/* <input type="button" className={this.state.pageNumber<10 ? "pagination-navigation-button pagination-navigation-button--disabled" : "pagination-navigation-button pagination-navigation-button--enbaled" } value="Back" ></input> */}
                {pageNumbersArray.map(page => {
                    if(this.props.state.searchResults.pageNumber === page)
                        return <input type="button" className="search-results__pagination-page active" onClick={() => this.makeHttpRequestWithPage(page)} value={page+1}></input>
                    else
                        return <input type="button" className="search-results__pagination-page" onClick={() => this.makeHttpRequestWithPage(page)} value={page+1}></input>
                })}
                {/* <input type="button" className={(this.state.pageNumber+10) < totalPages ? "pagination-navigation-button pagination-navigation-button--disabled" : "pagination-navigation-button pagination-navigation-button--enbaled" } value="Next"></input> */}
            </div>
        );

        return (
            <div className="search-results__pagination">
                {/* <div className="search-results__total-results-count">
                    Total Results: {this.props.state.searchResults.length}
                </div>
                <div className="search-results">
                    {this.props.state.searchResults.map(result => (
                        <div className="search-result">
                            <Link to="#">
                                <div>{result.headlineText}</div>
                            </Link>
                            <div>Published: <Moment fromNow>{result.publishDate}</Moment> (<Moment format="YYYY/MM/DD">
                    {result.publishDate}</Moment>)</div>
                        </div>
                    ))}
                </div> */}
                <div>
                    
                    {paginationComponent}
                </div>
            </div>
        )
    }
}

export default Pagination