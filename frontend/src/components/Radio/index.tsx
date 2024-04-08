import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

interface Radioprops {
  q: any;
  response: any;
  setResponse: any;
}

function RadioComponent(props: Radioprops) {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    const id = props.q._id;
    var obj: any = {};
    obj[id] = (event.target as HTMLInputElement).value;
    console.log("object", obj);
    props.response[id] = [(event.target as HTMLInputElement).value];
    props.setResponse(props.response);
    console.log("props response", props.response);
  };
  return (
    <Box>
      <Box sx={{ fontSize: "20px", ml: "20px" }}>
        Question - {props.q?.question}
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
              <FormControlLabel
                value={props.q.option1}
                control={<Radio />}
                label={props.q.option1}
              />
              <FormControlLabel
                value={props.q.option2}
                control={<Radio />}
                label={props.q.option2}
              />
              <FormControlLabel
                value={props.q.option3}
                control={<Radio />}
                label={props.q.option3}
              />
              <FormControlLabel
                value={props.q.option4}
                control={<Radio />}
                label={props.q.option4}
              />
            </RadioGroup>
          </FormControl>
        </RadioGroup>
      </Box>
    </Box>
  );
}

export default RadioComponent;
