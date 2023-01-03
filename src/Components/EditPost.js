import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { selectEditPost, updateOldPost } from '../features/posts/postsSlice';

const EditPost = ({ navigate }) => {
    const selectedPost = useSelector(selectEditPost);


    const dispatch = useDispatch();

    const [newTitle, setNewTitle] = useState(selectedPost.title);
    const [newDescription, setNewDescription] = useState(selectedPost.description);
    const [newAuthor, setNewAuthor] = useState(selectedPost.author);

    const onChangeTitle = (e) => setNewTitle(e.target.value);

    const onChangeDescription = (e) => setNewDescription(e.target.value);

    const onChangeAuthor = (e) => setNewAuthor(e.target.value);

    const updatePostFunction = () => {
        dispatch(updateOldPost({ id: selectedPost.id, title: newTitle, description: newDescription, author: newAuthor }));
        navigate('/')
    };

    const cancelButton = () => navigate('/');
    return (
        <div>
            <div className="row">
                <div className="ten columns">
                    <div className="row">
                        <div className="three columns">
                            <label>Title</label>
                            <input type="text" className="u-full-width" onChange={onChangeTitle} value={newTitle} placeholder="Title of the post..." />
                        </div>
                        <div className="three columns">
                            <label>Author</label>
                            <input className="u-full-width" type="email" onChange={onChangeAuthor} value={newAuthor} placeholder="Author name..." />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <label>Description</label>
                            <textarea className="u-full-width" placeholder="Description of the post..." value={newDescription} onChange={onChangeDescription} ></textarea>
                        </div>
                    </div>
                </div >
            </div>
            <div className="row">
                <button className="button-primary" onClick={updatePostFunction}  >Update Post</button >
                <button className="button" onClick={cancelButton}>Cancel</button >
            </div>
        </div >
    )
}

export default EditPost;