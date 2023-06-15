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

export const PostPage = () => {
  const [post, setPost] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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
        <div className="w-1/3">COMMENTS</div>
      </div>
    </div>
  );
};
