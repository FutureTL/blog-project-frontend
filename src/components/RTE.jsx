// Importing helper modules
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import axios from "axios";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "react-quill/dist/quill.snow.css";


const Editor = ({ label, name, control, defaultValue = "" }) => {
  // Editor state
  

  // Editor ref
  const quill = useRef();

  // Handler to handle button clicked
  function handler() {
    console.log(value);
  }

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = async() => {
      const file = input.files[0];

      if(!file){
        return;
      }

      console.log(`RTE:: image file received from user :: ${file}`);

      const formData = new FormData();
      formData.append("file", file);
      
    
        // Upload to Cloudinary
        await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/uploadImage`,
        formData, 
         {
                    withCredentials: true, 
                    headers: {
                    "Content-Type": "multipart/form-data", 
                },
                    
        }
      ).then((res)=>{
        console.log(`RTE :: url from cloudinary :: ${res.data.data.secure_url} `);
      
        const imageUrl = res.data.data.secure_url;

        // Insert uploaded image into Quill
        const quillEditor = quill.current.getEditor();
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      })
      .catch((err)=>{
        console.log(`err in uploading to cloudinary :: ${err}`);
        
      })

      
  };
}, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <div className="w-full">

      <Controller
        name={name || "content"} 
        control = {control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
      <QuillEditor
        
        value ={ value }
        control = {control}
        defaultValue={defaultValue}
        placeholder="Write your blog content here..."
        ref={(el) => (quill.current = el)}
        theme="snow"
        formats={formats}
        modules={modules}
         onChange={(content) => onChange(content)}
      />
      )}
    />
    </div>
  );
};

export default Editor;


// import { Controller } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const toolbarOptions = [
//   ["bold", "italic", "underline", "strike"],
//   [{ list: "ordered" }, { list: "bullet" }],
//   ["link", "image"],
// ];

// function RTE({ label, name, control, defaultValue = "" }) {
//   return (
//     <div className="w-full">
//       {/* {label && <label className="inline-block mb-1 pl-1">{label}</label>} */}

//       <Controller
//         name={name || "content"}
//         control={control}
//         defaultValue={defaultValue}
//         render={({ field: { value, onChange } }) => (
//           <div>
//             <ReactQuill
//               value={value}
//               placeholder="Write your blog content here..."
//               onChange={(content, delta, source, editor) => {
//                 const plainText = editor.getText(); 
//                 onChange(plainText.trim()); // save only plain text
//               }}
//               modules={{ toolbar: toolbarOptions }}
//             />

//             {/* <div style={{ marginTop: "20px" }}>
//               <strong>Output:</strong>
//               <div>{value}</div> */}
//             {/* </div> */}
//           </div>
//         )}
//       />
//     </div>
//   );
// }

// export default RTE;
