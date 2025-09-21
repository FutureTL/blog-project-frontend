import React, {useId} from "react";
//as I have customized the input tag, so forward ref needs to be used
//to pass the ref from react-hook form to the actaul <input> tag becasue RHF needs
//it for its functioning.

const Input = React.forwardRef(function Input({
    label,
    type= "text",
    className = "",
    ...props

}, ref){

    const id = useId();

    return(
         <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
                focus:bg-gray-50 duration-200 border border-gray-200 w-full 
                cursor-pointer ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )

})
 export default Input;