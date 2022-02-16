import { useSelector } from 'react-redux'

const Users = (props) => {
    const blogs = useSelector(state.blogs);
    const users = new Set(blogs.map(b => b.author))
    console.log(users) // debug

    return null ; // TODO
}

export default Users;



