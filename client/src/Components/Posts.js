import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../Features/PostSlice";
import { Label, Table } from "reactstrap";
import moment from "moment";
import { likePost } from "../Features/PostSlice";
import { FaThumbsUp } from "react-icons/fa";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const email = useSelector((state) => state.users.user.email);
  const userId = useSelector((state) => state.users.user._id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLikePost = (postId) => {
    const postData = {
      postId: postId,
      userId: userId,
    };
    dispatch(likePost(postData));
    navigate("/");
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    } else {
      dispatch(getPosts());
    }
  }, [email]);

  return (
    <div>
      <Table className="table">
        <thead></thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>
                <Label>{post.email}</Label>
                <br />
                <p className="postTime"> {moment(post.createdAt).fromNow()}</p>
                {post.postMsg}
                <p className="likes">
                  <a href="#" onClick={() => handleLikePost(post._id)}>
                    <FaThumbsUp />
                  </a>
                  ({post.likes.count})
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div> /* End of posts */
  );
};

export default Posts;
