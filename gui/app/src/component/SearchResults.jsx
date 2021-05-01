import {Component} from 'react';
import '../style/homepage.scss';
import {Link} from "react-router-dom";

class SearchResults extends Component {

    componentDidMount(props){
        console.log(props);
    }

    render() {
        return (
            <div className="search-results">
                <Link to="#">
                    {this.props.location.state.searchResults.map(result => (
                        <div className="search-result">{result.headlineText}</div>
                    ))}
                </Link>
            </div>
        )
    }
}

export default SearchResults