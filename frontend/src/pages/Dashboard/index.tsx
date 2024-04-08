import { FC } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createTest } from "../../features/test/test.action";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard: FC = () => {
  axios.defaults.headers.common['token'] = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [tests, setTests] = React.useState<any>();
  const [avg, setAvg] = React.useState<Number>(0);
  var marks = {};
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  async function getTests() {
    const tests = await axios.get(`http://localhost:8080/test`);
    console.log("tests", tests.data);
    setTests(tests.data);
  }

  async function getResponses(test:any) {
    let m = 0;
    const responsess  = await axios.get(`http://localhost:8080/response/${test._id}`);
    console.log("array ",responsess.data);
    
    responsess && responsess.data.length > 0 && responsess?.data?.map((r: any)=> {
      m += r?.marks
    })
    // marks[test._id] = m;
    console.log(m, "marks", "number");
  }
  React.useEffect(() => {
    getTests();
  }, []);
  return (
    <Box sx={{ p: "24px" }}>
      <Box sx={{display:"flex", justifyContent:"space-between"}}>
        <Typography>
          All Tests
        </Typography>
      <Button variant="contained" onClick={handleClickOpen}>
        + Add test
      </Button>
      </Box>

      <Box sx={{display:'flex', flexDirection:"column", backgroundColor:"white", borderRadius:"0.8rem", border:"1px solid black", my:"20px", p:"20px"}}>
            {tests && tests.length > 0 && tests.map((test: any)=> {
              getResponses(test);
                return (
                <Box sx={{height:"30px", color:"black", display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                    <Box>{test.testName}</Box>
                    <Box> 
                    <IconButton ><EditIcon/></IconButton>
                    <IconButton><DeleteIcon/></IconButton>
                    </Box> 
                </Box>
                );
            })}
          </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const testName = formJson.testName;

            console.log(testName);

            dispatch(createTest({ testName})).then(
              (response: any) => {
                if (!response.payload) {
                  console.log(response.error.message, "error");
                  alert("Could not add test");
                } else {
                  console.log("response payload test ", response.payload);
                  navigate(`/add_test/${response.payload._id}`);
                }
              }
            );
            handleClose();
          },
        }}
      >
        <DialogTitle>Test</DialogTitle>
        <DialogContent>
          <DialogContentText>Add the name of the new test</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="testName"
            label="Test name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
