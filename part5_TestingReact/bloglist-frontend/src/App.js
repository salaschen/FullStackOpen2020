import React, { useState, useEffect } from "react";
import { BlogList } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { CreateBlog } from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import UserDetail from './components/UserDetail';
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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const notification = useSelector((state) => state.notification);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

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

    const loginHandler = async (event) => {
        event.preventDefault();
        const loggedInUser = await loginService.login(username, password);
        // loggin unsuccessful
        if (!loggedInUser) {
            displayNotification("login unsuccessful.");
        } else {
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
                    <Route path="/users/:id" element={<UserDetail />} />
                </Routes>
            </Router>
        );
};

export default App;
