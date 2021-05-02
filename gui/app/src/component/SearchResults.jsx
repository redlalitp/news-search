import {Component} from 'react';
import '../style/homepage.scss';
import {Link} from "react-router-dom";
import Moment from 'react-moment';
import Pagination from './Pagination';

class SearchResults extends Component {

    render() {
        return (
            <>
                <div className="search-results__total-results-count">
                    Total Results: {this.props.state.searchResults.totalRecords}
                </div>
                <div className="search-results">
                    {this.props.state.searchResults.newsHeadlines.map(result => (
                        <div className="search-result">
                            <Link to="#">
                                <div>{result.headlineText}</div>
                            </Link>
                            <div>Published: <Moment fromNow>{result.publishDate}</Moment> (<Moment format="YYYY/MM/DD">
                    {result.publishDate}</Moment>)</div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}

export default SearchResults