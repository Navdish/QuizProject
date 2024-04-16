import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  List,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExistingDialog from "../../components/ExistingDialog";

const AddTest: FC = () => {
  axios.defaults.headers.common["token"] = localStorage.getItem("token");
  const [answer, setAnswer] = React.useState<String>("");
  const navigate = useNavigate();
  let { id } = useParams();
  const [options, setOptions] = useState<string[]>([]);
  const [total, setTotal] = useState<Number>(0);
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  async function getQuestions() {
    try {
      const questions = await axios.get(`http://localhost:8080/question/${id}`);
    console.log("questions", questions);
    var totalWeight = 0;
    questions &&
      questions?.data?.length > 0 &&
      questions?.data?.map((q: any) => {
        totalWeight += q.question.weightage;
      });
    setTotal(totalWeight);
    setQuestions(questions.data);
    } catch (error) {
      console.log("Error in getting question", error);
    }
    
  }
  async function getAllQuestions() {
    try {
      const questions = await axios.get(`http://localhost:8080/question/${-1}`);
    console.log("All questions", questions);
    
    setAllQuestions(questions.data);
    } catch (error) {
      console.log("Error in getting all questions", error);
    }
    
  }

  async function postQuestion(form: any) {
    const question = await axios.post(`http://localhost:8080/question`, form);
    console.log("question posted", question);
  }

  const [radio, setRadio] = React.useState("true");

  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setRadio(event.target.value);
  };
  useEffect(() => {
    getQuestions();
    getAllQuestions();
  }, []);
  const handleSubmit = () => {
    if (questions.length === 0) alert("Not enough questions");
    else {
      navigate("/dashboard");
    }
  };
  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOptions([""]);
  };
  const handleClose3 = () => {
    setOpen3(false);
    window.location.reload();
  };

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
  return (
    <Box sx={{ p: "24px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Questions in this test -</Typography>
        <Typography> Total Weightage = {Number(total)}</Typography>
      </Box>

      <form>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "0.8rem",
              border: "1px solid black",
              my: "20px",
              p: "20px",
            }}
          >
            {questions &&
              questions?.length > 0 &&
              questions?.map((que: any) => {
                return (
                  <Box
                    sx={{
                      height: "30px",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box>{que.question.description}</Box>
                    <Box>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
          </Box>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add new Question
          </Button>

          <Button variant="outlined" onClick={handleClickOpen3}>
            Add Existing Questions
          </Button>


          <Dialog
            open={open3}
            onClose={handleClose3}
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
                  testId: id,
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
            <DialogTitle>Add Existing Question</DialogTitle>
            <DialogContent>
            <List
              sx={{
                width: 500,
                height: 230,
                bgcolor: 'background.paper',
                overflow: 'auto',
              }}
              dense
              component="div"
              role="list"
            >
            {allQuestions &&
              allQuestions?.length > 0 &&
              allQuestions?.map((que: any) => {
                return (
                  <ExistingDialog que={que}/>
                )
              })}
              
            </List>
           
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose3}>Cancel</Button>
            </DialogActions>
          </Dialog>


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
                var options = formJson.option.split(",");
                console.log("options", options);
                var trimmed_options = options.map((s: any) => s.trim());
                const form = {
                  ...formJson,
                  testId: id,
                  option: trimmed_options,
                  answer,
                };
                console.log(form);
                postQuestion(form);
                handleClose();
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
            <Box sx={{display:"flex", alignItems:"center"}}>
              <Typography>Required - &nbsp;</Typography>
              <RadioGroup
              
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="optional"
                value={radio}
                onChange={handleRadio}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="true"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="false"
                />
              </RadioGroup>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add Question</Button>
            </DialogActions>
          </Dialog>

          <Button variant="contained" onClick={() => handleSubmit()}>
            {" "}
            Dashboard{" "}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTest;
