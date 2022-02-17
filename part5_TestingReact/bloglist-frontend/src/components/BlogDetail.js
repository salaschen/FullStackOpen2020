import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLike } from "./Blog";
import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { v4 as uuid } from 'uuid';

const BlogDetail = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const blogs = useSelector((state) => state.blogs);
    const id = useParams().id;
    const blog = blogs.find((b) => b.id === id);
    const dispatch = useDispatch();

    useEffect(() => {
        blogService.getComments(id).then((data) => {
            // console.log(data); // debug
            setComments(data);
        });
    }, []);

    const handleAddComment = (event) => {
        event.preventDefault() ;
        const comment = {
            blogId: id,
            data: newComment
        }
        blogService.postComments(id, comment)
        .then(response => {
            setComments(comments.concat({...comment, id: uuid()})) // manually add new comment
            setNewComment('') ;
        }).catch(exception => {
            console.log(exception);
        })
    }

    if (!blog) return null;

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>
                <a href={`${blog.url}`}>{blog.url}</a>
            </div>
            <div>
                {blog.likes} likes{" "}
                <button onClick={() => handleLike(blog, dispatch)}>like</button>
            </div>
            <div>added by {blog.author}</div>
            {/* add the list of comments */}
            <div>
                <h3>comments</h3>
                <div>
                    <form onSubmit={handleAddComment}>
                        <input
                            id="comment"
                            type="text"
                            value={newComment}
                            onChange={({ target }) => {
                                setNewComment(target.value);
                            }}
                        />
                        <button type="submit">add comment</button>
                    </form>
                </div>
                <ul>
                    {comments.map((com) => (
                        <li key={com.id}> {com.data} </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogDetail;
