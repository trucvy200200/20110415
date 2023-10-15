import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form"
function App() {
    const [detail, setDetail] = useState(null)
    const [comments, setComments] = useState([])
    const [open, setOpen] = useState(false);
    const paramsURL = useParams()
    const { id } = paramsURL
    const navigate = useNavigate()
    const {
        control,
        register,
        handleSubmit,
    } = useForm()

    const {
        control: control1,
        register: register1,
        handleSubmit: handleSubmit1,
    } = useForm()

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));
    useEffect(() => {
        apiGetPostById()
    }, [])

    const apiGetPostById = async () => {
        await axios.get(`/api/${id}`)
            .then((res) => {
                setDetail(res.data)
                setComments(res.data.comments)
            })
    }
    const handleSubmitDelete = () => {
        axios.post(`/api/${id}?method=delete`)
            .then((res) => {
                console.log("Delete success")
                navigate("/")
            })
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmitEdit = (data) => {
        const params = {
            title: data.title,
            body: data.body,
            author: data.author,
        }

        axios.post(`/api/${id}?method=edit`, params).then((res) => {
            setDetail(res.data)
            setOpen(false)
        })
    }
    const onSubmitComment = (data) => {
        const params = {
            comment: data.comment
        }

        axios.post(`/api/${id}?method=comment`, params).then((res) => {
            setComments([res.data, ...comments])

        })
    }
    return (
        <>
            <link rel="stylesheet" href="/css/detail.css" />
            <link rel="stylesheet" href="/css/comment.css" />
            <link rel="stylesheet" href="/css/modal.css" />
            <div className="detail">
                <h2>Welcome to my blog</h2>
                <div className="btn-group">
                    <button className="btn-edit" onClick={handleClickOpen}>Edit</button>
                    <BootstrapDialog open={open} onClose={handleClose} aria-labelledby="customized-dialog-title">
                        <DialogTitle>Edit post</DialogTitle>
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
                        <form onSubmit={handleSubmit(onSubmitEdit)}>
                            <DialogContent>
                                <div className="modal-dialog">
                                    <div className="form-group">
                                        <p>Title</p>
                                        <Controller
                                            id="title"
                                            name="title"
                                            control={control}
                                            defaultValue={detail?.title}
                                            render={({ field }) => (
                                                <input
                                                    type="text"
                                                    placeholder={"Title"}
                                                    name="title"
                                                    {...register("title", {
                                                        required: true,
                                                        validate: (value) => value !== ""
                                                    })}
                                                    {...field}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <p>Content</p>
                                        <Controller
                                            id="body"
                                            name="body"
                                            control={control}
                                            defaultValue={detail?.body}
                                            render={({ field }) => (
                                                <textarea
                                                    name="body"
                                                    placeholder="Input text here"
                                                    {...register("body", {
                                                        required: true,
                                                        validate: (value) => value !== ""
                                                    })}
                                                    {...field} />
                                            )}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <p>Author</p>
                                        <Controller
                                            id="author"
                                            name="author"
                                            control={control}
                                            defaultValue={detail?.author}
                                            render={({ field }) => (
                                                <input
                                                    type="text"
                                                    name="author"
                                                    {...register("author", {
                                                        required: true,
                                                        validate: (value) => value !== ""
                                                    })}
                                                    {...field} />
                                            )}
                                        />
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <button type="submit" className="btn-submit">Submit</button>
                                <button onClick={handleClose} className="btn-default">Cancel</button>
                            </DialogActions>
                        </form>
                    </BootstrapDialog>
                    <button className="btn-delete" onClick={handleSubmitDelete}>Delete</button>
                </div>
                <div className="blog-container">
                    <div className="blog-item">
                        <h3>{detail?.title}</h3>
                        <img src={detail?.image} />
                        <p>{detail?.body}</p>
                        <h4 style={{ textAlign: "right" }}>Author: {detail?.author} ({detail?.createdAt})</h4>
                    </div>
                    <div className="comment">
                        <h3 style={{ textAlign: "left" }}>Comments</h3>
                        <form onSubmit={handleSubmit1(onSubmitComment)} >
                            <Controller
                                id="comment"
                                name="comment"
                                control={control1}
                                render={({ field }) => (
                                    <textarea
                                        name="comment"
                                        placeholder={"Input text here"}
                                        {...register1("comment", {
                                            required: true,
                                            validate: (value) => value !== ""
                                        })}
                                        {...field} />
                                )}
                            />
                            <button type="submit" className="btn-edit" >Send</button>
                        </form>
                        <div className="comment-list">
                            {comments?.length > 0 && comments.map((item, index) =>
                                <div className="comment-item" key={index}>
                                    <div className="comment-header">
                                        <div className="comment-author">{item.author}</div>
                                        <div className="comment-time">{item.createdAt}</div>
                                    </div>
                                    <p>{item.body}</p>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
