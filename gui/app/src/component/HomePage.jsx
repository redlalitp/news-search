import {Component} from 'react';
import '../style/homepage.scss';
import AutoSuggestion from "./AutoSuggestion";


class HomePage extends Component {

    render() {
        return (
            <div className="search-main-container">
                <div id="search-area-div" className="search-area">
                    <div>
                        <img className="search-image" alt="search-icon" src="search-icon.png"></img>
                        <div className="search-headline-text">
                            SEARCH HEADLINES
                        </div>
                    </div>
                    <div className="search-control-wrapper">
                        <div className="auto-suggestion-wrapper">
                            <AutoSuggestion/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage