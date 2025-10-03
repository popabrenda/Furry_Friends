import styles from './Button.module.css';
import {useNavigate} from "react-router-dom";


const Button = ({text, classname, path}) => {
    const navigate = useNavigate();


    const handleOnClick = () => {
        navigate(`${path}`);
    };

    return (
        <div className={`${styles[classname]}`} onClick={handleOnClick}>
            <div className={styles.primary}>{text}</div>
        </div>);
};

export default Button;
