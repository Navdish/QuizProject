import {
    Button,
  FormControlLabel,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const ExistingDialog = (que: any) => {
    const {id} = useParams();
  const [radio, setRadio] = React.useState("true");
  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadio(event.target.value);
  };

  const handleAdd =async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //create a new test-question with testId from params and questionid from que.que.id and optional from radio
    console.log("testId", id, "questionId", que.que.id, "optional", radio);
    const question = await axios.post(`http://localhost:8080/test_question`,{
        testId: id,
        questionId: que.que.id,
        optional: radio
    });
    console.log("question posted", question);
    
  }
  return (
    <div>
      <ListItemButton
        key={que.id}
        role="listitem"
        // onClick={handleToggle(value)}
      >
        <ListItemText id={que.que.id} primary={`Question - ${que.que.description}`} />
        <Typography>Required - &nbsp;</Typography>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="optional"
          value={radio}
          onChange={handleRadio}
        >
          <FormControlLabel value={true} control={<Radio />} label="true" />
          <FormControlLabel value={false} control={<Radio />} label="false" />
        </RadioGroup>
        <Button onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {handleAdd(e)}}>Add </Button>
      </ListItemButton>
    </div>
  );
};

export default ExistingDialog;
