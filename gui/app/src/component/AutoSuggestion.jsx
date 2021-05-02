import {Component, Fragment} from 'react';
import '../style/auto-suggestion.scss';
import debounce from 'lodash.debounce';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

const axios = require('axios');

class AutoSuggestion extends Component {
        constructor(props){
            super(props);
            this.state = {
              activeSuggestion: 0,
              filteredSuggestions: [],
              showSuggestions: false,
              userInput: "",
              data: {
                searchResults: {
                    newsHeadlines: [],
                    pageNumber:0,
                    recordsPerPage:10,
                    totalPages:0,
                    totalRecords:0
                }
              }
            };

            this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
        }

        onChange = async e => {
            const userInput = e.currentTarget.value;

            this.setState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput
            });

            this.onChangeDebounced(userInput);

        };

        onChangeDebounced = async userInput => {
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
          }


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
                });

                let url = `http://localhost:8080/search?query=${this.state.userInput}`;
                axios.get(url)
                    .then(response => {
                        let data = {
                            searchResults: response.data,
                        };
                        this.setState({data});
                    })
                    .catch(error => console.log(error));
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

        pageChange = (page) => {
            let url = `http://localhost:8080/search?query=${this.state.userInput}&pageNumber=${page}`;
                axios.get(url)
                    .then(response => {
                        let data = {
                            searchResults: response.data,
                        };
                        this.setState({data});
                    })
                    .catch(error => console.log(error));
        }

        getHighlightedResult= (result) => {
            return result.replace(this.state.userInput, `<span class="highlight-bold">${this.state.userInput}</span>`);
        }

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
                    
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }
                            return (
                                <li className={className} key={suggestion.headlineText} onClick={onClick}>
                                    <div dangerouslySetInnerHTML={{__html:this.getHighlightedResult(suggestion.headlineText)}}></div>
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
                        placeholder='search query...'
                        value={userInput}
                    />
                    {suggestionsListComponent}
                    <div className="search-results-container">
                        {this.state.data.searchResults.newsHeadlines.length > 0 &&
                            <div>
                                <SearchResults state={this.state.data} query={this.state.userInput}/> 
                                <Pagination onPageChange={this.pageChange} state={this.state.data}/>
                            </div>
                        }
                    </div>
                </Fragment>
            );
        }
    
}
          
export default AutoSuggestion;