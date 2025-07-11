import express from "express";
import {
    deleteArticle,
    getCommunityArticles,
    getUserArticles,
    getUserFavourites,
    getUserFullArticle,
    saveArticle,
    toggleActionArticle,
} from "../../handlers/articles";

const router = express.Router();

router.post("/save-article", saveArticle);

router.get("/get-articles", getUserArticles);

router.delete("/delete-article", deleteArticle);

router.get("/user-full-article", getUserFullArticle);

router.put("/toggle-repost-article", toggleActionArticle);

router.put("/toggle-like-article", toggleActionArticle);

router.get("/community-articles", getCommunityArticles);

router.get("/user-reposts", getUserFavourites);

router.get("/user-likes", getUserFavourites);

// module.exports = router;
export default router;
