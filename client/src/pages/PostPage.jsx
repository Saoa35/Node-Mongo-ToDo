import React, { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import axios from "../utils/axios.js";
import { removePost } from "../redux/slices/postSlice.js";
import {
  createComment,
  getPostComments,
} from "../redux/slices/commentSlice.js";
import { CommentItem } from "../components/CommentItem.jsx";
import { checkIsAuth } from "../redux/slices/authSlice.js";

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast("Article was deleted");
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Loading ...</div>
    );
  }

  return (
    <div>
      <Link to={"/"}>
        <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-md py-2 px-4">
          Back
        </button>
      </Link>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rounded-md h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-white text-xl">{post.title}</div>

            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <Link to={`/${params.id}/edit`}>
                  <button className="flex justify-center items-center gap-2  text-white opacity-50">
                    <AiTwotoneEdit />
                  </button>
                </Link>
                <button
                  className="flex justify-center items-center gap-2  text-white opacity-50"
                  onClick={removePostHandler}
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>

          <p className="text-white opacity-60 text-justify text-xs pt-4">
            {post.text}
          </p>

          <div className="flex gap-3 items-center justify-between mt-2">
            <div className="flex gap-3 mt-4">
              <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage />
                <span>{post.comments?.length || 0} </span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-md">
          {isAuth && (
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type=" text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment"
                className="w-full rounded-md bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
              />
              <button
                onClick={handleSubmit}
                className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-md py-2 px-4"
              >
                Sent
              </button>
            </form>
          )}

          {comments?.map((com) => (
            <CommentItem key={com._id} com={com} />
          ))}
        </div>
      </div>
    </div>
  );
};
