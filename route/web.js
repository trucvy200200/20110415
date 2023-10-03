import postsController from "../controller/controllers.postsController"
import express from "express";
let router = express.Router();

const initWebRoute = (app) => {
    router.get("/", postsController.getPostList);

    router.get("/:id", postsController.getPostById)

    router.post("/form_post", postsController.addPost)

    router.post("/:id", postsController.editDeleteCommentPost)

    return app.use("/", router);
}

export default initWebRoute;
