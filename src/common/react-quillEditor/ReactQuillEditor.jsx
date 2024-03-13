/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import './ReactQuillStyle.css';

const ReactQuillEditor = (props) => {
    const [data, setData] = useState("");
    const quillRef = useRef(null);

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
        ],
    };

    const handleLimit = (e) => {
        setData((copyData) => e);
        props.setTextValue(e); // sending the value to the parent component
    };

    useEffect(() => {
        if (props?.textValue !== data) {
            setData(props?.textValue);
        }
    }, [props?.textValue]);

    useEffect(() => {
        // Focus the Quill editor when it mounts
        if (quillRef.current) {
            quillRef.current.getEditor().focus();
        }
    }, []);

    return (
        <div className="react-quill-dark-theme" >
            <ReactQuill
                ref={quillRef}
                style={{ width: "100%" }}
                value={data}
                onChange={(e) => handleLimit(e)}
                modules={modules}
                formats={[
                    "header",
                    "font",
                    "list",
                    "bold",
                    "italic",
                    "underline",
                    "align",
                ]}
                placeholder="Enter text here"
            />
        </div>
    );
};

export default ReactQuillEditor;
