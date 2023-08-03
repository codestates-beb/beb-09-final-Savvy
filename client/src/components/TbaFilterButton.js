import { useState } from "react";
import {
  Button,
  Menu,
  Typography,
  Box,
  FormControl,
  TextField,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/";

const durationsStyles = {
  typography: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#272727",
    marginTop: "5px",
    marginRight: "-10px",
    marginLeft: "136px",
    position: "relative",
    top: "2px",
  },
};

const numberOfItemsStyles = {
  typography: {
    flexGrow: 1,
    fontSize: "14px",
    fontWeight: "600",
    color: "#272727",
    marginLeft: "114.5px",
    marginBottom: "-5px",
    position: "relative",
    top: "52px",
  },
};

const datePickerAndTextFieldStyles = {
  width: "8.5rem",
  marginRight: "15px",
  whiteSpace: "nowrap",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "none",
      borderWidth: 0,
    },
    "&:hover fieldset": {
      borderColor: "none",
      borderWidth: 0,
    },
    "&.Mui-focused fieldset": {
      borderColor: "none",
      borderWidth: 0,
    },
  },
  "& .MuiInputLabel-root": {
    color: "#a6a4a4",
    fontSize: "12px",
    marginTop: "2px",
    fontWeight: "bold",
  },
  "& .MuiMenuItem-root": {
    fontSize: "12px",
  },
  "& .MuiIconButton-root": {
    marginLeft: "-15px",
  },
  "& .MuiIconButton-label": {
    fontSize: "1rem",
  },
};

function TbaFilterButton({ onFilter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(dayjs());
  const [minItems, setMinItems] = useState("");
  const [maxItems, setMaxItems] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilter = (filterOption) => {
    onFilter(filterOption);
    handleClose();
  };

  const initializeFilters = () => {
    setValue(dayjs());
    setMinItems("");
    setMaxItems("");
    setStartDate(dayjs());
    setEndDate(dayjs());
  };

  return (
    <>
      <Box
        sx={{
          width: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          borderRadius: "10px",
          display: "inline-block",
          transform: "translateY(1px)",
        }}
      >
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{
            color: "#666",
            backgroundColor: "#fff",
            height: "40px",
            "&:hover": {
              backgroundColor: "#f1f1f1",
            },
            transition: "background-color 0.5s ease",
          }}
          startIcon={<TuneIcon sx={{ color: "#666" }} />}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", fontSize: "12px" }}
          >
            Filter
          </Typography>
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: 5,
            width: "335px",
            height: "280px",
            marginTop: "5px",
            minHeight: "220px",
            maxHeight: "300px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          },
        }}
      >
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div sx={durationsStyles}>
              <Typography {...durationsStyles.typography}>Durations</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "-10px",
                  marginLeft: "25px",
                  position: "relative",
                  top: "20px",
                }}
              >
                <div style={{ display: "inline-block" }}>
                  <DatePicker
                    value={startDate}
                    onChange={setStartDate}
                    defaultValue={dayjs()}
                    format="YYYY/MM/DD"
                    renderInput={(params) => (
                      <FormControl fullWidth variant="standard">
                        {params.input}
                      </FormControl>
                    )}
                    sx={datePickerAndTextFieldStyles}
                    inputProps={{ style: { fontSize: "12px" } }}
                  />
                  <div
                    style={{
                      height: "1px",
                      background: "#d2ced2",
                      width: "189%",
                      position: "relative",
                      top: "18px",
                    }}
                  ></div>
                </div>
                <div>
                  <DatePicker
                    value={endDate}
                    onChange={setEndDate}
                    defaultValue={dayjs()}
                    format="YYYY/MM/DD"
                    renderInput={(params) => (
                      <FormControl fullWidth variant="standard">
                        {params.input}
                      </FormControl>
                    )}
                    sx={datePickerAndTextFieldStyles}
                    inputProps={{ style: { fontSize: "12px" } }}
                  />
                </div>
              </div>
            </div>
          </LocalizationProvider>

          <div sx={numberOfItemsStyles}>
            <Typography {...numberOfItemsStyles.typography}>
              Number of Items
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "25px",
                width: "400px",
                position: "relative",
                top: "66.5px",
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                label="Min"
                value={minItems}
                onChange={(e) => setMinItems(e.target.value)}
                sx={datePickerAndTextFieldStyles}
              />
              <TextField
                variant="outlined"
                size="small"
                label="Max"
                value={maxItems}
                onChange={(e) => setMaxItems(e.target.value)}
                sx={datePickerAndTextFieldStyles}
              />
            </div>
          </div>
        </div>

        <div>
          <Button
            onClick={initializeFilters}
            size="small"
            sx={{
              backgroundColor: "#f88181",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#eb6363",
              },
              width: "136px",
              height: "35px",
              marginTop: "90px",
              marginLeft: "23px",
              fontSize: "12px",
              fontWeight: "600",
              borderRadius: "5px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            Initialize
          </Button>

          <Button
            onClick={() =>
              handleFilter({
                startDate: startDate.format("YYYY-MM-DD"),
                endDate: endDate.format("YYYY-MM-DD"),
                minItems: minItems,
                maxItems: maxItems,
              })
            }
            variant="contained"
            color="primary"
            size="small"
            sx={{
              backgroundColor: "#576ff6",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3351e2",
              },
              width: "136px",
              height: "35px",
              marginTop: "90px",
              marginLeft: "18px",
              fontSize: "12px",
              fontWeight: "600",
              borderRadius: "5px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            Apply
          </Button>
        </div>
      </Menu>
    </>
  );
}
export default TbaFilterButton;
