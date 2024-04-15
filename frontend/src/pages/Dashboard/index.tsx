import { FC } from "react";
import { Box, Button, FormControlLabel, IconButton, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch} from "../../app/hooks";
import { createTest } from "../../features/test/test.action";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard: FC = () => {
  axios.defaults.headers.common['token'] = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [tests, setTests] = React.useState<any>();
  const [answer, setAnswer] = React.useState<String>("");
  const [avg, setAvg] = React.useState<Number>(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleQuestionOpen = () => {
    setOpen2(true);
  }

  const handleQuestionClose = () => {
    setOpen2(false);
  }
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

  async function postQuestion(form: any) {
    const question = await axios.post(`http://localhost:8080/question`, form);
    console.log("question posted", question);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setAnswer(String(event.target.value));
  };

  const handleOptions = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(event.target.value);
    var op = event.target.value.split(",");
    console.log("options length", op);
    setOptions(op);
  };
  const [options, setOptions] = React.useState<string[]>([]);
  // async function getResponses(test:any) {
  //   let m = 0;
  //   const responsess  = await axios.get(`http://localhost:8080/response/${test._id}`);
  //   console.log("array ",responsess.data);
    
  //   responsess && responsess.data.length > 0 && responsess?.data?.map((r: any)=> {
  //     m += r?.marks
  //   })
  //   // marks[test._id] = m;
  //   console.log(m, "marks", "number");
  // }
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
      <Button variant="contained" onClick={handleQuestionOpen}>
        + Add Question
      </Button>
      </Box>

      <Box sx={{display:'flex', flexDirection:"column", backgroundColor:"white", borderRadius:"0.8rem", border:"1px solid black", my:"20px", p:"20px"}}>
            {tests && tests.length > 0 && tests.map((test: any)=> {
              // getResponses(test);
                return (
                <Box sx={{height:"30px", color:"black", display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                    <Box>{test.title}</Box>
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
            

            console.log("Form of test",formJson);

            dispatch(createTest({ formJson})).then(
              (response: any) => {
                if (!response.payload) {
                  console.log(response.error.message, "error");
                  alert("Could not add test");
                } else {
                  console.log("response payload test ", response.payload);
                  navigate(`/add_test/${response.payload.id}`);
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
          <TextField
            required
            margin="dense"
            id="instructions"
            name="instructions"
            label="Test Instructions"
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





      <Dialog
            open={open2}
            onClose={handleQuestionClose}
            PaperProps={{
              component: "form",
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(
                  (formData as any).entries()
                );
                var options = formJson.option.split(",");
                console.log("options", options);
                var trimmed_options = options.map((s: any) => s.trim());
                const form = {
                  ...formJson,
                  option: trimmed_options,
                  answer,
                };
                console.log(form);
                postQuestion(form);
                handleClose();
                // window.location.reload();
              },
            }}
          >
            <DialogTitle>Add new Question</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label="Question description"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                id="option"
                name="option"
                label="Options (Please enter options separated by commas)"
                type="text"
                fullWidth
                variant="standard"
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => handleOptions(event)}
              />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Answer </Typography>
                <Select
                required
                
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={String(answer)}
                  onChange={handleChange}
                  fullWidth
                >
                  {options &&
                    options.length > 0 &&
                    options.map((i) => {
                      return <MenuItem value={i}>{String(i)}</MenuItem>;
                    })}
                </Select>
              </Box>

              <TextField
                required
                margin="dense"
                id="weightage"
                name="weightage"
                label="Weightage"
                type="Number"
                fullWidth
                variant="standard"
              />
            
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add Question</Button>
            </DialogActions>
          </Dialog>
    </Box>
  );
};

export default Dashboard;
