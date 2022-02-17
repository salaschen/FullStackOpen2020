import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const getComments = (blogId) => {
    const request = axios.get(`${baseUrl}/${blogId}/comments`);
    return request.then((response) => response.data);
};

const postComments = (blogId, comment) => {
    const request = axios.post(`${baseUrl}/${blogId}/comments`, comment) ;
    return request.then(response => response.data) ;
};

const postNew = async (blog, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    };
    try {
        return axios.post(baseUrl, blog, config);
    } catch (error) {
        return false;
    }
};

const updateBlog = async (blog) => {
    const id = blog.id;
    const url = `${baseUrl}/${id}`;
    try {
        await axios.put(url, blog);
        return true;
    } catch (error) {
        return false;
    }
};

const deleteBlog = async (blog, token) => {
    const id = blog.id;
    const url = `${baseUrl}/${id}`;
    const config = {
        headers: { Authorization: `bearer ${token}` },
    };
    try {
        await axios.delete(url, config);
        return true;
    } catch (error) {
        return false;
    }
};

export default {
    getAll,
    getComments,
    postComments,
    postNew,
    updateBlog,
    deleteBlog,
};
