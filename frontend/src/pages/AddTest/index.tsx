import { FC, useEffect, useState } from "react";
import { Box, Button, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const AddTest: FC = () => {
  axios.defaults.headers.common["token"] = localStorage.getItem("token");
  const [answer, setAnswer] = React.useState<Number>(1);
  const navigate = useNavigate();
  let { id } = useParams();
  const [testname, setTestname] = useState<String>("");
  const [total, setTotal] = useState<Number>(0);
  const [questions, setQuestions] = useState([]);
  async function getQuestions() {
    const questions = await axios.get(`http://localhost:8080/question/${id}`);
    console.log("questions", questions);
    var totalWeight = 0;
    questions && questions?.data?.length > 0 &&  questions?.data?.map((q: any)=> {
        totalWeight += q.weightage;
    })
    console.log(totalWeight);
    setTotal(totalWeight)
    setQuestions(questions.data);
  }

  async function postQuestion(form : any) {
    const question = await axios.post(`http://localhost:8080/question`, form);
    console.log("question posted", question);
  }
  useEffect(() => {
    getQuestions();
  }, []);
  const handleSubmit = () => {
    if (questions.length === 0) alert("Not enough questions");
    else { navigate("/dashboard");
    }
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAnswer(Number(event.target.value));
  };
  return (
    <Box sx={{ p: "24px" }}>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography>Questions in this test -</Typography>
            <Typography> Total Weightage = {Number(total)}</Typography>
        </Box>
       
      <form>
        <Box sx={{ display: "flex", flexDirection: "column" }}>

          <Box sx={{display:'flex', flexDirection:"column", backgroundColor:"white", borderRadius:"0.8rem", border:"1px solid black", my:"20px", p:"20px"}}>
            {questions && questions?.length > 0 && questions?.map((que: any)=> {
                return (
                <Box sx={{height:"30px", color:"black", display:"flex", alignItems:"center", justifyContent:"space-around"}}>
                    <Box>{que.question}</Box>
                    <Box> 
                    <IconButton><EditIcon/></IconButton>
                    <IconButton><DeleteIcon/></IconButton>
                    </Box> 
                </Box>
                );
            })}
          </Box>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add new Question
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(
                  (formData as any).entries()
                );
                const form = {...formJson, testId: id, answer};
                console.log(form);
                postQuestion(form);
                handleClose();
                window.location.reload();
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
                id="question"
                name="question"
                label="Question"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                id="option 1"
                name="option1"
                label="Option 1"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                id="option 2"
                name="option2"
                label="Option 2"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                id="option 3"
                name="option3"
                label="Option 3"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                id="option 4"
                name="option4"
                label="Option 4"
                type="text"
                fullWidth
                variant="standard"
              />
              <Box sx={{display:"flex", alignItems:"center"}}>
                
                <Typography>Answer - </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(answer)}
                label="Answer"
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
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

          <Button variant="contained" onClick={() => handleSubmit()}>
            {" "}
            Add this Test{" "}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTest;
