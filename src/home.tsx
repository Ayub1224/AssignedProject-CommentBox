import React, { useState, useEffect, FC } from 'react'
import './comment.css'
import moment from 'moment';
import { File } from './interface'
import ComDisp from './comDIsp'



const Home: FC = () => {
    const [Data, setData] = useState<any>('');
    const [file, setFile] = useState<File[]>([]);
    const [text, settext] = useState<string>('');
    const [fileLoad, setFIleLoad] = useState<FileList | null | string>(null);
    useEffect(() => {
        fetch('https://api.github.com/users/ayub1224').then(resp => resp.json()).then(e => setData({ id: e.login, image: e.avatar_url }))
        console.log('Inside the useEffect hook')
    }, [])


    function handleSubmit(e: any) {
        e.preventDefault();
        let spliceData = stringSplice(text);
        let onlycomment = text.replace("@" + spliceData, "")

        const data = {
            file: fileLoad.name,
            timeStamp: moment.now(),
            userName: spliceData,
            comment: onlycomment
        }
        setFile([...file, data])
        settext('');
    }


    const handleFileSubmit = (event: any): void => {
        setFIleLoad(event.target.files[0]);        // file uploaded
    }

    const stringSplice = (text: any): string | boolean => {
        if (text.match(/@[a-zA-Z0-9]+/)) {
            return text.match(/@[a-zA-Z0-9]+/)[0].substring(1);
        }
        else {
            alert("you need to tag a person with @");
            return false
        }
    }


    return (
        <div className="commentSection">
            <div className="formComment">
                <form className='formSection' onSubmit={handleSubmit}>
                    <label htmlFor="comment">Comments</label>
                    <input type="text" value={text} className="input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => settext(e.target.value)} placeholder=' Ask a question, add a comment and collaborate' />

                    <div className="submitSection">
                        <div className="attachFiles">
                            <input type="file" onChange={handleFileSubmit} />
                        </div>
                        <div className="formFunction">
                            <button className="btn" type="submit">post</button>
                        </div>
                    </div>

                </form>
                <ComDisp data={Data} dataSend={file} setData={setFile} />

            </div>
        </div>
    )
}

export default Home
