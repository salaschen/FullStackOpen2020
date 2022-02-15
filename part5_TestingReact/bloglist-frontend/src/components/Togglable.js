import { useState } from 'react';
import PropTypes from 'prop-types' ;

const Togglable = (props) => {
    const [ visible, setVisible ] = useState(false) ; 

    const hideWhenVisible = visible? 'none': '';
    const showWhenVisible = visible? '': 'none' ;

    const toggle = () => {
        setVisible(!visible) ; 
    }

    return (
        <span>
            <span style={{display: hideWhenVisible}}>
                <button onClick={() => toggle()}> {props.buttonLabel}</button>
            </span>
            <span style={{display: showWhenVisible}}>
                {props.children}
                <button onClick={() => toggle()}> cancel</button>
            </span>
        </span>
    );
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable ;