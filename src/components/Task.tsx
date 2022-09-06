import style from './Task.module.css';
import { Trash, Check } from 'phosphor-react';
import { useState } from 'react';

interface TaskProps {
    task:{ 
        id:string;      
        description:string;
        isCheck:boolean;
    }
    onCheck:(id: string)=>void;
    onDelete:(id: string)=>void;
}

export function Task({ task, onCheck, onDelete } : TaskProps) {
    const [ check, setCheck ] = useState(false)

    function handleCheckTask () {
        onCheck(task.id)
    }

    function handleDeleteTask () {
        onDelete(task.id)
    }

    return (
        <article className={style.task}>
            <div 
                className={task.isCheck ? style.checkboxCustomCheck : style.checkboxCustom }
                onClick={handleCheckTask}
            >
                {
                    task.isCheck &&
                    <Check/>
                }
            </div>
            <p className={task.isCheck ? style.scratched: ''}>
                {task.description}
            </p>
            
            <Trash className={style.trash} onClick={handleDeleteTask}/>
        </article>
    )
}