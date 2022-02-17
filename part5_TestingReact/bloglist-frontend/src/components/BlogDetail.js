import {
    useParams
} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { handleLike} from './Blog';

const BlogDetail = () => {
    const blogs = useSelector(state => state.blogs);
    const id = useParams().id;
    const blog = blogs.find(b => b.id === id);
    const dispatch = useDispatch();
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
        </div>
    );
}

export default BlogDetail ;