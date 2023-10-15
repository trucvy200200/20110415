import { useEffect, useState } from "react"
import axios from "axios"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form"
function PostList() {
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false);

    const {
        control,
        register,
        handleSubmit,
    } = useForm()
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitCreate = (data) => {
        const params = {
            title: data.title,
            body: data.body,
            author: data.author,
        }

        axios.post("/api/add-post", params).then((res) => {
            setPosts([...posts, res.data])
            setOpen(false)
        })
    }
    useEffect(() => {
        apiGetPost()
    }, [])

    const apiGetPost = async () => {
        await axios.get("/api")
            .then((res) => setPosts(res.data))
    }
    return (
        <>
            <link rel="stylesheet" href="/css/index.css" />
            <link rel="stylesheet" href="/css/modal.css" />
            <div className="blogs">
                <h2>My Blogs</h2>
                <div className="btn-group">
                    <button variant="outlined" onClick={handleClickOpen}>
                        Create new post
                    </button>
                    <BootstrapDialog open={open} onClose={handleClose} aria-labelledby="customized-dialog-title">
                        <DialogTitle>Create post</DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <form onSubmit={handleSubmit(onSubmitCreate)}>
                            <DialogContent>
                                <div className="modal-dialog">
                                    <div className="form-group">
                                        <p>Title</p>
                                        <Controller
                                            name="title"
                                            control={control}
                                            defaultValue={""}
                                            render={({ field }) => (
                                                <input
                                                    type="text"
                                                    name="title"
                                                    {...register("title", {
                                                        required: true,
                                                        validate: (value) => value !== "" && !value?.includes(" ")
                                                    })}
                                                    required
                                                    {...field} />
                                            )}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <p>Content</p>
                                        <Controller
                                            name="body"
                                            control={control}
                                            render={({ field }) => (
                                                <textarea
                                                    name="body"
                                                    placeholder="Input text here"
                                                    {...register("body", {
                                                        required: true,
                                                        validate: (value) => value !== "" && !value?.includes(" ")
                                                    })}
                                                    required
                                                    {...field} />
                                            )}
                                        />
                                    </div >
                                    <div className="form-group">
                                        <p>Author</p>
                                        <Controller
                                            name="author"
                                            control={control}
                                            defaultValue={""}
                                            render={({ field }) => (
                                                <input
                                                    type="text"
                                                    name="author"
                                                    {...register("author", {
                                                        required: true,
                                                        validate: (value) => value !== "" && !value?.includes(" ")
                                                    })}
                                                    required
                                                    {...field} />
                                            )}
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <button type="submit">Submit</button>
                                <button onClick={handleClose} className="btn-default">Cancel</button>
                            </DialogActions>
                        </form>
                    </BootstrapDialog>
                    <div className="blog-container">
                        <div className="blog-list">
                            {posts?.length > 0 && posts.map((item, index) =>
                                < div className="blog-item" key={index}>
                                    <a style={{ textDecoration: "none", color: "black" }} href={`/${item.id}`}>
                                        <img src={item.image} />
                                        <h3>{item.title}</h3>
                                        <h4>Author: {item.author}</h4>
                                    </a>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default PostList;
