import React, { Component } from 'react';
import './CSS/search.css';


class Search extends Component {
    state = {
        focused:false
    }


    openPanel=()=>{
        this.setState({focused:!this.state.focused})
    }


    render() { 
        return (  
            <React.Fragment>

                <div id='search' className="d-flex flex-row">
                    <div className={"ml-auto d-flex flex-row-reverse  mr-sm-2".concat(this.state.focused?" active ":"")}>
                        
                        <button onClick={this.openPanel} className="pl-2 pr-2 rounded-circle btn d-flex flex-row ml-auto search-button">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="text-white bi bi-search align-self-center" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                            </svg>
                        </button>
                        <input className="mr-sm-2 form-control" placeholder="Search" />
                    </div>
                    
                    </div>

            </React.Fragment>

        );
    }
}
 
export default Search;