import {ReactComponent as Star} from '../icons/plus.svg';
import style from "./rate.module.css";

export default function Rate(props) {
    const listItems = [];
    for (let i = 0; i < props.value; i++) {
        listItems.push(<Star className={style.icon}/>);
    }

    return (
        <div>{listItems}</div>
    );
}
