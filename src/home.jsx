import React, { useEffect, useState } from 'react'
import './comment.css'
import ComDisp from './cmntdisplay'
import moment from 'moment';



export default function Home() {

    const [Data, setData] = useState('');       // admin data for cmnt
    const [CommentData , setCommentData]= useState([]);
    const [text, settext] = useState('');           // form data 
    const [fileLoad, setFIleLoad] = useState(null);         // uploaded file

    useEffect(() => {
        fetch('https://api.github.com/users/ayub1224').then(resp => resp.json()).then(e => setData({ id: e.login, image: e.avatar_url }))
        setCommentData(JSON.parse(localStorage.getItem('comments'))||[])
    }, [])



    const handleSubmit = (e) => {
        e.preventDefault();
        const commentArray = localStorage.getItem("comments")
        let temp = [];                                              // empty array for local storage
        let randomId = Math.random().toString(36).substring(7);

        let spliceData = stringSplice(text);
        // if(!spliceData){
            
        //     return
        // }
        let string = text;
        let onlycomment = string.replace("@"+spliceData, "")
        if (commentArray !== null) {
            temp = [...JSON.parse(commentArray)]
        }
        if(!fileLoad?.name){
            alert("please Uplad a file")
            return
        }
        temp.push({
            sno:randomId,
            userName: spliceData,          // text input local storage me save
            comments: onlycomment,
            file: fileLoad.name,
            timeStamp:moment.now() 
        })
        setCommentData([...temp]);

        localStorage.setItem("comments", JSON.stringify(temp))
        settext('');

    }

    const stringSplice = (text) => {
        if(text.match(/@[a-z0-9]+/)){
            return text.match(/@[a-z0-9]+/)[0].substring(1);
        }
        else {
            alert("you need to tag a person with @");
            return false
        }
    }


    const handleFileSubmit = (event) => {
        setFIleLoad(event.target.files[0]);        // file uploaded
    }

    return (
        <div className="commentSection">
            <div className="formComment">
                <form className='formSection' onSubmit={handleSubmit}>
                    <label htmlFor="comment">Comments</label>
                    <textarea name="" id="comment" cols="30" rows="2" value={text} onChange={e => settext(e.target.value)} placeholder=' Ask a question, add a comment and collaborate' > </textarea>
                    <div className="submitSection">
                        <div className="attachFiles">
                            <input type="file" onChange={handleFileSubmit} />
                        </div>
                        <div className="formFunction">
                            {/* <p>Visible To </p> */}
                            <button className="btn" type="submit">post</button>
                        </div>
                    </div>

                </form>
                <ComDisp data={Data} commentData={CommentData} />

            </div>
        </div>
    )

}
