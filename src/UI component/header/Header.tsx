import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBitcoin} from "@fortawesome/free-brands-svg-icons";

import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <>
            <div className="headerMain">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                Crypto<FontAwesomeIcon icon={faBitcoin} />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>

                            </Typography>
                            <Link to={"/*"}>
                                <Button color="inherit">Coin converter</Button>
                            </Link>
                            <Link to={"/coins list"}>
                                <Button color="inherit">Coins list</Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        </>
    )
}