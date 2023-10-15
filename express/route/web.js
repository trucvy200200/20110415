import postsController from "../controller/controllers.postsController"
import express from "express";
let router = express.Router();

const initWebRoute = (app) => {
    router.get("/api", postsController.getPostList);

    router.get("/api/:id", postsController.getPostById)

    router.post("/api/add-post", postsController.addPost)

    router.post("/api/:id", postsController.editDeleteCommentPost)

    return app.use("/", router);
}

export default initWebRoute;
