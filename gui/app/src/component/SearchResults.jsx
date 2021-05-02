import {Component} from 'react';
import '../style/homepage.scss';
import {Link} from "react-router-dom";
import Moment from 'react-moment';

class SearchResults extends Component {

    getHighlightedResult= (result) => {
        this.props.query.split(" ").forEach(word => {
            result = result.replace(word, `<span class="highlight-bold">${word}</span>`);
        })
        return result;
    }

    render() {
        return (
            <>
                <div className="search-results__total-results-count">
                    Total Results: {this.props.state.searchResults.totalRecords}
                </div>
                <div className="search-results">
                    {this.props.state.searchResults.newsHeadlines.map(result => (
                        <div className="search-result">
                            <Link to="#" key={result.headlineText}>
                                <div dangerouslySetInnerHTML={{__html:this.getHighlightedResult(result.headlineText)}}></div>
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