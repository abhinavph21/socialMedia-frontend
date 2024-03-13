import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import PostCard from '../../components/Post/PostCard';
import UserReelsCard from '../Reels/UserReelsCard';
import ProfileModal from './ProfileModal';
import { getUsersPost } from '../../redux/post/post.action';
import { findUserById } from '../../redux/auth/auth.action';

const tabs = [
    { value: "post", name: "Post" },
    { value: "reels", name: "Reels" },
    { value: "saved", name: "Saved" }
];

const reels = [{ video: "https://media.istockphoto.com/id/1365548761/video/futuristic-city-connected-to-social-media-high-tech-vision-of-london-augmented-reality-england.mp4?s=mp4-640x640-is&k=20&c=GvaeoZIqY5XTmdnNz_55dJKuD8b9LXYPOUm2b34si4o=" }, { video: "https://media.istockphoto.com/id/1365301176/video/live-streaming-at-home.mp4?s=mp4-640x640-is&k=20&c=Di2HvwMssZAIzO5fh9T2CSY0v9SHSgLZ4SyMncWnjqw=" }, { video: "https://media.istockphoto.com/id/1365548761/video/futuristic-city-connected-to-social-media-high-tech-vision-of-london-augmented-reality-england.mp4?s=mp4-640x640-is&k=20&c=GvaeoZIqY5XTmdnNz_55dJKuD8b9LXYPOUm2b34si4o=" }, { video: "https://media.istockphoto.com/id/1365301176/video/live-streaming-at-home.mp4?s=mp4-640x640-is&k=20&c=Di2HvwMssZAIzO5fh9T2CSY0v9SHSgLZ4SyMncWnjqw=" }, { video: "https://media.istockphoto.com/id/1365548761/video/futuristic-city-connected-to-social-media-high-tech-vision-of-london-augmented-reality-england.mp4?s=mp4-640x640-is&k=20&c=GvaeoZIqY5XTmdnNz_55dJKuD8b9LXYPOUm2b34si4o=" }, { video: "https://media.istockphoto.com/id/1365301176/video/live-streaming-at-home.mp4?s=mp4-640x640-is&k=20&c=Di2HvwMssZAIzO5fh9T2CSY0v9SHSgLZ4SyMncWnjqw=" }]


const Profile = () => {
    const dispatch = useDispatch()
    const { id } = useParams();

    const storePost = useSelector(store => store.post)
    const auth = useSelector(store => store.auth)

    const [value, setValue] = useState("post");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(findUserById(id));
        dispatch(getUsersPost(id))
        // dispatch(getUsersReels(id))
    }, [id]);

    let findUser = {
        firstName: "abhinav",
        lastName: "pharswan",
        bio: "living life to fullest",
        savedPosts: [1, 1, 1, 1, 1]
    }
    const [openModel, setOpenModal] = useState(false);
    const handleCloseProfileModal = () => setOpenModal(false);
    const handleOpenProfileModal = () => setOpenModal(true);

    const isSameUserAsProfile = () => {
        if (auth?.user?.id == auth?.profileUser?.id)
            return true
        return false
    }


    return (
        <div className="py-10  w-[70%] ">
            <div className="rounded-md  ">
                <div className=" h-[15rem]">
                    <img
                        className="w-full h-full rounded-t-md"
                        src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"
                        alt=""
                    />
                </div>
                <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
                    <Avatar
                        alt="Avatar"
                        src="https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg"
                        className="transform -translate-y-24 "
                        sx={{ width: "10rem", height: "10rem", bgcolor: "#212534", color: "rgb(88,199,250)" }}
                        color="primary"
                    />
                    {isSameUserAsProfile() ? <Button
                        onClick={handleOpenProfileModal}
                        sx={{ borderRadius: "20px" }}
                        variant="outlined"
                        className="rounded-full"
                    >
                        Edit Profile
                    </Button> :
                        <Button
                            // onClick={handleFollowUser}
                            sx={{ borderRadius: "20px" }}
                            variant="outlined"
                            className="rounded-full"
                        >
                            {true ? "Unfollow" : "Follow"}
                        </Button>}
                </div>
                <div className="p-5">
                    <div>
                        <h1 className="py-1 font-bold text-xl text-left">{auth?.profileUser?.firstName + " " + auth?.profileUser?.lastName}</h1>
                        <p className='text-left'>
                            @
                            {auth?.profileUser?.firstName?.toLowerCase() +
                                "_" +
                                auth?.profileUser?.lastName?.toLowerCase()}
                        </p>
                    </div>
                    <div className="flex space-x-5 items-center py-3">
                        <span>{storePost?.profileUserPosts?.length} posts</span>
                        <span>{auth?.user?.followers ? auth?.user?.followers.length : 0} followers</span>
                        <span>{auth?.user?.following ? auth?.user?.following.length : 0} following</span>
                    </div>
                    <div className="text-left">
                        <p>{auth?.profileUser?.bio} </p>
                    </div>
                </div>
                <section>
                    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="wrapped label tabs example"
                        >
                            {tabs.map((item) => (
                                <Tab value={item.value} label={item.name} wrapped key={item.value} />
                            ))}
                        </Tabs>
                    </Box>
                    <div className="flex justify-center">
                        {value === "post" ? (
                            <div className="space-y-5 w-[70%] my-10">
                                {storePost?.profileUserPosts?.map((item) => (
                                    <div className="border border-[#3b4054] rounded-md" key={item.id}>
                                        <PostCard item={item} />{" "}
                                    </div>
                                ))}
                            </div>
                        ) : value === "repost" ? (
                            <div>Repost</div>
                        ) : value === "reels" ? (
                            <div className="flex flex-wrap py-5">

                                {reels.map((reel) => (
                                    <UserReelsCard reel={reel} />
                                ))}
                            </div>
                        ) : (
                            <div>{auth?.profileUser?.savedPosts?.map((item) => <PostCard item={item} />)}</div>
                        )}
                    </div>
                </section>
            </div>
            <section>
                <ProfileModal open={openModel} handleClose={handleCloseProfileModal} />
            </section>
        </div>
    )
}

export default Profile