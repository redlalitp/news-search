import {Component, Fragment} from 'react';
import '../style/auto-suggestion.scss';
const axios = require('axios');

class AutoSuggestion extends Component {

    
        constructor(props){
            super(props);
            this.state = {
              activeSuggestion: 0,
              filteredSuggestions: [],
              showSuggestions: false,
              userInput: ""
            };
        }

        onChange = async e => {
            //const { suggestions } = this.props;
            const userInput = e.currentTarget.value;

            const api = `http://localhost:8080/suggestion`;

            const suggestions = await axios.get(api, { params: { query: userInput } });
            
            const filteredSuggestions = suggestions.data.filter(
                suggestion =>
                suggestion.headlineText.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            );
        
            this.setState({
                activeSuggestion: 0,
                filteredSuggestions,
                showSuggestions: true,
                userInput
            });
        };


        onClick = e => {
            this.setState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: e.currentTarget.innerText
            });
        };


        onKeyDown = e => {
            const { activeSuggestion, filteredSuggestions } = this.state;
            
            if (e.keyCode === 13) {
                this.setState({
                    activeSuggestion: 0,
                    showSuggestions: false,
                    userInput: filteredSuggestions[activeSuggestion]
                });
            } else if (e.keyCode === 38) {
                if (activeSuggestion === 0) {
                    return;
                }
                this.setState({ activeSuggestion: activeSuggestion - 1 });
            }
            // User pressed the down arrow, increment the index
            else if (e.keyCode === 40) {
                if (activeSuggestion - 1 === filteredSuggestions.length) {
                    return;
                }
                this.setState({ activeSuggestion: activeSuggestion + 1 });
            }
            else if(e.keyCode === 27) {
                this.setState({
                    activeSuggestion: 0,
                    showSuggestions: false,
                });
            }
        };

        render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;
        
        let suggestionsListComponent;


        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                    let className;
            
                    // Flag the active suggestion with a class
                    if (index === activeSuggestion) {
                        className = "suggestion-active";
                    }
                    return (
                        <li className={className} key={suggestion} onClick={onClick}>
                            {suggestion.headlineText}
                        </li>
                    );
                    })}
                </ul>
                );
            } else {
                suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>No suggestions available.</em>
                </div>
                );
            }
            }

            return (
            <Fragment>
                <input
                className="search-input"
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                />
                {suggestionsListComponent}
            </Fragment>
            );
        }
    
}
          
export default AutoSuggestion;