import { Box } from '@mui/material';
import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom';


interface BaseLayoutProps {
    children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = () => {
    return (
        <>
                <Box >
                    <Outlet />
                </Box>
        </>
    )
}

export default BaseLayout;