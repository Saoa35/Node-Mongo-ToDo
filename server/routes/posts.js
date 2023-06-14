import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  createPost,
  getAll,
  getById,
  getMyPosts,
  removePost,
} from "../controllers/posts.js";

const router = new Router();

router.post("/", checkAuth, createPost);

router.get("/", getAll);

router.get("/:id", getById);

router.get("/user/me", checkAuth, getMyPosts);

router.delete("/:id", checkAuth, removePost);

export default router;
