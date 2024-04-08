import { Button, Paper, Snackbar, Stack, Typography } from "@mui/material";
import Box from '@mui/system/Box';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import { RootState } from '../../app/store';
import { useAppDispatch } from '../../app/hooks'
import { useForm } from "react-hook-form";
import { LoginSchema, LoginFormData } from './types';
import FormField from '../../components/FormField';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/auth/auth.action";

function Login() {

    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginProps>({
        resolver: zodResolver(LoginSchema), // Apply the zodResolver
    });

    const onSubmit = async (data: loginProps) => {
        console.log("SUCCESS", data);
        dispatch(login(data)).then((response: any)=> {
                    if(!response.payload) {
                        console.log(response.error.message,'error');
                        // add snackbar showing wrong credentials
                        setOpen(true);

                        navigate("/Login");
                    }
                    else {
                        console.log("response payload", response.payload);
                        localStorage.setItem("token", response.payload.user.token);
                        const role = response.payload.user.user.role;
                        console.log(role);
                        if(role === 'STUDENT') navigate('/');
                        navigate('/dashboard');
                        // navigate('/');
                    }
                });
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f9fafb",
            }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper
                    sx={{
                        width: "55vw",
                        height: "80vh",
                        display: "flex",
                        alignItems: "center",
                        p: 3,
                    }}
                >
                
                    <Stack
                        width={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                    >
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 4 }}>
                            Sign In
                        </Typography>


                        <FormField
                            type="text"
                            placeholder="Email"
                            name="email"
                            register={register}
                            error={errors.email}
                        />

                        <FormField
                            type="password"
                            placeholder="Password"
                            name="password"
                            register={register}
                            error={errors.password}
                        />

                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            sx={{
                                textTransform: "none",
                                borderRadius: "10px",
                                fontSize: "16px",
                                width: "80%",
                                fontWeight: "500",
                                boxShadow: "none",
                                mb: 4,
                            }}
                        >
                            Sign In
                        </Button>
                        <Box> New user ?? <Link to={'/signup'}> Sign Up </Link></Box>
                    </Stack>
                </Paper>
            </form>
            <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Invalid credentials"
                    action={action}
                />
        </Box>
    );
}

export default Login;