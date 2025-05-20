import Button from "@mui/material/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartSimple} from "@fortawesome/free-solid-svg-icons";

export default function ChangeGraphButton({func}:{func: () => void}) {
    return (
        <>
            <div>
                <Button variant='contained' disableElevation style={{width:'50px', height:'55px'}}>
                    <FontAwesomeIcon icon={faChartSimple} style={{fontSize: '42px'}} onClick={func}/>
                </Button>
            </div>
        </>
    )
}