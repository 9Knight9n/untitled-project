import React, { Component } from 'react';
import './CSS/ProfilePreview.css';
import profileImg from '../img/default-profile-picture.jpg'
import exitImg from '../img/exit.png'
import { getUserAvatar } from './util';
import {request} from './requests.jsx';
import {generatePath, Link} from 'react-router-dom';
import  askedQImg from '../img/askedQuestion.png';
import  answeredQImg from '../img/answeredQuestion.png';
import groupChat from '../img/group.png';
import ReactTooltip from 'react-tooltip';
import {decodeList} from './util'

const options = [
    { value: 'java', label: 'java' },
    { value: 'php', label: 'php' },
    { value: 'python', label: 'python' },
    { value: 'c', label: 'c' },
    { value: 'c++', label: 'c++' },
    { value: 'c#', label: 'c#' },
    { value: 'html', label: 'html' },
    { value: 'css', label: 'css' },
    { value: 'java-script', label: 'java script' }
]

class ProfilePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            // userEmail: 'sadegh@yahoo.com',
            userName: '',
            userId: this.props.userid,
            userBio: '',
            userIntrests: [],
            askedQ: '',
            answeredQ: '',
            numOfChatroom: '',
            profileAvatar: '',
        }; 

    }

    componentDidMount = async () => {
        if (!sessionStorage.getItem("15" + ":avatar")) {
            await getUserAvatar("15");  
        }
        this.loadData();
    }
    loadData = async () => {
        // this.setState({loading:true})
        console.log('entred loadData....')
        let config = {
            url:"http://127.0.0.1:8000/api/ShowUserProfile/",
            needToken:false,
            type:"post",
            formKey:[
                "user_id",
            ],
            formValue:[
                this.state.userId
            ]
        };
        let data = [];
        data = await request(config);
        if (data) {
            console.log("LOADING......",)
            this.setState({
                first_name: data.first_name,
                last_name: data.last_name,
                userName: data.username,
                userBio: data.description,
                askedQ: data.askedQuestions,
                answeredQ: data.answeredQuestions,
                numOfChatroom: data.numberOfChatrooms,
                profileAvatar: data.user_profile_image
                // userIntrests: decodeList(options, "111111111")
            });
            let userIntrests = decodeList(options, data.interests)
            // console.log("user intersting:  ", userIntrests)
            this.setState({
                userIntrests
            })
        }
        console.log(data)
        // this.setState({loading:false})
    }

    modalClick = (e) => {
        // e.preventDefault();
        e.stopPropagation();
        return false;
      }

    render() { 
        return ( 
            <div id="profilePreview">
            {this.props.showProfilePreview?
              <div onClick={() => this.props.hideProfilePreview()} className="modal">
                <section onClick={this.modalClick} className="modal-main d-flex flex-column">
                    <div className="ProfilePreview ProfilePreview-main-box ">
                        <ReactTooltip place="right" effect="solid" type="dark"/>
                        <div className="ProfilePreview-exitImg">
                            {/* <Link to="/"> */}
                                <img onClick={() => this.props.hideProfilePreview()} src={exitImg} />
                            {/* </Link> */}
                        </div>
                        <div className="ProfilePreview-elements mb-3">
                            <div  className="ProfilePreview-profile">
                                <div className="ProfilePreview-headerProfile row d-flex justify-content-center">
                                    <div className="ProfilePreview-profileImg col">
                                        <img src={this.state.profileAvatar} />
                                    </div>
                                    <div className="ProfilePreview-first_name-last_name-email-userName col">
                                        <div className="ProfilePreview-first_name-last_name">
                                            <h1>{this.state.first_name} {this.state.last_name}</h1>
                                        </div>
                                        <div className="ProfilePreview-email-userName d-flex">
                                            {/* <p>email : {this.state.userEmail}</p> */}
                                            <label for="ProfilePreview-userName-P">username : </label>
                                            <p className="ProfilePreview-userName-P ml-1">{this.state.userName}</p>
                                        </div>
                                        <div className="ProfilePreview-intrestsBox">
                                            <label for="ProfilePreview-intrests">Intrested In : </label> 
                                            <div className="ProfilePreview-intrests">
                                                <p>
                                                    {this.state.userIntrests.map(ui => ui.value + "  ,  ")}
                                                </p>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div className="ProfilePreview-bioBox">
                                    <label for="ProfilePreview-bio">Bio :</label>
                                    <div className="ProfilePreview-bio">
                                        <p>
                                            {this.state.userBio}
                                        </p>
                                    </div>
                                </div>
                                <div className="ProfilePreview-activity">
                                    <div className="ProfilePreview-user-activity d-flex justify-content-around">
                                        <div className="ProfilePreview-asked-questions d-flex justify-content-center">
                                            <img src={askedQImg} data-tip={this.state.userName + " asked " + this.state.askedQ +" questions"} /> 
                                            <p>{this.state.askedQ}</p> 
                                        </div>
                                        <div className="ProfilePreview-joined-chatrooms d-flex justify-content-center">
                                            <img src={groupChat} data-tip={this.state.userName+ " joined " + this.state.numOfChatroom +" chatrooms"} /> 
                                            <p>{this.state.numOfChatroom}</p>
                                            </div>
                                        <div className="ProfilePreview-answered-questions d-flex justify-content-center">
                                            <img src={answeredQImg} data-tip={this.state.userName + " answered " + this.state.askedQ +" questions"} /> 
                                            <p>{this.state.answeredQ}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            :""}
            
          </div>
         );
    }
}
 
export default ProfilePreview;