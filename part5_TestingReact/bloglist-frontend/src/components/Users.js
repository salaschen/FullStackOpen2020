import { useSelector } from 'react-redux'

const Users = (props) => {
    const blogs = useSelector(state => state.blogs);
    // console.log(blogs) // debug
    const users = new Set(blogs.map(b => b.user.name.toLowerCase()))
    // const users = useSelector(state => state.users) ; 
    const userList = [];
    for (let name of users) {
        userList.push(name)
    }

    // console.log(users) // debug
    const count = new Map()
    for (let i = 0 ; i < blogs.length ; i++) {
        let blog = blogs[i];
        let name = blog.user.name.toLowerCase()
        if (count.has(name)) {
            count.set(name, count.get(name) + 1)
        }
        else {
            count.set(name, 1)
        }
    }

    // console.log(count) ; // debug

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                <tr><th></th><th>blogs created</th></tr>
                </thead>
                <tbody>
                { 
                    userList.map(name  => {
                        // console.log(name, count.get(name)) ; // debug
                    return (
                    <tr key={name}>
                        <td> {name} </td>
                        <td> {count.get(name)} </td>
                    </tr>
                    )})
                }
                </tbody>
            </table>
        </div>
    );
}

export default Users;



