import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
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
    variant: "body1",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#515151",
    marginRight: "-10px",
    marginLeft: "5px",
  },
};

const numberOfItemsStyles = {
  typography: {
    variant: "body1",
    flexGrow: 1,
    fontSize: "16px",
    fontWeight: "bold",
    color: "#515151",
    marginLeft: "5px",
    marginBottom: "-5px",
  },
};

function TbaFilterButton({ onFilter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(dayjs());
  const [anotherDate, setAnotherDate] = useState(dayjs());
  const [minItems, setMinItems] = useState("");
  const [maxItems, setMaxItems] = useState("");

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
    setAnotherDate(dayjs());
    setMinItems("");
    setMaxItems("");
  };

  const initializeButtonStyles = {
    width: "100px",
    height: "35px",
    position: "absolute",
    bottom: "-50px",
    right: "366px",
    borderRadius: "6px",
    backgroundColor: "#f88181",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
    border: "none",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "#eb6363",
      border: "none",
    },
  };

  const applyButtonStyles = {
    width: "100px",
    height: "35px",
    position: "absolute",
    bottom: "-50px",
    right: "32px",
    backgroundColor: "#576ff6",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
    border: "none",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
  };

  return (
    <>
      <Box
        sx={{
          width: "auto",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.15)",
          borderRadius: "10px",
          display: "inline-block",
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
            sx={{ fontWeight: "bold", letterSpacing: "1px", fontSize: "12px" }}
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
            borderRadius: 2,
            width: "490px",
            minHeight: "200px",
            maxHeight: "300px",
            overflowY: "auto",
            padding: "0.3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          },
        }}
      >
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MenuItem
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                marginTop: "10px",
                ...durationsStyles,
              }}
            >
              <Typography {...durationsStyles.typography}>Durations</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "280px",
                  height: "40px",
                  marginLeft: "86px",
                }}
              >
                <div
                  style={{
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                >
                  <DatePicker
                    defaultValue={dayjs()}
                    renderInput={(params) => (
                      <FormControl fullWidth variant="standard">
                        {params.input}
                      </FormControl>
                    )}
                  />
                </div>
                <Typography
                  variant="body2"
                  sx={{
                    margin: "0 4px",
                    marginLeft: "6px",
                    marginRight: "14px",
                  }}
                >
                  ~
                </Typography>
                <div
                  style={{
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    display: "inline-block",
                  }}
                >
                  <DatePicker
                    defaultValue={dayjs()}
                    renderInput={(params) => (
                      <FormControl fullWidth variant="standard">
                        {params.input}
                      </FormControl>
                    )}
                  />
                </div>
              </div>
            </MenuItem>
          </LocalizationProvider>
          <MenuItem sx={{ ...numberOfItemsStyles }}>
            <Typography {...numberOfItemsStyles.typography}>
              Number of Items
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                variant="outlined"
                size="small"
                label="Min"
                value={minItems}
                onChange={(e) => setMinItems(e.target.value)}
                sx={{
                  width: "122.5px",
                  marginTop: "10px",
                  marginRight: "5.5px",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                    fontWeight: "600",
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  marginRight: "14px",
                  marginLeft: "7px",
                  marginTop: "8px",
                }}
              >
                ~
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                label="Max"
                value={maxItems}
                onChange={(e) => setMaxItems(e.target.value)}
                sx={{
                  width: "122.5px",
                  marginTop: "10px",
                  marginRight: "16px",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "14px",
                    fontWeight: "600",
                  },
                }}
              />
            </div>
          </MenuItem>
        </div>
        <div>
          <Button
            onClick={initializeFilters}
            size="small"
            variant="outlined"
            sx={initializeButtonStyles}
          >
            Initialize
          </Button>
          <Button
            onClick={() => handleFilter({ value, minItems, maxItems })}
            size="small"
            variant="contained"
            color="primary"
            sx={applyButtonStyles}
          >
            Apply
          </Button>
        </div>
      </Menu>
    </>
  );
}

export default TbaFilterButton;
