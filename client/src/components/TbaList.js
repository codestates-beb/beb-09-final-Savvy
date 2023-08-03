import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTbaData } from "../reducers/tbaReducer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TbaFilterButton from "./TbaFilterButton";
import TbaAirdropButton from "./TbaAirdropButton";
import TbaGroupButton from "./TbaGroupButton";
import TbaModal from "./TbaModal";

// api
import { getAllTba } from "../api/get-all-tba";

const StyledListItemText = styled(ListItemText)({
  whiteSpace: "pre-wrap",
  userSelect: "none",
});

const EllipsisListItemText = styled(StyledListItemText)({
  textOverflow: "ellipsis",
  whiteSpace: "pre-wrap",
  maxWidth: "100%",
});

const StyledBox = styled(Box)({
  width: "2500px",
  marginTop: "130px",
  marginLeft: "-75px",
  marginRight: "35px",
});

const StyledListItem = styled(ListItem)({
  marginTop: "-13px",
});

const StyledPaper = styled(Paper)({
  margin: "15px 0",
  padding: "10px",
  height: "50px",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
});

const BoldTypography = styled(Typography)({
  fontWeight: "bold",
  fontSize: "14px",
});

const LevelCircle = styled("div")({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "20px",
  background: "#f5f5f5",
  color: "#576ff6",
  borderRadius: "5px",
  right: "256px",
  display: "flex",
  alignItems: "center",
});

const LevelContainer = styled("div")({
  position: "absolute",
  top: "4.5px",
  right: "295px",
  display: "flex",
  alignItems: "center",
});

const getLevelColor = (level) => {
  switch (level) {
    case 1:
      return { color: "#666", border: "1px solid #d5d5d5" };
    case 2:
      return { color: "#15be64", border: "1px solid #9dd0b5" };
    case 3:
      return { color: "#576ff6", border: "1px solid #8d96cd" };
    case 4:
      return { color: "#c020ca", border: "1px solid #de78e4" };
    case 5:
      return { color: "#e60a0a", border: "1px solid #d5d5d5" };
    default:
      return { color: "#666", border: "1px solid #d5d5d5" };
  }
};

const AirdropImage = styled("img")({
  width: "23px",
  height: "auto",
  marginRight: "-10px",
});

const MoreHorizStyled = styled(MoreHorizIcon)({
  marginLeft: "150px",
});

const ItemContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "40%",
  justifyContent: "center",
});

const SortContainer = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "7px",
  marginBottom: "16px",
  marginLeft: "30px",
  userSelect: "none",
});

const SortHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  marginRight: "-37px",
  gap: "1px",
});

const SortItemContainer = styled("div")({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
});

const SelectAllItemContainer = styled("div")({
  display: "flex",
  marginRight: "142px",
});

const CheckboxStyled = styled(Checkbox)(({ theme }) => ({
  marginRight: "50px",
  color: "#a6a6a6",
  "&.Mui-checked": {
    color: "#576ff6",
  },
}));

const CheckboxContainer = styled("div")({
  position: "absolute",
  right: "115px",
  display: "flex",
  alignItems: "center",
});

const AirdropImageContainer = styled("div")({
  position: "absolute",
  right: "100px",
  display: "flex",
  alignItems: "center",
});

const SelectAllText = styled("span")(({ isAllSelected }) => ({
  cursor: "pointer",
  width: "100px",
  marginTop: "15px",
  marginRight: "-110px",
  marginLeft: "0px",
  zIndex: 1,
  position: "absolute",
  right: "235px",
  fontSize: "13px",
  fontWeight: "bold",
  color: isAllSelected ? "#576ff6" : "#757575",
  "&:hover": {
    color: "#576ff6",
  },
}));

const AirdropText = styled("span")({
  position: "absolute",
  marginTop: "44px",
  right: "85px",
});

const preventCopy = (event) => {
  event.preventDefault();
};

const SortHeaderSpan = styled("span")({
  fontSize: "13px",
  fontWeight: "bold",
  color: "#666",
  marginTop: "36px",
});

/* const PositionedSortItemContainer = styled(SortItemContainer)({
  position: 'fixed',
  left: '500px',
}); */

function TbaList({ data = [] }) {
  const dispatch = useDispatch();
  const tbaData = useSelector((state) => state.tba.tbaData);
  let tbaDataDup = tbaData ? [...tbaData] : [];

  console.log(tbaData);
  const [filterOption, setFilterOption] = useState(null);
  const [sortBy, setSortBy] = useState("owner");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openTbaModal, setOpenTbaModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    document.addEventListener("copy", preventCopy);
    return () => {
      document.removeEventListener("copy", preventCopy);
    };
  }, []);

  useEffect(() => {
    const initTbaData = async () => {
      const tba = await getAllTba();
      if (tba) {
        dispatch(setTbaData(tba));
      } else {
        dispatch(setTbaData(null));
      }
    };
    initTbaData();
  }, []);

  const handleOpenTbaModal = (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "P") return;
    setOpenTbaModal(true);
  };

  const handleCloseTbaModal = () => {
    setOpenTbaModal(false);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleUserCheck = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(tbaDataDup.map((item) => item._id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleCopyAddress = () => {
    setIsCopied(true);
  };

  const filteredData = filterOption
    ? tbaDataDup.filter((user) => user[sortBy] === filterOption)
    : tbaDataDup;

  console.log(filteredData);

  const sortedData = filteredData.sort((a, b) => {
    const aValue = String(a[sortBy]);
    const bValue = String(b[sortBy]);
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const isSortedBy = (column) => column === sortBy;
  const getSortIconStyle = (column) => {
    const baseStyle = {
      color: "#666",
      position: "relative",
    };

    if (column === "owner") {
      return { ...baseStyle, top: "22.3px" };
    } else if (column === "level") {
      return { ...baseStyle, top: "18px" };
    }
    return baseStyle;
  };

  const getSortIcon = (column) => {
    const iconStyle = getSortIconStyle(column);

    if (!isSortedBy(column)) return <ArrowDropDownIcon style={iconStyle} />;
    return sortDirection === "asc" ? (
      <ArrowDropDownIcon style={iconStyle} />
    ) : (
      <ArrowDropUpIcon style={iconStyle} />
    );
  };

  return (
    <StyledBox onCopy={preventCopy} /* overflow="auto" */>
      <TbaModal open={openTbaModal} handleClose={handleCloseTbaModal} />
      <TbaFilterButton onFilter={handleFilter} />

      <SortContainer>
        <SortItemContainer>
          <SortHeader onClick={() => handleSort("owner")}>
            <SortHeaderSpan style={{ transform: "translateY(3.8px)" }}>
              owner
            </SortHeaderSpan>
            {getSortIcon("owner")}
          </SortHeader>
        </SortItemContainer>
        {/* 
        <PositionedSortItemContainer left="500px" top="10px">
          <SortHeader onClick={() => handleSort('address')}>
            <SortHeaderSpan>Address</SortHeaderSpan>
            {getSortIcon('address')}
          </SortHeader>
        </PositionedSortItemContainer>
        */}
        <LevelContainer>
          <SortHeader onClick={() => handleSort("level")}>
            <SortHeaderSpan>Level</SortHeaderSpan>
            {getSortIcon("level")}
          </SortHeader>
        </LevelContainer>
        <SelectAllItemContainer>
          <SelectAllText
            isAllSelected={isAllSelected}
            onClick={toggleSelectAll}
          >
            Select All
          </SelectAllText>
        </SelectAllItemContainer>
        <AirdropText
          style={{ fontSize: "13px", fontWeight: "bold", color: "#757575" }}
        >
          Airdrop
        </AirdropText>
        <TbaGroupButton selectedItems={selectedItems} />
        <TbaAirdropButton />
      </SortContainer>

      {sortedData.map((user) => (
        <StyledPaper elevation={2} key={user._id}>
          <List>
            <StyledListItem onClick={(e) => handleOpenTbaModal(e)}>
              <ListItemAvatar>
                <Avatar src={user.tokenURI} />
              </ListItemAvatar>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <ItemContainer>
                  <StyledListItemText
                    className="truncate"
                    primary={
                      <BoldTypography sx={{ fontSize: "13px" }}>
                        {`${user.owner.substring(
                          0,
                          4
                        )}...${user.owner.substring(37)}`}
                      </BoldTypography>
                    }
                  />
                </ItemContainer>
                <ItemContainer>
                  <EllipsisListItemText
                    secondary={
                      <CopyToClipboard
                        text={user.address}
                        onCopy={handleCopyAddress}
                      >
                        <BoldTypography
                          className="truncate"
                          sx={{
                            fontSize: "13px",
                            whitespace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                            marginRight: "22px",
                          }}
                        >
                          {user.address}
                        </BoldTypography>
                      </CopyToClipboard>
                    }
                  />
                  <Snackbar
                    open={isCopied}
                    autoHideDuration={3000}
                    onClose={() => setIsCopied(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <Alert
                      variant="filled"
                      onClose={() => setIsCopied(false)}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Copied to clipboard
                    </Alert>
                  </Snackbar>
                </ItemContainer>
                <ItemContainer>
                  <LevelCircle>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        width: "100%",
                        textAlign: "center",
                        borderRadius: "5px",
                        border: getLevelColor(user.level),
                        color: getLevelColor(user.level),
                      }}
                    >
                      Lv.{user.level}
                    </Typography>
                  </LevelCircle>
                </ItemContainer>
                <CheckboxContainer>
                  <CheckboxStyled
                    checked={selectedItems.includes(user._id)}
                    onChange={() => handleUserCheck(user._id)}
                    disabled={false}
                  />
                </CheckboxContainer>
                <AirdropImageContainer>
                  <AirdropImage
                    src={process.env.PUBLIC_URL + "/airdrop.png"}
                    alt="Airdrop Icon"
                  />
                </AirdropImageContainer>
              </div>
              <MoreHorizStyled />
            </StyledListItem>
          </List>
        </StyledPaper>
      ))}
    </StyledBox>
  );
}

export default TbaList;
