import {
    Avatar,
    Backdrop,
    Button,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideocamIcon from "@mui/icons-material/Videocam";
import WestIcon from "@mui/icons-material/West";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from "react-redux";
// import {
//     createChat,
//     createMessage,
//     getAllChats,
// } from "../../redux/message/message.action";
// import UserChatCard from "../../components/Message/UserChatCard";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
// import "./Message.css";
// import { searchUser } from "../../Redux/Auth/auth.action";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "../../components/Message/UserChatCard";
import ChatMessage from "../../components/Message/ChatMessage";
import { createChat, createMessage, getAllChats } from "../../redux/message/message.action";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { useNavigate } from "react-router-dom";

const Message = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const message = useSelector((store) => store.message);
    const auth = useSelector(store => store.auth)
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const chatContainerRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);

    const [inputMessage, setInputMessage] = useState('');

    const onConnect = (frem) => {
        // console.log("connect frem : ", frem)
    }
    const onErr = (err) => {
        console.log("error when connect ", err)
    }

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws")
        const stomp = Stomp.over(socket)
        setStompClient(stomp)
        stomp.connect({}, onConnect, onErr);

    }, [])

    // console.log(stompClient, auth.user, currentChat);

    useEffect(() => {
        if (stompClient && auth.user && currentChat) {
            const subscription = stompClient.subscribe(`/user/${currentChat.id}/private`, onMessageRecive)
            // console.log("subscription", subscription);

        }
    }, [currentChat, stompClient, auth?.user])

    console.log(message);

    // useEffect(() => {
    //     setMessages(() => {
    //         let chat = message?.chats?.find((chat) => chat?.id == currentChat?.id)
    //         return chat?.messages
    //     })
    // }, [message])

    useEffect(() => {
        dispatch(getAllChats());
    }, [currentChat]);

    const sendMessageToServer = (message) => {
        if (stompClient && message) {
            console.log(message);
            // const messageToSend = { content: inputMessage }; // Customize this according to your message structure
            stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(message));
        }
    };

    const onMessageRecive = (payload) => {
        console.log("onMessageRecive ............. -----------", payload);

        console.log("recive message -  - - - - - - -  -", JSON.parse(payload.body));

        const recievedMessage = JSON.parse(payload.body);

        setMessages((messages) => [...messages, recievedMessage]);
    };
    // normal
    const handleSelectImage = async (event) => {
        setLoading(true);
        const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imgUrl);
        setLoading(false);
    };

    const handleCreateMessage = (value) => {
        const message = {
            content: value,
            image: selectedImage,
            user: auth?.user
        };
        const data = {
            message, sendToServer: sendMessageToServer, chatId: currentChat?.id,
        }
        dispatch(createMessage(data));
        setSelectedImage(null);
    };

    const handleCreateChat = (userId) => {
        dispatch(createChat({ userId }));
    };

    return (
        <Fragment>
            <Grid className="h-screen overflow-y-hidden" container>
                <Grid className="px-5 bg-[#191c29] " xs={3} item>
                    <div className="flex h-full justify-between space-x-2">
                        <div className="w-full">
                            <div className="flex space-x-4 items-center py-5 " >
                                <Button
                                    onClick={() => { navigate("/") }}>
                                    <WestIcon />
                                    <h1 className=" text-xl font-bold">Home</h1>{" "}
                                </Button>
                            </div>

                            <div className="h-[83vh]">
                                <div className="">
                                    <SearchUser handleClick={handleCreateChat} />
                                </div>
                                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar ">
                                    <div className="cursor-pointer bg-[#212534] rounded-md">
                                        {message?.chats?.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    console.log(item);
                                                    setCurrentChat(item);
                                                    setMessages(item?.messages || []);
                                                }}
                                                className="cursor-pointer bg-[#212534] rounded-md"
                                            >
                                                <UserChatCard item={item} />
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid className="h-full" item xs={9}>
                    {currentChat ? (
                        <div>
                            <div className="flex justify-between items-center bg-[#191c29] border-l  p-5">
                                <div className="flex items-center space-x-3">
                                    <Avatar src={currentChat.users[1]?.image} />
                                    <p>{currentChat?.users[1]?.firstName}</p>
                                </div>
                                <div className="flex space-x-3">
                                    <IconButton>
                                        <AddIcCallIcon />
                                    </IconButton>
                                    <IconButton>
                                        <VideocamIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div ref={chatContainerRef} className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5 pb-10">
                                {messages?.map((item) => (
                                    <ChatMessage key={item.id} item={item} />
                                ))}
                            </div>
                            <div className="sticky bottom-0 border-l">
                                {selectedImage && (
                                    <img
                                        className="w-[5rem] h-[5rem] object-cover px-2"
                                        src={selectedImage}
                                        alt=""
                                    />
                                )}
                                <div className="bg-[#191c29] py-5 flex items-center justify-center space-x-5  ">
                                    <input
                                        onKeyPress={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                (e.target.value || selectedImage)
                                            ) {
                                                handleCreateMessage(e.target.value);
                                                setInputMessage("");
                                            }
                                        }}
                                        className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5 "
                                        type="text"
                                        placeholder="Type message..."
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                    />
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleSelectImage}
                                            style={{ display: "none" }}
                                            id="image-input"
                                        />
                                        <label htmlFor="image-input">
                                            <AddPhotoAlternateIcon />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full space-y-5 flex flex-col justify-center items-center">
                            <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
                            <p className="text-xl font-semibold">No Chat Selected</p>
                        </div>
                    )}
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment>
    );
};

export default Message;
