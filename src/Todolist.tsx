import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Components/AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId:string
    title: string
    tasks: TaskType[]
    removeTask: (tasksId: string,todolistId:string) => void
    changeFilter: (todolistId:string,value: FilterValuesType) => void
    addTask: (todolistId:string,title: string) => void
    changeTaskStatus: (todolistId:string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todoListsDelete:(todolistId:string)=>void
}

export function Todolist(props: PropsType) {



    const onAllClickHandler = () => props.changeFilter(props.todolistId,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId,"completed");


    return <div>
        <h3>{props.title}</h3>
        <AddItemForm todolistId={""} addTask={props.addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id,props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId,t.id, e.currentTarget.checked);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
