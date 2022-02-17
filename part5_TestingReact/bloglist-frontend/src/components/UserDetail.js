import {
    useParams
} from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetail = (props) => {
    const id = useParams().id;
    let blogs = useSelector(state => state.blogs); 
    const users = useSelector(state => state.users);
    const user = users.find(u => u.id === id)
    if (!user) return null ;
    blogs = blogs.filter(b => b.user.name === user.name)
    return (
        <div>
            <h2> {user.name} </h2>
            <h3> added blogs </h3>
            <ul>
                { blogs.map(b => {
              return (
                <li key={b.id}>{b.title}</li>
                )      
            })}
            </ul>
        </div>
    )
}

export default UserDetail;