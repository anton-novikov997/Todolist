import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string, title: string, filter: FilterValuesType
}
type TasksType = {
    [todolistId: string]: TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function removeTask(tasksId: string,todolistId:string) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].filter(el=>el.id !=tasksId)})
    }

    function addTask(todolistId:string,title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistId]: [...tasks[todolistId],task]})
    }

    function changeStatus(todolistId:string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId?{...el,isDOne:isDone}:el)})
    }

    function changeFilter(todolistId:string,value: FilterValuesType) {
            setTodolists(todolists.map(el=>el.id===todolistId?{...el,filter:value}:el))
    }
    function todoListsDelete(todolistId:string){
        setTodolists(todolists.filter(el=>el.id != todolistId))
        delete tasks[todolistId]
    }

    const addTodolist =(title:string)=>{
        let todolistID=v1()
        const newTodolist:TodolistType={id: todolistID, title:title , filter: 'all'}
        setTodolists([...todolists,newTodolist])
        setTasks({...tasks,[todolistID]:[]})
    }

    return (
        <div className="App">
            <AddItemForm todolistId={""} addTask={addTask}/>
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }
                return (<Todolist
                    todolistId={tl.id}
                    title="What to learn"
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={tl.filter}
                                  todoListsDelete={todoListsDelete}
                />)

            })}
        </div>
    );
}

export default App;
