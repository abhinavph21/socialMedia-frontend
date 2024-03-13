import React, { useState, useEffect } from 'react'
import { Avatar, Card, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import StoryCircle from './StoryCircle';
import { useDispatch } from 'react-redux';
import PostCard from '../Post/PostCard';
import CreatePostModal from '../CreatePost/CreatePostModal';

import { getAllPost } from '../../redux/post/post.action';
import { useSelector } from 'react-redux';

const story = [{
    image: "https://cdn.pixabay.com/photo/2018/08/28/14/15/men-3637657_1280.jpg",
    username: "ambar"
},
{
    image: "https://cdn.pixabay.com/photo/2016/10/26/17/33/effect-1772029_1280.jpg",
    username: "abhinav"
},
{
    image: "https://cdn.pixabay.com/photo/2019/06/06/12/33/macbook-4255892_1280.jpg",
    username: "anjali"
}]
// const posts = [1, 1, 1, 1]

const MiddlePart = () => {
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
    const dispatch = useDispatch()

    const post = useSelector((store) => store?.post)

    useEffect(() => {
        dispatch(getAllPost());
    }, []);

    const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);
    const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);

    return (
        <div className="px-20">
            <div className="bg- py-5 flex items-center bg-[#191c29] p-5 rounded-b-md">
                <div className="flex flex-col items-center mr-4 cursor-pointer">
                    <Avatar sx={{ width: "5rem", height: "5rem", bgcolor: "#212534", color: "rgb(88,199,250)" }}>
                        <AddIcon sx={{ fontSize: "3rem" }} />
                    </Avatar>
                    <p>New</p>
                </div>

                {story.map((item, idx) => (
                    <StoryCircle key={idx} item={item} />
                ))}
            </div>
            <div className="card p-5 mt-5">
                <div className="flex justify-between">
                    <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} className="bg-[black]" />
                    <input
                        onClick={handleOpenCreatePostModal}
                        placeholder="Create new post..."
                        className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border border-[#3b4054]"
                        readOnly
                        type="text"
                    />
                </div>
                <div className="flex justify-center space-x-9 mt-5">
                    <div className="flex items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <ImageIcon />
                        </IconButton>

                        <span>media</span>
                    </div>
                    <div className="flex  items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <VideocamIcon />
                        </IconButton>

                        <span>video</span>
                    </div>
                    <div className="flex  items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <ArticleIcon />
                        </IconButton>

                        <span>Write Article</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 space-y-5">
                {post?.posts.map((item, idx) => (
                    <PostCard key={idx} item={item} />
                ))}
            </div>
            <CreatePostModal
                open={openCreatePostModal}
                handleClose={handleCloseCreatePostModal}
            />
        </div >
    )
}

export default MiddlePart