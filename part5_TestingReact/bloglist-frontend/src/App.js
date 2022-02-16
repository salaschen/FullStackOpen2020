import React, { useState, useEffect } from "react";
import { BlogList } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { CreateBlog } from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useSelector, useDispatch} from 'react-redux'

// render the notification component.
const Notification = ({ text }) => {
    if (text === "") {
        return null;
    }

    return (
        <div>
            <p style={{ backgroundColor: "red", color: "white" }}> {text} </p>
        </div>
    );
};


const App = () => {
    // const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const notification = useSelector(state => state.notification);
    const dispatch = useDispatch();
    const [actionToggle, setActionToggle] = useState(false);
    const blogs = useSelector(state => state.blogs) ;

    // deprecated, upgraded to redux
    /**
    const displayNotification = (text, delay=5000 ) => {
        setNotifyText(text) ;
        setTimeout(() => {
            setNotifyText('') ;
        }, delay) ;
    }
    */
    const displayNotification = (text, delay = 5000) => {
        dispatch({
            type: 'NOTIFICATION',
            data: text
        })
        setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION',
                data: ''
            })
        }, delay);
    };

/*     const blogListUpdted = () => {
        const curToggle = actionToggle;
        setActionToggle(!curToggle);
    }; */

    const loginHandler = async (event) => {
        event.preventDefault();
        const loggedInUser = await loginService.login(username, password);
        // loggin unsuccessful
        if (!loggedInUser) {
            displayNotification("login unsuccessful.");
        } else {
            setUser(loggedInUser.data);
            setUsername("");
            setPassword("");
            window.localStorage.setItem(
                "loggedInUser",
                JSON.stringify(loggedInUser.data)
            );
        }
    };

    const logoutHandler = (event) => {
        event.preventDefault();
        setUser(null);
        window.localStorage.removeItem("loggedInUser");
    };

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }

        // Initialize the blog list data
        blogService.getAll().then((blogs) => {
            dispatch({
                type: 'INIT_BLOGS',
                data: blogs
            })
        });
    }, []);

    return (
        <div>
            <Notification text={notification} />
            {user === null ? (
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    loginHandler={loginHandler}
                />
            ) : (
                <div>
                    <h2> blogs </h2>
                    <p>
                        {" "}
                        {user.username} logged in{" "}
                        <button onClick={logoutHandler}>logout</button>
                    </p>
                    <Togglable buttonLabel="create new blog">
                        <CreateBlog
                            user={user}
                            notifyFunc={displayNotification}
                            // notifyUpdate={blogListUpdted}
                        />
                    </Togglable>
                </div>
            )}

            {/* only show the list of blogs when user is logged in */}
            {user !== null && <BlogList />}
        </div>
    );
};

export default App;