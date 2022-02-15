import PropTypes from 'prop-types' ;

// Render the login form component.
const LoginForm = ({username, setUsername, password, setPassword, loginHandler }) => {
    return (
        <form onSubmit={loginHandler}>
            <h2> log in to application </h2>
            <div>
                username
                <input id="username" type="text" name="username" value={username} 
                onChange={( {target}) => setUsername(target.value)} />
            </div>
            <div>
                password
                <input id="password" type="password" name="password" value={password}
                onChange={( {target} ) => setPassword(target.value) } />
            </div>
            <div>
                <button type="submit"> login </button>
            </div>
        </form>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    loginHandler: PropTypes.func.isRequired
}

export default LoginForm