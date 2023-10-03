import { posts } from "../models/models.posts";


function getPostList(req, res) {
    console.log(req.method, req.url);
    return res.render("index.hbs", { posts: posts });
}

function addPost(req, res) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}/${day}/${year}`;
    const id = Math.floor(Math.random() * 100)

    posts.push({
        id: id.toString(),
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        createdAt: currentDate,
        image: "image/image.png",
        comments: []
    });

    res.redirect(303, '/')
}

function editDeleteCommentPost(req, res) {
    const idLink = req.params.id;
    if (req.query.method === "edit") {
        const updatePostIndex = posts.findIndex((item) => item.id === idLink);
        const postById = posts[updatePostIndex];
        posts[updatePostIndex] = {
            id: idLink,
            title: req.body.title,
            body: req.body.body,
            author: req.body.author,
            createdAt: postById.createdAt,
            image: postById.image,
            comments: postById.comments
        }
        res.redirect(303, `/${idLink}`)
    }
    else if (req.query.method === "delete") {
        const deletePostIndex = posts.findIndex((item) => item.id === idLink);
        posts.splice(deletePostIndex, 1);
        res.redirect(303, `/`)
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
        result.comments.unshift(
            {
                id: id,
                body: comment,
                author: "Unknown person",
                createdAt: currentDate
            })
        res.redirect(303, `/${idLink}`)
    }
}

function getPostById(req, res) {
    const id = req.params.id
    const result = posts.find((item) => item.id === id)
    console.log(req.method, req.url);
    if (result)
        res.render("detail.hbs", result);
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