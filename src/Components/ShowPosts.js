import { useDispatch } from "react-redux";
import { selectPost } from '../features/posts/postsSlice';

const ShowPosts = ({ allPosts, navigate }) => {
    const dispatch = useDispatch();


    const selectThisPost = (id) => {
        console.log(id);
        dispatch(selectPost(id));
        navigate('/editPost');
    }
    return <div className="row">
        <label>All posts created by users</label>
        {allPosts.map((post, index) => {
            return (<div key={index}>
                <article className="two columns">
                    <h6>{post.title}</h6>
                    <p className="postCredit">{post.description}</p>
                    <p className="authorFont">Author: {post.author}</p>
                    <button onClick={() => selectThisPost(post.id)} >Edit Post</button>
                </article>
            </div >)
        })}
    </div >
}

export default ShowPosts;