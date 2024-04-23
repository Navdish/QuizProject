import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

interface Radioprops {
  q: any;
}



function RadioComponent(props: Radioprops) {
  useEffect(()=> {
    getResponses();
  })
  const [value, setValue] = React.useState("");

  const getResponses = async() => {
    try {
      const res = await axios.get(`http://localhost:8080/response/${props.q.uuid}`); 
      console.log('res: ', res);
      setValue(res.data.response);
    } catch (error) {
      console.log("errorrrrr", error);
    }
  }

  const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    
    try {
      const scoreResponse = await axios.post(`http://localhost:8080/response`, {
      response: (event.target as HTMLInputElement).value,
      question_marks : props.q.question.weightage,
      test_questionId : props.q.uuid,
    });
    } catch (error) {
      console.log("Errorr", error)
    }
  };
  return (
    <Box>
      <Box sx={{ fontSize: "20px", ml: "20px" }}>
        Question - {props.q.question.description}
      </Box>
      <Box sx={{ ml: "20px" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              {props.q.question.options.map((op:any, id:any) => {
                return (
                  <FormControlLabel
                    value={op}
                    control={<Radio />}
                    label={op}
                    key={id}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </RadioGroup>
      </Box>
    </Box>
  );
}

export default RadioComponent;
