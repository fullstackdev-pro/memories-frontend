import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

function Posts({ setCurrentId }) {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "You can be the first to post :)";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container className={classes.mainContainer} alignItems="stretch">
      {posts.map((post) => (
        <Grid
          key={post?._id}
          item
          xs={12}
          sm={12}
          lg={4}
          className={classes.post}
        >
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
