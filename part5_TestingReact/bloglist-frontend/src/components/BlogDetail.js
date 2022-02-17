import {
    useParams
} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { handleLike} from './Blog';
import { useState, useEffect } from 'react';
import blogService from '../services/blogs';

const BlogDetail = () => {
    const [ comments, setComments ] = useState([]);

    const blogs = useSelector(state => state.blogs);
    const id = useParams().id;
    const blog = blogs.find(b => b.id === id);
    const dispatch = useDispatch();

    useEffect(() => {
        blogService.getComments(id).then(data => {
            console.log(data); // debug
            setComments(data) ;
        })
    }, []);

    if (!blog) return null ;

    return (
        <div>
            <h2>{blog.title}</h2>
            <div><a href={`${blog.url}`}>{blog.url}</a></div>
            <div>
                {blog.likes} likes {" "}
                <button onClick={() => handleLike(blog, dispatch)}>like</button>
            </div>
            <div>added by {blog.author}</div>
            {/* add the list of comments */}
            <div>
                <h3>comments</h3>
                <ul>
                    { comments.map(com => 
                        <li key={com.id}> {com.data} </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default BlogDetail ;