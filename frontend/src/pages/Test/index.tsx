import { FC } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import * as React from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import RadioComponent from "../../components/Radio";

const Test: FC = () => {
  axios.defaults.headers.common["token"] = localStorage.getItem("token");
  let { id } = useParams();
  const [total, setTotal] = React.useState<Number>();
  const [questions, setQuestions] = React.useState<any>();
  const navigate = useNavigate();

  async function getQuestions() {
    const questions = await axios.get(`http://localhost:8080/question/${id}`);
    var totalWeight = 0;
    questions &&
      questions?.data?.length > 0 &&
      questions?.data?.map((q: any) => {
        totalWeight += q.question.weightage;
      });
    setTotal(totalWeight);
    setQuestions(questions.data);
  }

  
  React.useEffect(() => {
    getQuestions();
  }, []);

  async function handleClick() {
    
    try {
      const marks = await axios.get(`http://localhost:8080/result/${id}`);
      alert(`You got ${marks.data.marks} out of ${total}`)
    } catch (error) {
      console.log("result error", error);
    }
    navigate("/");
  }

  return (
    <Box sx={{ p: "24px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography> Test</Typography>
        <Typography> Total Marks - {Number(total)}</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "0.8rem",
          minHeight:"400px",
          padding: "20px",
          boxSizing: "border-box"
        }}
      >
        {questions &&
          questions.length > 0 &&
          questions?.map((q: any) => {
            return (
              <Box key={q.uuid}>
                
                <RadioComponent q={q} />
              </Box>
            );
          })}
      <Button variant="contained" onClick={()=> handleClick()}>Submit </Button>
      </Box>
    </Box>
  );
};

export default Test;
