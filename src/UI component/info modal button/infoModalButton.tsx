import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";

export default function InfoModalButton({func}:{func: () => void}) {
    return (
        <>
            <Button variant='contained' disableElevation onClick={func} style={{width:'45px', height:'45px'}}>
                <FontAwesomeIcon icon={faCircleInfo} style={{fontSize: '42px'}}/>
            </Button>
        </>
    )
}