import { useDispatch } from "react-redux";
import { useState } from "react";
import { addNewPost } from '../features/posts/postsSlice';



const UploadPost = () => {

    const dispatch = useDispatch();

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    const onChangeTitle = (e) => setNewTitle(e.target.value)

    const onChangeDescription = (e) => setNewDescription(e.target.value)

    const onChangeAuthor = (e) => setNewAuthor(e.target.value)

    const addNewPostFunction = () => dispatch(addNewPost({ id: '', title: newTitle, description: newDescription, author: newAuthor }))

    return (
        <div>
            <div className="row">
                <div className="ten columns">
                    <div className="row">
                        <div className="three columns">
                            <label>Title</label>
                            <input type="text" className="u-full-width" onChange={onChangeTitle} placeholder="Title of the post..." />
                        </div>
                        <div className="three columns">
                            <label>Author</label>
                            <input className="u-full-width" type="email" onChange={onChangeAuthor} placeholder="Author name..." />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <label>Description</label>
                            <textarea className="u-full-width" placeholder="Description of the post..." onChange={onChangeDescription} ></textarea>
                        </div>
                    </div>
                </div >
            </div>
            <div className="row">
                <button className="button-primary" onClick={addNewPostFunction} >Send Message</button>
            </div>
        </div >)
}

export default UploadPost;