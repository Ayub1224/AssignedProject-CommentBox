import React, { useState } from 'react'
import './cmntbox.css'
import { props, data } from './interface'



// export default function Modal({ open, userName, sNumber, onClose, setREplyData }) {
const Modal = ({ open, userName, sNumber, onClose, setREplyData }: props) => {
    const [ReplyText, setReplyText] = useState<string>('')
    const [replyData, setReplyData] = useState<data[]>([])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const Data = {
            childId: Date.now(),
            parentId: sNumber,
            reply: ReplyText,
            userName: userName
        }
        setReplyData([Data, ...replyData])
        onClose()
        setReplyText('')
        setREplyData(replyData)
    }
//SetStateAction<never[]>'

    if (!open) return null
    return (
        <>
            <div className="overlay" />
            <div className="ModalReply">
                <form className="replyForm" >
                    <div className="username replyTag"><p>{"@" + userName}</p></div>
                    <div className="tagContent">
                        {/* <textarea name="" id="comment" cols="30" rows="1" value={ReplyText} onChange={(e: React.ChangeEvent<HTMLAreaElement): void => setReplyText(e.target.value)}/> */}
                        <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReplyText(e.target.value)} value={ReplyText} />
                        <button type="submit" className="btnReply" onClick={handleSubmit}>Reply</button>
                    </div>
                </form>

            </div>

        </>
    )
}
export default Modal