import React, { Component } from 'react';
import './CSS/chatBox.css';
class ChatBox extends Component {
    state = { 
     }
    render() { 
        return (
                <div className="comment d-flex flex-column">
                        <div className="d-flex align-items-center"><img  id="profile-img-in-chat" src="http://emilcarlsson.se/assets/mikeross.png" /></div>
                        <h1 className="d-flex align-items-center"><p><a href="">{this.props.chat.by}</a></p></h1>
                    

                    <p>{this.props.chat.content}</p>
                    <div className="row">
                        <div class="col-lg-6 d-flex justify-content-start">
                            <em>{this.props.chat.time}</em>
                        </div>
                        <div class="col-lg-6 d-flex justify-content-end">
                            <p>
                                <a onClick={() => this.props.refToChatroom.current.clicked(this.props.chat.id)} href="#">
                                    reply
                                </a>
                            </p>
                        </div>
                    </div>
                </div> 
            
        );
    }
}
 
export default ChatBox;