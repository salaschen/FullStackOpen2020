import React, { useState, useEffect } from "react";
import { BlogList } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { CreateBlog } from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
    // const [user, setUser] = useState(null);
    const notification = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    // const [actionToggle, setActionToggle] = useState(false);
    // const blogs = useSelector(state => state.blogs) ;
    const user = useSelector((state) => state.user);

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
            type: "NOTIFICATION",
            data: text,
        });
        setTimeout(() => {
            dispatch({
                type: "NOTIFICATION",
                data: "",
            });
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
            // setUser(loggedInUser.data);
            dispatch({
                type: "SIGNIN_USER",
                data: loggedInUser.data,
            });
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
        dispatch({
            type: "LOGOUT",
        });
        window.localStorage.removeItem("loggedInUser");
    };

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            // setUser(JSON.parse(loggedInUser));
            dispatch({
                type: "SIGNIN_USER",
                data: JSON.parse(loggedInUser),
            });
        }

        // Initialize the blog list data
        blogService.getAll().then((blogs) => {
            dispatch({
                type: "INIT_BLOGS",
                data: blogs,
            });
        });

        // Initialize the users data
        userService.getAllUsers().then((users) => {
            console.log(users); // debug
            dispatch({
                type: "INIT_USERS",
                data: users,
            });
        });
    }, []);

    if (user === null) {
        return (
            <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginHandler={loginHandler}
            />
        );
    } else
        return (
            <Router>
                <div style={{ backgroundColor: "lightgrey" }}>
                    <Link to="/blogs">blogs</Link>{" "}
                    <Link to="/users">users</Link> {" "} {user.username} logged in{" "}
                    <button onClick={logoutHandler}>logout</button>
                </div>

                <div>
                    <Notification text={notification} />
                    <h2>blog app</h2>
                    <div>
                        <Togglable buttonLabel="create new blog">
                            <CreateBlog
                                user={user}
                                notifyFunc={displayNotification}
                                // notifyUpdate={blogListUpdted}
                            />
                        </Togglable>
                    </div>
                </div>

                <Routes>
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </Router>
        );
};

export default App;
