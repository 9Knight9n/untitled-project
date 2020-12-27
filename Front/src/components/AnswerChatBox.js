import React, { Component } from 'react';
import './CSS/AnswerChatBox.css';
import negativeVoteImg from '../img/down-arrow.png';
import lockedNegativeVoteImg from '../img/down.png';
import positiveVoteImg from '../img/up-arrow.png';
import lockedPositiveVoteImg from '../img/up.png';
import defaultProfileImg from '../img/default-profile-picture.jpg';
import greenCheckMark from '../img/greenCheckMark.png';
import blueCheckMark from '../img/blueCheckMark.png';
import { Dropdown } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import Cookies from 'js-cookie';
import { getUserAvatar } from './util';
import {request} from "./requests.jsx";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Texteditor from './texteditor';
import LoadingPage from './loading';
import ProfilePreview from './ProfilePreview';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '',
  
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))(Badge);
  
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));


class AnswerChatBox  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showProfilePreview:false,
            loading:false,
            PactiveVote:this.props.voteState === 1,
            NactiveVote:this.props.voteState === -1,
            answer: this.props.answer,
            trueAnswer: this.props.trueAnswer,
            voteState: this.props.voteState,
            vote: this.props.vote,
            answerId: parseInt(this.props.answerId),
            Qid: this.props.Qid,
            profileImg: null,
            answerSubmiteDate: this.props.answerSubmiteDate,
            isQOwner: this.props.QsenderId === Cookies.get('id'),
            isOwner: this.props.userid === parseInt(Cookies.get('id')),
            editorContent:null,
            editorVisible:false,
            isOnline: true,
        }

        this.handleVote = this.handleVote.bind(this);
        this.handleTrueAnswer = this.handleTrueAnswer.bind(this);
    }

    showEditor = () => {
        this.setState({ editorVisible: true });
    };

    hideEditor = (submit) => {
        this.setState({ editorVisible: false });
        if(submit)
            this.handleEdit()
    };
    updateContent = (value) => {
        this.setState({editorContent:value})
    };

    handleEdit = async () =>{
        this.setState({loading:true})
        let config ={
            url:"http://127.0.0.1:8000/api/EditAnswer/",
            needToken:true,
            type:"post",
            formKey:[
                "user_id",
                "question",
                "text",
                "id"
            ],
            formValue:[
                Cookies.get('id'),
                this.state.Qid,
                this.state.editorContent,
                this.state.answerId
            ]
        }
        let data = []
        // console.log("outside 0",data)
        data = await request(config)
        // console.log(await request(config))
        // console.log("outside",data)
        // console.log(data)
        this.setState({editorContent:null})
        this.setState({loading:false})
        this.props.loadAnswers()
    }

    componentDidMount = async () =>{
        console.log("hey this is answer id : " , this.props.QsenderId , parseInt(Cookies.get('id')))
        console.log(this.props.Qid , " "  , parseInt(Cookies.get('id')))
        if (!sessionStorage.getItem(this.props.userid + ":avatar")) {
          await getUserAvatar(this.props.userid);  
        }
        
    }
    componentDidUpdate(prevProps) {
        // console.log("inside componentDidUpdate")
        // console.log("chatroom changed from ",prevProps.Cid ," to ",this.props.Cid)
        if (prevProps.answer !== this.props.answer) {
            
            this.setState({answer:this.props.answer})
            // console.log("chatroom changed from ",prevProps.Cid ," to ",this.props.Cid)
            // this.loadData()
            
        }
      }

      handleVote = async (up) => {

        let voteState = null;
            if (up && this.state.voteState === 0) {
                voteState = 1;
                this.setState({
                    voteState:1,
                    vote: this.state.vote + 1,
                    PactiveVote: true,
                })
                this.setState({loading:true})
                console.log(" vote 1 : " , this.state.voteState)
            }else if (up && this.state.voteState === 1) {
                // voteState = 1;
                return ;
            }else if (!up && this.state.voteState === 1) {
                voteState = 0;
                this.setState({
                    voteState:0,
                    vote: this.state.vote - 1,
                    PactiveVote: false,
                })
                this.setState({loading:true})
                console.log(" vote 3 : " , this.state.voteState)
            }else if (!up && this.state.voteState === 0) {
                voteState = -1;
                this.setState({
                    voteState:-1,
                    vote: this.state.vote - 1,
                    NactiveVote: true,
                })
                this.setState({loading:true})
                console.log(" vote 4 : " , this.state.vote)
            }else if (!up && this.state.voteState === -1) {
                // voteState = -1;
                return ;
            }else if (up && this.state.voteState === -1) {
                voteState = 0;
                this.setState({
                    voteState:0,
                    vote: this.state.vote + 1,
                    NactiveVote: false,
                })
                this.setState({loading:true})
            }

            let config ={
                url:"http://127.0.0.1:8000/api/VoteAnswer/",
                needToken:true,
                type:"post",
                formKey:[
                    "answer_id",
                    "user_id",
                    "voteState",
                    "vote"
                ],
                formValue:[
                    this.state.answerId,
                    Cookies.get("id"),
                    voteState,
                    this.state.vote
                    
                ]
            }
            
            let data = []
            // console.log("outside 0",data)
            data = await request(config)
            // console.log(await request(config))
            // console.log("outside",data)
            console.log(data)
            this.setState({loading:false})
            console.log("this is vote : " , this.state.voteState)
        
    }

    handleRemove = async () =>{
        this.setState({loading:true})
        console.log(this.state.answerId)
        let config ={
            url:"http://127.0.0.1:8000/api/DeleteAnswer/",
            needToken:true,
            type:"post",
            formKey:[
                "question",
                "user_id",
                "id",
            ],
            formValue:[
                this.state.Qid,
                Cookies.get("id"),
                this.state.answerId,
            ]
        }
        console.log(config)
        let data = []
        // console.log("outside 0",data)
        data = await request(config)
        // console.log(await request(config))
        // console.log("outside",data)
        console.log(data)
        this.setState({loading:false})
        this.props.loadAnswers()

    }

    handleTrueAnswer =async () => {
        this.setState({loading:true})
        let config ={
            url:"http://127.0.0.1:8000/api/EditAnswer/",
            needToken:true,
            type:"post",
            formKey:[
                "user_id",
                "question",
                "isAccepted",
                "id"
            ],
            formValue:[
                Cookies.get('id'),
                this.state.Qid,
                !this.state.trueAnswer,
                this.state.answerId
            ]
        }
        this.setState({
            trueAnswer: !this.state.trueAnswer,
        })
        let data = []
        // console.log("outside 0",data)
        data = await request(config)
        // console.log(await request(config))
        // console.log("outside",data)
        // console.log(data)
        this.setState({editorContent:null})
        this.setState({loading:false})
        this.props.loadAnswers()
    }


    showProfilePreview = (userid) => {
        // this.setState({ showProfilePreview: submit });
        this.setState({ showProfilePreview: true ,});
        // console.log(this.state.submit)
    
    };
    
    hideProfilePreview = () => {
        this.setState({ showProfilePreview: false });
        // this.setState({ submit: -2 });
        // this.loadChatrooms()
    };


    render() { 
        return ( 
            
                <div id="answer" style={{ width:this.props.width+"vw",}} className="answer-chatbox d-flex flex-column">
                    <ProfilePreview userid={this.props.userid} hideProfilePreview={this.hideProfilePreview} showProfilePreview={this.state.showProfilePreview} />
                    {this.state.loading?<LoadingPage/>: ""}
                    <Texteditor 
                        content={this.state.answer} 
                        updateContent={this.updateContent} 
                        hideEditor={this.hideEditor}
                        editorVisible={this.state.editorVisible} 
                        />
                        <ReactTooltip place="right" effect="solid" type="dark"/>
                        <div id="header" className="d-flex flex-row ">
                            <div className="d-flex pl-2 align-top w-80 ml-3" className="profileAvatarBox">
                                <div style={{cursor:"pointer"}} className="d-flex align-items-center mr-2 profileAvatar" onClick={this.showProfilePreview}>
                                  {this.state.isOnline?
                                  
                                    <StyledBadge
                                    
                                        overlap="circle"
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                        }}
                                        variant="dot"
                                    >
                                        <Avatar className="profileImg" alt="Avatar" src={sessionStorage.getItem(this.props.userid + ":avatar")} />
                                    </StyledBadge> :    
                                    <img className="profileImg" src={sessionStorage.getItem(this.props.userid + ":avatar")} />
                                    }
                                </div>
                               
                            </div>

                            <label style={{cursor:"pointer"}} onClick={this.showProfilePreview} className="profileUsername" for="profileImg">{this.props.userName === "User is not exist" ? "Deleted account" : this.props.userName}</label>
                            <div id="options" className="options ml-auto">
                                <Dropdown className="dropDownMain">
                                    <Dropdown.Toggle className="mr-2" id="dropdown-basic">
                                    <svg color="#9d9dd1" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg%22%3E" >
                                            <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    </svg>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu  className="dropDown">
                                       {this.state.isOwner? <Dropdown.Item onClick={this.showEditor} as="button">Edit</Dropdown.Item> : " "
                                       } 
                                        {this.state.isOwner? <Dropdown.Item onClick={this.handleRemove} as="button">Delete</Dropdown.Item>: " "}
                                        <Dropdown.Item as="button">something</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                             
                        </div>

                        <div id="body" className="d-flex flex-row w-100">
                            <div id="left" className="d-flex flex-column bd-highlight">
                                <div className="trueAnswer">
                                    {this.state.isQOwner && !this.state.trueAnswer? 
                                    <img data-tip="Click if this answer is true" src={blueCheckMark} onClick={this.handleTrueAnswer}/> :
                                    this.state.trueAnswer && this.state.isQOwner?
                                    <img data-tip="This answer is true" src={greenCheckMark} onClick={this.handleTrueAnswer}/> : ""}
                                    {!this.state.isQOwner && this.state.trueAnswer?
                                    <img data-tip="This answer is true" src={greenCheckMark} /> : "" }
                                    
                                </div>
                                <div className="vote d-flex flex-column bd-highlight">
                                    <div className="positiveVoteImg" onClick={() => this.handleVote(true)} >
                                        {this.state.PactiveVote?
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="positiveVoteImg bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                        </svg>:
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" className=" bi bi-caret-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
                                        </svg>}
                                    </div>
                                    <div className="">
                                        <p className="voteCount" >{this.state.vote}</p>
                                    </div>

                                    <div className="negativeVoteImg" onClick={() => this.handleVote(false)} >
                                    {this.state.NactiveVote?
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="negativeVoteImg bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                        </svg>:
                                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="negativeVoteImg bi bi-caret-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                                        </svg>}
                                    </div>
                                </div>
                            </div>



                            <div id="middle" className="">
                                { ReactHtmlParser(this.state.answer) }
                                
                            </div>

                        </div>
                        <div id="footer" className="d-flex justify-content-around">
                            <div className="form-group col-xs-4 col-md-4 p-2 w-100 bd-highlight trueAnswer  flex-column">
                                
                            </div>
                            <div></div>
                            <div className="p-2 flex-shrink-1 bd-highlight mt-auto"><p className="date">Submitted on: {this.state.answerSubmiteDate}</p></div>
                        </div>
                </div>
         );
    }
}
 
export default AnswerChatBox;