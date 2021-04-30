import {Component} from 'react';
import '../style/homepage.scss';
import AutoSuggestion from "./AutoSuggestion";


class HomePage extends Component {

    render() {
        return (
            <div className="search-main-container">
                <div className="search-area">
                    <div className="search-headline-text">SEARCH HEADLINES</div>
                    <div className="search-control-wrapper">
                        <div className="auto-suggestion-wrapper">
                            <AutoSuggestion suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]}/>
                        </div>
                        <input className="search-button" type="image" alt="search icon" src="search-icon.png"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage