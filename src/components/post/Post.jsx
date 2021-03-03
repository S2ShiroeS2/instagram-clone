import { Avatar } from "@material-ui/core";
import React from "react";
import "./styles/post.css";

function Post({ data }) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={data.userName}
                    src={data.avatar}
                ></Avatar>
                <h3>{data.userName}</h3>
            </div>

            {/* header -> avatar + username */}
            <img className="post__image" src={data.image} alt="logo" />
            {/* image */}
            <h4 className="post__title">
                <strong>{data.userName}</strong> {data.caption}
            </h4>
            {/* username + caption */}
        </div>
    );
}

export default Post;
