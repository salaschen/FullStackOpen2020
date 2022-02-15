import React, { useState, useEffect } from "react";
import { BlogList } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login" ;
import { CreateBlog } from './components/CreateBlog' ;
import Togglable from './components/Togglable' ;
import LoginForm from './components/LoginForm' ;
import { createStore } from 'redux';

// the reducer for the Notification
const notifyReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data;
        default:
            return state;
    }
}

// render the notification component.
const Notification = ({text}) => {
    if (text === '') {
        return null
    }

    return (
        <div>
            <p style={{backgroundColor: 'red', color: 'white'}}> {text} </p>
        </div>
    )
}

const store = createStore(notifyReducer)

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null) 
    const [notifyText, setNotifyText] = useState('')
    const [actionToggle, setActionToggle] = useState(false)

    const displayNotification = (text, delay=5000 ) => {
        setNotifyText(text) ;
        setTimeout(() => {
            setNotifyText('') ;
        }, delay) ;
    }

    const blogListUpdted = () => {
        const curToggle = actionToggle ; 
        setActionToggle(!curToggle) ;
    }

    const loginHandler = async (event) => {
        event.preventDefault() ;
        const loggedInUser = await loginService.login(username, password) ; 
       // loggin unsuccessful
        if (!loggedInUser) {
            displayNotification('login unsuccessful.')
        }
        else {
            setUser(loggedInUser.data) ;
            setUsername('') ;   
            setPassword('') ;
            window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser.data)) ;
        }
    }

    const logoutHandler = (event) => {
        event.preventDefault() ;
        setUser(null) ;
        window.localStorage.removeItem('loggedInUser');
    }

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser)) ;
        }
        blogService.getAll().then((blogs) => {
            setBlogs(blogs);
        });
    }, [actionToggle]);

    return (
        <div>
            <Notification text={notifyText} />
            { 
                user === null? 
                <LoginForm 
                    username={username} setUsername={setUsername}
                    password={password} setPassword={setPassword}
                    loginHandler={loginHandler}
                />
                :
                (
                    <div>
                        <h2> blogs </h2>
                        <p> {user.username} logged in <button onClick={logoutHandler}>logout</button></p>
                        <Togglable buttonLabel="create new blog">
                            <CreateBlog 
                                user={user} 
                                notifyFunc={displayNotification}
                                notifyUpdate={blogListUpdted}
                            />
                        </Togglable>

                    </div>
                )
            }

            {/* only show the list of blogs when user is logged in */}
            {
                user !== null && 
                <BlogList blogs={blogs} />
            }
        </div>
    );
};

export default App;
