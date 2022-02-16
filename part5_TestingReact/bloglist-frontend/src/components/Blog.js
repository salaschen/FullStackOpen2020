import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import BlogService from "../services/blogs";
import { useDispatch, useSelector } from 'react-redux';

const handleLike = (blog, dispatch) => {

    const newBlog = {
        ...blog,
        user: blog.user?.id,
        likes: blog.likes + 1,
    };

    // Database operation
    const result = BlogService.updateBlog(newBlog);

    // Locally update the data, don't need to retrieve all the data again. 
    if (result) {
        blog.likes += 1;
    }

    // update the redux state
    dispatch({
        type: "LIKE_BLOG",
        data: blog.id
    })

};

const Blog = ({ blog, handleLike }) => {
    const [toFold, setToFold] = useState(true);
    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch()
    const [divStyle, setDivStyle] = useState({
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    });

    const id = uuid();
    // console.log('blog:', blog) ; // debug
    const showDetail = toFold ? "none" : "";
    const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
    const showRemove = user && user.user_id === blog.user?.id ? "" : "none";

    const handleToggle = async () => {
        const button = document.getElementById(`${id}`);
        const temp = !toFold;
        setToFold(temp);
        if (!temp) {
            button.textContent = "hide";
        } else {
            button.textContent = "view";
        }
    };

    const handleRemove = () => {
        const confirm = window.confirm(
            `Remove blog ${blog.title} by ${blog.author}?`
        );
        const user = JSON.parse(window.localStorage.getItem("loggedInUser"));
        if (!user) {
            alert("only logged in user can perform the remove action.");
            return;
        }
        const token = user.token;
        if (confirm) {
            const result = BlogService.deleteBlog(blog, token);
            if (result) {
                // locally remove the blog from the store
                dispatch({
                    type: 'REMOVE_BLOG',
                    data: blog.id
                })

                /**
                setDivStyle({
                    ...divStyle,
                    display: "none",
                });
                */
            }
        }
    };

    return (
        <div style={divStyle}>
            <div className="BlogDescription">
                {blog.title} {blog.author}{" "}
                <button onClick={handleToggle} id={id}>
                    {" "}
                    view{" "}
                </button>
            </div>
            <div style={{ display: showDetail }} className="BlogDetailDiv">
                <div className="BlogUrl">url: {blog.url}</div>
                <div className="BlogLikes">
                    likes {blog.likes}{" "}
                    <button onClick={() => handleLike(blog, dispatch)}>like</button>
                </div>
                <div>author: {blog.author} </div>
                <button style={{ display: showRemove }} onClick={handleRemove}>
                    remove
                </button>
            </div>
        </div>
    );
};

const BlogList = () => {
    const blogs = useSelector(state => state.blogs);

    // sort the blogs by the number of likes
    blogs.sort((b1, b2) => b2.likes - b1.likes);

    return (
        <div>
            <h3> List of Blogs </h3>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} handleLike={handleLike} />
            ))}
        </div>
    );
};

export { Blog, BlogList };
