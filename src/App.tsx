import './global.css'
import { Header } from './components/Header'
import style from './App.module.css';
import { PlusCircle } from 'phosphor-react'
import { Empty } from './components/Empty';
import { Task } from './components/Task';
import { v4 as uuid} from 'uuid';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Tasks {
    id:string;
    description:string;
    isCheck:boolean;
}


function App() {

  const [ dataTasks, setDataTasks ] = useState<Tasks[]>([])
  const [ countTasksFinished, setCountTasksFinished ] = useState(0)
  const [ newTask , setNewTask ] = useState('');

  function handleCreateNewTask (event: FormEvent) {
    event.preventDefault()

    if(!!newTask.length)
    {
      const newTaskStructure = {
        id:uuid(),
        description:newTask,
        isCheck:false
      }
  
      setDataTasks([...dataTasks, newTaskStructure])
      setNewTask('');
    }
  }

  function handleNewTaskChange (event : ChangeEvent<HTMLInputElement>) {
      setNewTask(event.target.value)
  }

  function handleDelete (id : string){
    const dataToDelete = dataTasks.filter(task => task.id !== id);
    setDataTasks(dataToDelete);
  }

  function handleCheck (id : string) {
    const newData = dataTasks.map(task => {
        if(task.id === id ) {
          return {...task, isCheck:!task.isCheck}
        }
        return task
      }
    )

    setDataTasks(newData);
  }

  function countTasks () {
    let totalTasks = dataTasks.reduce((totalTasks, task) => {
    
        if(task.isCheck) return totalTasks +=1;

        else return totalTasks;

      }, 0) 
      
      return totalTasks
  }
  
  useEffect(()=>{
    setCountTasksFinished(countTasks())
  },[dataTasks])

  return (
    <>
      <Header/>
      
      <div className={style.wrapper}>
          <form 
            className={style.taksForm}
            onSubmit={handleCreateNewTask}
          >
            <input 
              name='taks' 
              value={newTask}
              placeholder='Adicione uma nova tarefa' 
              onChange={handleNewTaskChange}
            />
            <button type='submit'>Criar <PlusCircle/></button>
          </form>

          <div className={style.info}>
            <p className={style.countTaksCreate}>
              Tarefas criadas {` `}
              <span>{dataTasks.length}</span> 
            </p>
            <p className={style.countTaksComplete}>Concluidas <span>{countTasksFinished} de {dataTasks.length}</span></p>

          </div>

          <div className={style.content}>

              {
                !dataTasks.length?
                    <Empty/>
                    :
                    dataTasks.map(task =>(
                      <Task task={task} onCheck={handleCheck} onDelete={handleDelete} />
                    ))
              }

          </div>
      </div>
    </>
  )
}

export default App
