import Box from "@mui/system/Box";
import FormField from "../../components/FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, UserSchema } from "./types";
import { Button, IconButton, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { createUser } from "../../features/auth/auth.action";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function Signup() {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    dispatch(createUser(data)).then((response) => {
      if(!response.payload) {
        // add snackbar showing wrong credentials
        setOpen(true);

        // navigate("/Login");
    }
      if (response.payload) navigate("/Login");
    });
  };
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

  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9fafb",
      }}
    >
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
              Create your Free Account
            </Typography>

            <FormField
              type="text"
              placeholder="Name"
              name="name"
              register={register}
              error={errors.name}
            />

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

            <FormField
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
            />
            {/* <button type="submit" className="submit-button">
                    Submit
                </button> */}
            <select
              {...register("role")}
              style={{
                margin: "10px",
                border: "1px solid transparent",
                padding: "10px",
              }}
            >
              <option value="STUDENT">STUDENT</option>
              <option value="ADMIN">ADMIN</option>
            </select>
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
              Create Account
            </Button>
            <Box> Already a user ?? <Link to={'/login'}> Log in </Link></Box>
          </Stack>
        </Paper>
      </form>
      <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="User Already exists, Please login"
                    action={action}
      />
    </Box>
  );
}
