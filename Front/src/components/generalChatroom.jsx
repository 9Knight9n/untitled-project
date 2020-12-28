import React, { Component } from 'react';
import ChatroomInfo from './chatroomInfo.jsx';
import LoadingPage from './loading';
import MessageBox from './messageBox';
import {connect,listen,send} from './socket';
import { Input } from 'react-chat-elements'
import { isExpired } from "react-jwt";
import {renewToken,request} from './requests'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

 


class GeneralChatroom extends Component {


    constructor(props) {
        super(props);
        this.state = {
            replying:null,
            replyingTo:null,
            inputValue:"",
            loading:false,
            inputRef:React.createRef(),
            chats:[],
            inputHeight:37,
            ChatroomID:parseInt(this.props.match.params.chatroomid)
        };
        this.componentDidMount=this.componentDidMount.bind(this)
        // this.loadQuestions=this.loadQuestions.bind(this)
    }
    newMessage=(message)=>{
        this.setState({chats:[...this.state.chats,message]})
        // console.log("received info:",message.data)
        // console.log("old chats:",this.state.chats)
        // console.log("new chats:",this.state.chats)
        // let data = JSON.parse(message.data);
        //   console.log(data);
        //   if (data.message)
        // this.setState({time:data.message})
      }

    async componentWillMount(){
        await connect("ws://127.0.0.1:8000/ws/api/generalchatroom/"+this.state.ChatroomID+"/");
        await listen("message",this.newMessage);   
      }


    componentDidMount(){
        sessionStorage.removeItem("search")
        // var msg = document.getElementById("message"); 
        let button = document.getElementById("generalChatroomSendButton"); 
        let textBox = document.getElementById("sendOnEnter"); 
  
        // This event is fired when button is clicked 
        if(this.state.ChatroomID!==-1)
            textBox.addEventListener("keyup", function (event) { 
                if (event.keyCode === 13 && event.shiftKey) { 
                    button.click();  
                } 
            }); 

        this.loadChats()
    }

    componentDidUpdate(prevProps) {
        console.log("something changed")
        if (prevProps.match.params.chatroomid !== this.props.match.params.chatroomid) {
          this.setState({ChatroomID:this.props.match.params.chatroomid})
        this.loadChats()
        }
      }


    loadChats=async()=>{
        this.setState({loading:true})
        console.log("fetching Questions")
        let config ={
            url:"http://127.0.0.1:8000/api/show_Message/",
            needToken:true,
            type:"post",
            formKey:[
                "chatroomId",
            ],
            formValue:[
                this.props.match.params.chatroomid,
            ]
        }
        let data = []
        // console.log("outside 0",data)
        data = await request(config)
        // console.log(await request(config))
        console.log("outside",data)
        if (data)
        {
            this.setState({chats:data})
            console.log("state set")
        }
        this.setState({loading:false})
        // console.log(data)
    }


    inputOnChange=(e)=>{
        let target = e.target;
        // let value = target.value;
        
        this.setState({inputHeight:target.offsetHeight})
        // this.forceUpdate()
        console.log(target.offsetHeight)
    }

    sendMessage=async()=>{
        let token = sessionStorage.getItem
        if(isExpired(sessionStorage.getItem('id'))){
        token=await renewToken()
        }
        console.log({
            'order_type' : 'create_message',
            'chatroom_id':this.state.ChatroomID,
            'token': token,
            'message': this.state.inputRef.input.value,
            'replyto':this.state.replying
        })
        if (this.state.replying)
            send({
                'order_type' : 'create_message',
                'chatroom_id':this.state.ChatroomID,
                'token': token,
                'message': this.state.inputRef.input.value,
                'replyTo':this.state.replying
            })
        else
            send({
                'order_type' : 'create_message',
                'chatroom_id':this.state.ChatroomID,
                'token': token,
                'message': this.state.inputRef.input.value,
            })
        this.state.inputRef.clear();
        this.setState({inputRef:"",replying:null,replyingTo:null})
    }


    reply=(id,username)=>{
        // console.log("replying")
        this.setState({replying:id,replyingTo:username})
    }



    render() { 
        return (
            <React.Fragment>
                {this.state.ChatroomID!==-1?
                <React.Fragment>
                    {this.state.loading?<LoadingPage/>: ""}
                    <div className="w-100 h-100 p-2">
                        <div id="question-page" className="d-flex flex-column h-100 w-100">
                            <div id="chatroom-info" className=" d-flex flex-row">
                                <ChatroomInfo 
                                    loadQuestions={this.loadQuestions}
                                    Cid={this.state.ChatroomID}  />
                            </div>
                            <div className="mt-1 mb-1 ml-5 h-100">
                                <div className="messages-box" style={{height: "calc(83vh - 58px - ".concat(this.state.inputHeight).concat("px)")}}>
                                    <div className="mr-5 mb-2">
                                        {this.state.chats.map(chat =>
                                        <div key={chat.message_id} className="mb-3">
                                            <MessageBox
                                            reply={this.reply}
                                            message_id={chat.message_id}
                                            userid={chat.user}
                                            title={chat.username}
                                            text={<span style={{whiteSpace: "pre-line"}}>
                                                    {ReactHtmlParser(chat.text)}
                                                </span>}
                                            dateString={chat.time}
                                            isReply={chat.replyTo}
                                            titleRep={chat.replyTo?this.state.chats.find(reply => reply.message_id === chat.replyTo).username:null}
                                            messageRep={chat.replyTo?this.state.chats.find(reply => reply.message_id === chat.replyTo).text:null}/>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div id="sendOnEnter">
                                <Input
                                    ref={el => (this.state.inputRef = el)}
                                    onChange={this.inputOnChange}
                                    // minHeight={50}
                                    placeholder="Type here..."
                                    multiline={true}
                                    autoHeight={true}
                                    rightButtons={
                                        <button
                                            className="p-2 rounded"
                                            onClick={this.sendMessage}
                                            id="generalChatroomSendButton"
                                            style={{backgroundColor:'black',color:'white'}}>
                                                Send
                                            </button>
                                    }
                                    leftButtons={this.state.replying?
                                    <div className="black-text">
                                        <button className="p-2 rounded replyToButton">
                                            Replying to {this.state.replyingTo}
                                        </button>
                                        <button className="p-1" style={{backgroundColor:"transparent"}} onClick={()=>this.reply(null,null)}>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </button>
                                    </div>:""
                                    }/>
                            </div>
                        </div>
                    </div>
                </React.Fragment>:""}
            </React.Fragment>
        );
    }
}
 
export default GeneralChatroom;