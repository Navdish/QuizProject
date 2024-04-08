import { Box, Button, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

// import Sidebar from './Sidebar';
// import Header from './Header';

interface SidebarLayoutProps {
    children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{display:'flex',width:"100vw", minHeight:"100vh", backgroundColor:"#F6F8FF", flexDirection:"column"}}>
                <Box sx={{width:"100%", height:"55px", backgroundColor:"white", display:"flex", justifyContent:"space-between", alignItems:"center", boxSizing:"border-box", px:"20px"}}>
                    <Typography>
                        QUIZ TIME
                    </Typography>
                    <Button onClick={()=> {localStorage.clear(); navigate("/signup")}}>
                        Logout
                    </Button>
                </Box>
                <Stack width={'100%'} sx={{boxSizing:"border-box"}} >
                    <Outlet />
                </Stack>
            </Box>
        </>
    )
}

export default SidebarLayout;