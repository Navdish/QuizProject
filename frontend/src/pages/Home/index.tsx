import { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../../components/DateRangePicker";

const Home: FC = () => {
  axios.defaults.headers.common["token"] = localStorage.getItem("token");

  const [tests, setTests] = React.useState<any>();
  const navigate = useNavigate();

  async function getTests() {
    try {
      const response = await axios.get(`http://localhost:8080/test`);
      setTests(response.data);
    } catch (error: any) {
      console.log(error.response.status, "eror");
      if (error.response.status === 498) {
        localStorage.clear();
        localStorage.removeItem("persist:root");
        console.log(localStorage.getItem("persist:root"));
        navigate('/signup')
      }
    }
  }

  
  React.useEffect(() => {
    getTests();
  }, []);

  const handleClick = (test: any) => {
    navigate(`/test/${test.uuid}`);
  };

  return (
    <Box sx={{ p: "24px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>All Tests</Typography>
      </Box>

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
        {tests &&
          tests.length > 0 &&
          tests.map((test: any) => {
            return (
              <Box
                sx={{
                  height: "40px",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                key={test.uuid}
              >
                <Box>{test.title}</Box>
                <Box>
                  <Button variant="contained" onClick={() => handleClick(test)}>
                    Take the test
                  </Button>
                </Box>  
              </Box>
            );
          })}
      </Box>

      <DateRangePicker />
    </Box>
  );
};

export default Home;
