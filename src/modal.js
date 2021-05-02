import React, { useEffect, useState } from 'react'
import './cmntbox.css'



export default function Modal({ open,sNumber,userName, onClose,setNewReplies }) {
    const [LocalData, setLocalData] = useState('')
    const [ReplyText, setReplyText] = useState('');
    const [oldReplies, setReplies] = useState({});

    useEffect(() => {
        setLocalData(JSON.parse(localStorage.getItem("comments")));
        setReplies(JSON.parse(localStorage.getItem("Reply")) || {})
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const commentArray = localStorage.getItem("comments")
        let replies = {}
        let temp = {};                                             // empty array for local storage
        let randomId = Math.random().toString(36).substring(7);

        // let spliceData = stringSplice(ReplyText);
        // let string = ReplyText;
        // let onlycomment = string.replace("@" + spliceData, "")
        replies[randomId] = {
            userName: userName,          // text input local storage me save
            comments: ReplyText,
            parentId: sNumber,
        }

        let modifiedReplies = {...oldReplies,...replies};
        setReplies(modifiedReplies)

        localStorage.setItem("Reply", JSON.stringify(modifiedReplies))
        setReplyText('');
        setNewReplies(modifiedReplies)
        onClose();
    }

    // const stringSplice = (text) => {
    //     return text.match(/@[a-z0-9]+/)[0].substring(1);
    // }


    if (!open) return null
    return (
        <>
            <div className="overlay" />
            <div className="ModalReply">
                <form className="replyForm" onSubmit={handleSubmit}>
                    <div className="username replyTag"><p>{"@" +userName}</p></div>
                    <div className="tagContent">
                        <textarea name="" id="comment" cols="30" rows="1" value={ReplyText} onChange={e => setReplyText(e.target.value)}></textarea>
                        <button type="submit" className="btnReply" onClick={() => onClose}>Reply</button>
                    </div>
                </form>

            </div>

        </>
    )
}