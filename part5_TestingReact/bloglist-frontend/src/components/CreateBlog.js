import React, { useState } from "react";
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';

const CreateBlog = ({user, notifyFunc}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();

    const formHandler = async (event) => {
        event.preventDefault() ;
        const token = user.token  ;
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        const result = await blogService.postNew(newBlog, token) ;
        
        if (result) {
            notifyFunc('blog added successfully') ;
            setTitle('');
            setAuthor('') ;
            setUrl('') ; 
            dispatch({
                type: "NEW_BLOG",
                data: result.data
            })
        } else {
            notifyFunc('blog added failed.') ;
        }
    }

    return (
        <form onSubmit={formHandler}>
            <h3> create new</h3>
            <div>
                title:
                <input
                    id="title"
                    type="text"
                    value={title}
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    id="author"
                    type="text"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input id="url" type="text" value={url} name="url" 
                onChange={({target}) => setUrl(target.value)}
                />
            </div>
            <button id="submitButton" type="submit">create</button>
        </form>
    );
};

export { CreateBlog };
