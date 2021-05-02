import React, { Component } from 'react'
import { GrEdit } from "react-icons/gr";
import { FaRegImage, FaShare, FaTrashAlt } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";
import './cmntbox.css'
import Modal from './modal';
import moment from 'moment';

export class cmntdisplay extends Component {

    state = {
        commentData: [],
        editFlag: false,
        editedComment: "",
        isOPen: false,             //for reply modal
        furtherReply: false,
        repliesData: {},
        selectedComment: "",
        ReplyNO: ""
    }

    componentDidMount() {
        this.setState({ commentData: this.props.commentData || JSON.parse(localStorage.getItem("comments")), repliesData: JSON.parse(localStorage.getItem("Reply")) })
    }
    // **********************************************************************************************
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.commentData !== this.props.commentData) {
            this.setState({ commentData: this.props.commentData || JSON.parse(localStorage.getItem("comments")) })
        }
    }



    editComt = (cmnt) => {
        this.setState({ editFlag: cmnt })
    }


    deleteFile = (cmnt) => {
        let newCommentData = [...this.state.commentData]
        let deleteComment = newCommentData.filter((comment) => cmnt !== comment.sno)

        localStorage.setItem("comments", JSON.stringify(deleteComment));
        let repliesData = this.state.repliesData;
        this.setState({ commentData: deleteComment, repliesData: repliesData });
    }



    editChange(e) {
        this.setState({ editedComment: e.target.value })
    }

    saveChanges(sno) {
        let oldData = [...this.state.commentData]
        let editedComment = this.state.editedComment;
        let newComment = {}
        for (let i = 0; i < oldData.length; i++) {
            if (oldData[i].sno === sno) {
                newComment["comments"] = editedComment.replace("@" + newComment["userName"], "")
                oldData[i] = { ...oldData[i], ...newComment }
            }
        }
        this.setState({ commentData: oldData, editFlag: false, editedComment: "" })
        localStorage.setItem("comments", JSON.stringify(oldData))
    }

    renderEditComment(sno, commentValue) {
        return (<>
            <div className="overlay" />
            <div className="ModalReply">
                {this.state.editFlag === sno && <textarea id="comment" name={sno} value={this.state.editedComment ? this.state.editedComment : commentValue} onChange={(e) => { this.editChange(e) }}></textarea>}
                <button className="btnReply" onClick={() => this.saveChanges(sno)}>Save Changes</button>
            </div>
        </>
        )
    }

    renderReplies(sno) {
        return (
            this.state.selectedComment === sno && Object.values(this.state.repliesData || {}).map((reply, index) => (
                reply?.parentId === this.state.selectedComment && <div className="dispBody" key={index}>
                    <div className="username"><p>@{reply.userName}</p></div>
                    <div className="commentBody">{reply.comments}</div>
                </div>
            ))
        )
    }
    //<div className="dispBody1" key={index}>{reply.userName + " " + reply.comments}</div>



    setNewReplies(newReplies) {
        this.setState({ repliesData: newReplies })
    }

    renderComment() {
        return (
            (this.state.commentData)?.map((o) => (
                <div className="cmntSUb" key={o.sno}>
                    <div className="bodyCmnt">
                        <img src={this.props.data.image} alt="" />
                        <h3>{this.props.data.id}</h3>
                        <p>posted a comment</p>
                    </div>
                    { (!this.state.editFlag || this.state.editFlag !== o.sno) && <div className="subBody">
                        <div className="dispBody">
                            <div className="username"><p>@{o.userName}</p></div>
                            <div className="commentBody">{o.comments}</div>
                        </div>
                        <div className="fileSection">
                            <div className="attachfiles">
                                <div className="icon"><FaRegImage /></div>
                                <div className="fileData"><p>{o.file}</p></div>
                            </div>
                            <div className="action">
                                <div className="actionPerform">
                                    <div className="time">{o?.timeStamp && moment(o.timeStamp).local().startOf('seconds').fromNow()}</div>
                                    <div className="modal"><button className="btncmt" onClick={() => this.setState({ isOPen: true, ReplyNO: o.sno })} ><FaShare />  Reply</button>
                                        <Modal open={this.state.isOPen} onClose={() => this.setState({ isOPen: false })} userName={o.userName} sNumber={this.state.ReplyNO} setNewReplies={this.setNewReplies.bind(this)}></Modal>

                                    </div>
                                    <button className="btncmt" onClick={e => this.editComt(o.sno)}><GrEdit />  Edit</button>
                                    <button className="btncmt" onClick={e => this.deleteFile(o.sno)}><FaTrashAlt />  Delete</button>
                                    <button className="btncmt" onClick={() => {
                                        let selectedComment = o.sno
                                        if (this.state.selectedComment === o.sno) {
                                            selectedComment = "";
                                        }
                                        this.setState({ selectedComment })
                                    }}><MdTextsms /> Show replies</button>
                                </div>
                            </div>
                            <div className="dispBody1">{this.renderReplies(o.sno)}</div>
                        </div>
                    </div>}
                    {this.state.editFlag === o.sno && this.renderEditComment(o.sno, o.comments)}

                </div>

            ))
        )
    }




    render() {

        return (
            <div className="container">
                {this.renderComment()}
            </div>

        )
    }
}

export default cmntdisplay