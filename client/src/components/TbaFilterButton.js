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
    fontSize: "13px",
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
    fontSize: "13px",
    fontWeight: "bold",
    color: "#515151",
    marginLeft: "5px",
    marginBottom: "-5px",
  },
};

const datePickerStyles = {
  width: "8rem",
  marginTop: "10px",
  marginRight: "16px",
  whiteSpace: "nowrap",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'none',
      borderWidth: 0,
    },
    '&:hover fieldset': {
      borderColor: 'none',
      borderWidth: 0,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'none',
      borderWidth: 0,
    }
  },
  '& .MuiInputLabel-root': {
    color: '#a6a4a4',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  '& .MuiMenuItem-root': {
    fontSize: '12px',
  },
};

function TbaFilterButton({ onFilter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(dayjs());
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
    setMinItems("");
    setMaxItems("");
  };

  const initializeButtonStyles = {
    width: "30%",
    height: "35px",
    position: "absolute",
    bottom: "-68px",
    right: "292px",
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
    width: "30%",
    height: "35px",
    position: "absolute",
    bottom: "-68px",
    right: "23px",
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
            width: "450px",
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
            <MenuItem onClick={(event) => event.stopPropagation()} sx={durationsStyles}>
              <Typography {...durationsStyles.typography}>Durations</Typography>
              <div style={{ display: "flex", alignItems: "center", width: "18rem", height: "40px", marginLeft: "86px" }}>
                <div style={{ display: "inline-block", marginRight: "8px" }}>
                  <DatePicker
                    defaultValue={dayjs()}
                    renderInput={(params) => <FormControl fullWidth variant="standard">{params.input}</FormControl>}
                  />
                </div>
                <div style={datePickerStyles}>
                  <DatePicker
                    defaultValue={dayjs()}
                    renderInput={(params) => <FormControl fullWidth variant="standard">{params.input}</FormControl>}
                  />
                </div>
              </div>
            </MenuItem>
          </LocalizationProvider>
          <MenuItem onClick={(event) => event.stopPropagation()} sx={numberOfItemsStyles}>
            <Typography {...numberOfItemsStyles.typography}>Number of Items</Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                variant="outlined"
                size="small"
                label="Min"
                value={minItems}
                onChange={(e) => setMinItems(e.target.value)}
                sx={datePickerStyles}
              />
              <TextField
                variant="outlined"
                size="small"
                label="Max"
                value={maxItems}
                onChange={(e) => setMaxItems(e.target.value)}
                sx={datePickerStyles}
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