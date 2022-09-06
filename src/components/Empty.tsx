import style from './Empty.module.css';
import clipboard from '../assets/images/Clipboard.png'


export function Empty() {
    return (
        <div className={style.contentEmpty}>
            <img src={clipboard} alt='Clipboard'/>
            <h4>Você ainda não tem tarefas cadastradas</h4>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}