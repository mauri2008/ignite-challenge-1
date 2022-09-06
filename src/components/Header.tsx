import style from './Header.module.css';
import logo from '../assets/images/Logo.png'

export function Header () {
    return (
        <header className={style.header}>
            <img src={logo}alt='Logotipo TODOLIST'/>
        </header>
    )
}