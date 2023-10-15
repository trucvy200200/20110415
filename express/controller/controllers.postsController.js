import { posts } from "../models/models.posts";


function getPostList(req, res) {
    console.log(req.method, req.url);
    return res.json(posts);
}

function addPost(req, res) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}/${day}/${year}`;
    const id = Math.floor(Math.random() * 100)

    const object = {
        id: id.toString(),
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        createdAt: currentDate,
        image: "image/image.png",
        comments: []
    }
    posts.push(object);

    return res.json(object);
}

function editDeleteCommentPost(req, res) {
    const idLink = req.params.id;
    if (req.query.method === "edit") {
        const updatePostIndex = posts.findIndex((item) => item.id === idLink);
        const postById = posts[updatePostIndex];
        const object = {
            id: idLink,
            title: req.body.title,
            body: req.body.body,
            author: req.body.author,
            createdAt: postById.createdAt,
            image: postById.image,
            comments: postById.comments
        }
        posts[updatePostIndex] = object
        return res.json(object);
    }
    else if (req.query.method === "delete") {
        const deletePostIndex = posts.findIndex((item) => item.id === idLink);
        posts.splice(deletePostIndex, 1);
        return res.json(posts);
    }
    else if (req.query.method === "comment") {
        const comment = req.body.comment
        const result = posts.find((item) => item.id === idLink)
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${month}/${day}/${year}`;
        const id = Math.floor(Math.random() * 100)
        const object = {
            id: id,
            body: comment,
            author: "Unknown person",
            createdAt: currentDate
        }
        result.comments.unshift(object)
        return res.json(object);
    }
}

function getPostById(req, res) {
    const id = req.params.id
    const result = posts.find((item) => item.id === id)
    console.log(req.method, req.url);
    if (result)
        res.json(result);
    else res.json({ error: "not valid" });
}

function addComments(req, res) {

}
module.exports = {
    getPostList,
    addPost,
    getPostById,
    editDeleteCommentPost
}