import React, { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("memories_profile"));
  const navigate = useNavigate();
  const openPost = () => navigate(`/posts/${post._id}`);
  const [likes, setLikes] = useState(post?.like);

  const hasLikedPost = post.like.find((like) => like === user?._id);

  const handleClick = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.like.filter((id) => id !== user?._id));
    } else {
      setLikes([...post.like, user?._id]);
    }
  };
  console.log();
  return (
    <Card
      className={window.innerWidth >= 1280 ? classes.card : classes.cardMobile}
      raised
      elevation={6}
    >
      <ButtonBase className={classes.cardAction}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            // onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          variant="h5"
          gutterBottom
          onClick={openPost}
        >
          {post.title}
        </Typography>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
            className={classes.cardContentTitle}
          >
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleClick}>
          <ThumbUpAltIcon fontSize="small" />
          Like &nbsp;
          {likes.length}
        </Button>
        {user?._id === post?.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
