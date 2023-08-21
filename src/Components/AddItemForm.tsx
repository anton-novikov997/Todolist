import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType={
    addTask:(todolistId:string,title:string)=>void
    todolistId:string
}
export const AddItemForm = (props:AddItemFormType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistId,title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div className={"component"}>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

