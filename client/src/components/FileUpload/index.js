import React, { useState } from "react";

/*Source: https://www.educative.io/edpresso/file-upload-in-react */

const ImgThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

const FileUpload = () => {
    const [file, setFile] = useState("");
    const handleUpload = event => {
        setFile(event.target.files[0]);
        // upload file to server here
    };

    return(
        <div>
            <input type="file" onChange={handleUpload} />
            <p>file name: {file.name}</p>
            <p>file type: {file.type}</p>
            <p>file size: {file.size} bytes</p>
            {file && <ImgThumb image={file} />}
        </div>
    )
};

export default FileUpload;