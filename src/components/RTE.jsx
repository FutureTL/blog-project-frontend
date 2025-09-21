import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image"],
];

function RTE({ label, name, control, defaultValue = "" }) {
  return (
    <div className="w-full">
      {/* {label && <label className="inline-block mb-1 pl-1">{label}</label>} */}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <div>
            <ReactQuill
              value={value}
              placeholder="Write your blog content here..."
              onChange={(content, delta, source, editor) => {
                const plainText = editor.getText(); 
                onChange(plainText.trim()); // save only plain text
              }}
              modules={{ toolbar: toolbarOptions }}
            />

            {/* <div style={{ marginTop: "20px" }}>
              <strong>Output:</strong>
              <div>{value}</div> */}
            {/* </div> */}
          </div>
        )}
      />
    </div>
  );
}

export default RTE;
