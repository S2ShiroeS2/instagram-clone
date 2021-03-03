import { Button, Modal, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/post/Post";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import { db, auth } from "./firebase";

function App() {
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: "absolute",
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [modelStyle] = useState(getModalStyle);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [userName, setUserName] = useState([]);
    const [user, setUser] = useState(null);
    const [openSignIn, setOpenSigIn] = useState(false);

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user has logged in...
                // eslint-disable-next-line no-console
                console.log(authUser);
                setUser(authUser);
            } else {
                //user has logged out...
                setUser(null);
            }
        });

        return () => {
            //perform some cleanup actions
            unsubscribe();
        };
    }, [userName, user]);

    //UseEffect -> Runs a piece of code based on a specific condition
    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                //Every time a new post is added, this code fire...
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    })),
                );
            });
    }, []);

    const signUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: userName,
                });
            })
            .catch((error) => {
                if (email === null || password === null) {
                    alert("null");
                }
                alert(error.message);
            });
        setOpen(false);
    };

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch((error) =>
            alert(error.message),
        );
        setOpenSigIn(false);
    };

    return (
        <div className="app">
            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modelStyle} className={classes.paper}>
                    <form className="app__sign-up">
                        <center>
                            <img
                                className="app__header-image"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt="logo"
                            />
                            <Input
                                placeholder="user name"
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <Input
                                placeholder="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" onClick={signUp}>
                                Sign Up
                            </Button>
                        </center>
                    </form>
                </div>
            </Modal>
            <Modal open={openSignIn} onClose={() => setOpenSigIn(false)}>
                <div style={modelStyle} className={classes.paper}>
                    <form className="app__sign-up">
                        <center>
                            <img
                                className="app__sign-up--image"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt="logo"
                            />
                            <Input
                                placeholder="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" onClick={signIn}>
                                Sign In
                            </Button>
                        </center>
                    </form>
                </div>
            </Modal>
            {/* Header */}
            <div className="app__header">
                <img
                    className="app__header-image"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="logo"
                />
                {user ? (
                    <Button onClick={() => auth.signOut()}>Sign Out</Button>
                ) : (
                    <div className="app__login-contaiter">
                        <Button onClick={() => setOpenSigIn(true)}>
                            Sign In
                        </Button>
                        <Button onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>
                )}
            </div>

            <h1>Hello bro 😁 Let's build an Instagram clone with ReactJS 🚀</h1>
            {/* Post */}
            {posts.map(({ id, post }) => {
                return <Post data={post} key={id} />;
            })}

            {user?.displayName ? (
                <ImageUpload userName={user.displayName} />
            ) : (
                <h3>Sorry! You need to login to upload</h3>
            )}
        </div>
    );
}

export default App;
