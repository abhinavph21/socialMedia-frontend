import React from 'react'
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


const PostCard = ({ item }) => {

    return (
        <div className="card" sx={{ w: "100%" }}>
            <CardHeader
                className="text-left"
                avatar={
                    <Avatar sx={{ bgcolor: "#212534", color: "rgb(88,199,250)" }} aria-label="recipe">
                        {item?.user?.firstName[0]}
                    </Avatar>
                }
                action={
                    <IconButton color="primary" aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item?.user?.firstName + " " + item?.user?.lastName}
                subheader={
                    "@" +
                    item?.user?.firstName.toLowerCase() +
                    "_" +
                    item?.user?.lastName.toLowerCase()
                }
            />
            <CardMedia
                component="img"
                height="194"
                image={item?.image}
                alt={item.caption}
            />
            <CardContent>
                <Typography variant="body2" color="primary" className='text-left'>
                    {item?.caption}
                </Typography>
            </CardContent>
            <CardActions className="flex justify-between" disableSpacing>
                <div>
                    <IconButton color="primary" aria-label="add to favorites">
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    {/* <IconButton color="primary" onClick={() => setShowComment(!showComment)}>
                        <ChatBubbleOutlineIcon />
                    </IconButton> */}
                </div>
                {/* <div>
                    <IconButton color="primary" onClick={handleSavePost}>

                        {item?.savedByRequser ? <BookmarkIcon /> : <BookmarkBorderIcon />}

                    </IconButton>
                </div> */}

            </CardActions>
        </div>
    )
}

export default PostCard