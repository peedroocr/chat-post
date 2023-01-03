import { createSlice, nanoid, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios';

const POST_URL = 'http://162.19.66.62:3101/'

const initialState = {
    posts: [],
    selected: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL + 'allPosts');
    return response.data
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    initialPost.id = nanoid();


    await axios.post(POST_URL + 'newPost', initialPost)
    /*   .then(res => {
       })*/
    return initialPost;
});

export const updateOldPost = createAsyncThunk('posts/updatePost', async (updatedPost) => {
    await axios.post(POST_URL + 'updatePost', updatedPost)
    /*.then(res => {
    })*/
    return updatedPost;

});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload);

            },
            prepare(title, description, author) {
                return {
                    payload: {
                        id: nanoid(),
                        title: title,
                        description: description,
                        author: author
                    }
                }
            }
        },
        updatePost: {
            reducer(state, action) {
                const allPosts = state.posts.map((post) => {
                    if (post.id !== action.payload.id) {
                        return post
                    } else {
                        return {
                            _id: post._id,
                            id: action.payload.id,
                            title: action.payload.title,
                            description: action.payload.description,
                            author: action.payload.author
                        }
                    }
                });
                state.posts = allPosts;
            },
            preapre(id, title, description, author) {
                return {
                    payload: {
                        id,
                        title,
                        description,
                        author
                    }
                }
            }
        },
        selectPost: {
            reducer(state, action) {

                const selectedPost = current(state.posts).find((post) => action.payload.id === post.id)
                state.selected = selectedPost;
            },
            prepare(id) {
                return {
                    payload: { id }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {

                state.posts.push(action.payload);
            })
            .addCase(updateOldPost.fulfilled, (state, action) => {
                const allPosts = state.posts.map((post) => {
                    if (post.id !== action.payload.id) {
                        return post
                    } else {
                        return {
                            _id: post._id,
                            id: action.payload.id,
                            title: action.payload.title,
                            description: action.payload.description,
                            author: action.payload.author
                        }
                    }
                });
                state.posts = allPosts;
            })
    }
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectStatus = (state) => state.posts.status;
export const { selectPost, updatePost } = postsSlice.actions;

export const selectEditPost = (state) => state.posts.selected;

export default postsSlice.reducer;