import express from "express";
import {
    deleteArticle,
    getCommunityArticles,
    getUserArticles,
    getUserFullArticle,
    getUserLikes,
    getUserReposts,
    saveArticle,
    toggleLikeArticle,
    toggleRepostArticle,
} from "../../handlers/articles";

const router = express.Router();

router.post("/save-article", saveArticle);

router.get("/get-articles", getUserArticles);

router.delete("/delete-article", deleteArticle);

router.get("/user-full-article", getUserFullArticle);

router.put("/toggle-repost-article", toggleRepostArticle);

router.put("/toggle-like-article", toggleLikeArticle);

router.get("/community-articles", getCommunityArticles);

router.get("/user-reposts", getUserReposts);

router.get("/user-likes", getUserLikes);

// module.exports = router;
export default router;
