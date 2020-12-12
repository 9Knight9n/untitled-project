import React, { Component } from 'react';
import profileImg from '../img/default-profile-picture.jpg'
import exitImg from '../img/exit.png'
import { getUserAvatar } from './util';
import {request} from './requests.jsx';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import './CSS/profileOwner.css';
import editIcon from '../img/edit2.png';
import saveIcon from '../img/save.png';
import Cookies from 'js-cookie';
import SelectAvatar from './selectAvatar';

class ProfileOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatroomName: '',
            chatroomTitle: '',
            chatroomDes: '',
            chatroomLink: '',
            OwnerIsEditingName: false,
            OwnerIsEditingLink: false,
            OwnerIsEditingdes: false,
            chatroomAvatar: '',
            preview:null,
        }; 

    }

    componentDidMount = async () => {
        this.loadData();
    }

    loadData = async () => {
        // this.setState({loading:true})

        let config = {
            url:"http://127.0.0.1:8000/api/ShowChatroomProfile/",
            needToken:false,
            type:"post",
            formKey:[
                "chatroomId",
            ],
            formValue:[
                5
            ]
        };
        let data = [];
        data = await request(config);
        if (data) {
            this.setState({
                chatroomName: data.chatroomName,
                chatroomTitle: data.selectedTopic,
                chatroomDes: data.Description,
                chatroomLink: data.topicLink,
                chatroomAvatar: data.chatroom_profile_image,
                isOwner: parseInt(Cookies.get("id")) === data.owner,
            });
        }
        console.log(data)
        // this.setState({loading:false})
    }

    handleEditClick = (id) =>{
        if (id == 1)
            this.setState({
                OwnerIsEditingName : true,
            })
        if (id == 3)
            this.setState({
                OwnerIsEditingLink: true,
            })
        if (id == 4)
            this.setState({
                OwnerIsEditingDes: true,
            })
    }

    onClose() {
        this.setState({preview: null})
      }
      
      onCrop(preview) {
        this.setState({preview})
        console.log(preview)
      }
    
      async onSave(){
        let src = this.state.preview
        // console.log("save button pressed")
        // console.log("current preview:",src)
        // this.setState({avatarChanged:true,src})
        // if(isExpired(Cookies.get("access")))
        // {
        //     console.log("renewing")
        //     token=await renewToken()
        // }
        // let token = Cookies.get("access")
        // token = "Bearer "+token;
        // const form = new FormData()
        // form.set("id",Cookies.get("id"))
        // form.set("Base64",this.state.preview)
        // const response3 =
        // await axios.post('http://127.0.0.1:8000/api/editprofilepicture/', form, {
        // headers: { 'Content-Type': 'multipart/form-data',
        //             'Authorization': token
        // },
        // })

        // sessionStorage.setItem("avatar",this.state.preview)

        console.log( this.state.src)
      }
    
    render() { 
        return ( 
            // <img src={profileImg} />
            <div className="chProfileOwner chProfileOwner-main-box" style={{overflowY:"hidden"}}>
               <ReactTooltip place="right" effect="solid" type="dark"/>
                <div className="chProfileOwner-exitImg">
                     <Link to="/"> 
                        <img src={exitImg} />
                     </Link> 
                </div>

                <div class="d-flex h-100">
                    <div  className="chProfileOwner-profile d-flex flex-column">
                            <div className="chProfileOwner-headerProfile row d-flex justify-content-center">
                                <div className="chProfileOwner-profileImg col">
                                    {this.state.isOwner? 
                                    <SelectAvatar src={this.state.chatroomAvatar}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose}
                                    onSave={this.onSave} side="30" /> : <img src={this.state.chatroomAvatar} />
                                    }
                                </div>
                                <div className="chProfileOwner-chName-chTitle-chLink col">
                                    <div className="chProfileOwner-chNameBox">
                                        <div className="d-flex flex-row">
                                            <div className="chProfileOwner-chNameEditImg">{this.state.isOwner && !this.state.OwnerIsEditingName ? 
                                                <img onClick={() => this.handleEditClick(1) } alt="editIcon" data-tip="Edit" src={editIcon} /> : 
                                                this.state.OwnerIsEditingName? <img data-tip="Save" alt="saveIcon" src={saveIcon} /> : ''}
                                            </div>
                                        </div>
                                        <div className="chProfileOwner-clearFix"></div>
                                        <div className="chProfileOwner-chName">
                                            {this.state.isOwner && this.state.OwnerIsEditingName ? <input value={this.state.chatroomName}></input> : <label>{this.state.chatroomName}</label>}
                                        </div>
                                    </div>
                                    <div className="chProfileOwner-chTitle">
                                        {/* <p>email : {this.state.userEmail}</p> */}
                                        <p>{this.state.chatroomTitle}</p>
                                    </div>
                                    <div className="chProfileOwner-chLinkBox">
                                        <div className="d-flex flex-row">
                                            <label for="chProfileOwner-chLink">Chatroom link : </label> 
                                            <div className="chProfileOwner-chLinkEditImg">{this.state.isOwner && !this.state.OwnerIsEditingLink ? 
                                                <img alt="editIcon" data-tip="Edit" src={editIcon} onClick={() => this.handleEditClick(3) } /> :
                                                this.state.OwnerIsEditingLink ? <img data-tip="Save" alt="saveIcon" src={saveIcon} /> : ''
                                                }
                                            </div>
                                        </div>
                                        <div className="chProfileOwner-chLink">
                                            {this.state.isOwner && this.state.OwnerIsEditingLink ? <input value={this.state.chatroomLink}></input> : <a href={this.state.chatroomLink} target="blank">{this.state.chatroomLink}</a>}
                                        </div>
                                    </div>
                                </div> 
                            </div>
                            <div className="chProfileOwner-desBox">
                                <div className="d-flex flex-row">
                                    <label for="chProfileOwner-des">Description :</label>
                                    <div className="chProfileOwner-desEditImg">{this.state.isOwner && !this.state.OwnerIsEditingDes ? 
                                        <img alt="editIcon" data-tip="Edit" src={editIcon} onClick={() => this.handleEditClick(4)} /> :
                                        this.state.OwnerIsEditingDes ? <img alt="saveIcon" data-tip="Save" src={saveIcon} /> : ''
                                        }
                                    </div>
                                </div>
                                <div className="chProfileOwner-des">
                                    {this.state.isOwner && this.state.OwnerIsEditingDes ? <input value={this.state.chatroomDes}></input> : <p>{this.state.chatroomDes}</p>}
                                </div>
                            </div>
                            <div className="chProfileOwner-deleteButton mt-auto">
                                <button>Delete Chatroom</button>
                            </div>
                        </div>
                    {/* <div className="w-100 h-100">
                        <div className="h-100 parisa-css content-form1 d-flex justify-content-center align-items-center">
                            <div className="INPUT-FORM1">
                                <p>Name :</p>
                                <input name="lastName" value={this.state.lastName}  onChange={this.handleChange} type="text" className="input p-2" placeholder="Enter Last name"/><br></br>
                                <p>Description :</p>
                                <input name="Description" value={this.state.Description}  onChange={this.handleChange} type="text" className="input p-2" placeholder="Enter Description"/>
                                {this.state.DescriptionError? <p className="pro-error">Description Must Be Full!</p> : <br/>}
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Save Changes</button>
                                {this.state.succeed? <p className="pro-success">Saved successfully!</p> : <br/>}
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Delete Chatroom</button>
                                {this.state.succeed? <p className="pro-success">Delete successfully!</p> : <br/>}  
                            </div>
                        </div>
                    </div> */}


                        <link href="http://getbootstrap.com/examples/jumbotron-narrow/jumbotron-narrow.css" rel="stylesheet"/>
                        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"/>
                        <div className="jumbotron list-content ml-auto ">
                            <div href="#" className="chProfileOwner-list-group-item title w-100 ">
                                    Your friend zone
                            </div>
                            <ul className="list-group">
                           
                            <li href="#" className="list-group-item text-left d-flex flex-row w-100">
                                <img class="img-thumbnail" src="https://bootdey.com/img/Content/User_for_snippets.png"/>
                                <label class="name w-75 ml-3 mt-auto mb-auto">
                                    Juan guillermo cuadrado
                                </label>
                                
                               
                            </li>
                            <li href="#" className="list-group-item text-left d-flex flex-row w-100">
                                <img class="img-thumbnail"  src="https://bootdey.com/img/Content/user_1.jpg"/>
                                <label class="name w-75 ml-3 mt-auto mb-auto">
                                jo aderestand 
                                </label>
                                
                               
                            </li>
                            <li href="#" className="list-group-item text-left d-flex flex-row w-100">
                                <img class="img-thumbnail"  src="https://bootdey.com/img/Content/user_1.jpg"/>
                                <label class="name w-75 ml-3 mt-auto mb-auto">
                                jo aderestand 
                                </label>
                                
                               
                            </li>
                            <li href="#" className="list-group-item text-left d-flex flex-row w-100">
                                <img class="img-thumbnail"  src="https://bootdey.com/img/Content/user_1.jpg"/>
                                <label class="name w-75 ml-3 mt-auto mb-auto">
                                Sara Bencallin 
                                </label>
                               
                               
                            </li>
                            <li href="#" class="list-group-item text-left d-flex flex-row w-100">
                                <img class="img-thumbnail"  src="https://bootdey.com/img/Content/user_1.jpg"/>
                                <label class="name w-75 ml-3 mt-auto mb-auto">
                                Emili  
                                </label>
                                
                                <div class="break"></div>
                            </li>
                            <li href="#" class="list-group-item text-left d-flex flex-row w-100">
                                <img class="img-thumbnail"  src="https://bootdey.com/img/Content/user_1.jpg"/>
                                <label class="name w-75 ml-3 mt-auto mb-auto">
                                Amorina 
                                </label>
                               
                                <div class="break"></div>
                            </li>
                            <li href="#" class="list-group-item text-left d-flex flex-row w-100">
                                <img class="img-thumbnail"  src="https://bootdey.com/img/Content/user_2.jpg"/>
                                <label class="name w-75 ml-3 mt-auto mb-auto">
                                    Weide 
                                </label>
                                
                                <div class="break"></div>
                            </li>
                            </ul>
                        </div>
                    </div>              
            </div>          
        );
    }
}
 
export default ProfileOwner;