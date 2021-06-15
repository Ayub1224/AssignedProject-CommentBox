import React, { useState } from 'react'
import moment from 'moment';
import { GrEdit } from "react-icons/gr";
import { FaRegImage, FaShare, FaTrashAlt } from "react-icons/fa";
import { MdTextsms } from "react-icons/md";
import './cmntbox.css'
import Modal from './Modal'
import { Comdisp } from './interface'

const ComDisp = ({ data, dataSend, setData }: Comdisp) => {

    const [isOPen, setisOPen] = useState(false)
    const [isOPenreply, setisOPenreply] = useState<boolean>(false)
    const [replyData, setReplyData] = useState([])

    const editComt = (e:any) => {
        console.log(e)
    }

    const deleteFile = (tagId: number): void => {
        setData(dataSend.filter(id => id.timeStamp !== tagId))
    }

    return (<>
        {dataSend?.map((item) => (
            // div
            <div className="cmntSUb" key={item.timeStamp}>
                <div className="bodyCmnt">
                    <img src={data.image} alt="" />
                    <h3>{data.id}</h3>
                    <p>posted a comment</p>
                </div>
                {/* edit */}
                <div className="dispBody">
                    <div className="username"><p>@{item.userName}</p></div>
                    <div className="commentBody">{item.comment}</div>
                </div>
                <div className="fileSection">
                    <div className="attachfiles">
                        <div className="icon"><FaRegImage /></div>
                        <div className="fileData"><p>{item.file}</p></div>
                    </div>
                    <div className="action">
                        <div className="actionPerform">
                            <div className="time">{item?.timeStamp && moment(item.timeStamp).local().startOf('seconds').fromNow()}</div>
                            <div className="modal"><button className="btncmt" onClick={() => setisOPen(true)}><FaShare />  Reply</button>

                                <Modal open={isOPen} onClose={() => setisOPen(false)} userName={item.userName} sNumber={item.timeStamp} setREplyData={setReplyData}></Modal>

                            </div>
                            <button className="btncmt" onClick={e => editComt(item.timeStamp)}><GrEdit />  Edit</button>
                            <button className="btncmt" onClick={e => deleteFile(item.timeStamp)}><FaTrashAlt />  Delete</button>
                            <button className="btncmt" onClick={() => setisOPenreply(!isOPenreply)}
                            ><MdTextsms /> Show replies</button>
                        </div>
                    </div>
                    <div className="dispBody1">{isOPenreply && replyData.map((item:any) => (
                        item?.parentId === item.timeStamp &&
                        <div className="dispBody" key={item.childId}>
                            <div className="username"><p>@{item.userName}</p></div>
                            <div className="commentBody">{item.reply}</div>
                        </div>
                    ))}</div>
                </div>
            </div>
        ))}


    </>)
}

export default ComDisp

