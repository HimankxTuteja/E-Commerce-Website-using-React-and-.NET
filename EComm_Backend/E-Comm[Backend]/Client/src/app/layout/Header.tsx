import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import SignedInMenu from "./SignedInMenu";
import { useAppSelector } from "../store/configureStore";

const midLinks = [
    {title: 'catalog', path: 'catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}
 
interface Props {
    darkMode: boolean
    handleThemeChage: () => void;
}
export default function Header({darkMode, handleThemeChage}: Props) {
    const {basket} = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account);

    // const itemCount = basket?.items.reduce((sum + item) => sum + item.quantity, 0)
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

            <Box display='flex' alignItems='center'>
                <Typography variant='h6' component={NavLink} 
                to='/'
                sx={navStyles}
                >
                    RE-STORE
                </Typography>
                <Switch  checked={darkMode} onChange={handleThemeChage}/>
            </Box>

                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

            <Box display='flex' alignItems='center'>
                <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr: 2}}>
                    <Badge badgeContent={itemCount} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                {user ? (
                    <SignedInMenu />
                ) : (
                    <List sx={{display: 'flex'}}>
                    {rightLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                )}
            </Box>
            </Toolbar>
        </AppBar>
    )
}