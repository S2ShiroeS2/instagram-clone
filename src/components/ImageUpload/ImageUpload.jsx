import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "../../firebase";
import firebase from "firebase";
import "./styles/ImageUpload.css";

export default function ImageUpload(props) {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0); //for progress of sidebar

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //Progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                );
                setProgress(progress);
            },
            (error) => {
                //Error function...
                // eslint-disable-next-line no-console
                console.log(error);
                alert(error.message);
            },
            () => {
                //Complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        //Post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            image: url,
                            userName: props.userName,
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            },
        );
    };

    return (
        <div className="image-upload">
            <progress
                className="image-upload__progress"
                value={progress}
                max="100"
            ></progress>
            <input
                type="text"
                placeholder="Enter a caption..."
                onChange={(event) => setCaption(event.target.value)}
                value={caption}
            />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    );
}
