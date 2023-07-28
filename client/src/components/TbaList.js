import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
  Typography,
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
import TbaModal from './TbaModal';

const StyledListItemText = styled(ListItemText)({
  whiteSpace: "pre-wrap",
  userSelect: "none",
});

const EllipsisListItemText = styled(StyledListItemText)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "pre-wrap",
  maxWidth: "100%",
});

const StyledBox = styled(Box)({
  width: "2500px",
  marginTop: "130px",
  marginLeft: "-75px",
  marginRight: "32px",
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
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "rgba(87, 111, 246, 0.7)",
  color: "white",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
  right: "260px",
  display: "flex",
  alignItems: "center",
});

const LevelContainer = styled("div")({
  position: "absolute",
  top: "12px",
  right: "288px",
  display: "flex",
  alignItems: "center",
});

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
  color: "#757575",
  marginTop: "36px",
});

/* const PositionedSortItemContainer = styled(SortItemContainer)({
  position: 'fixed',
  left: '500px',
}); */

function TbaList({ data = [] }) {
  const [filterOption, setFilterOption] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    document.addEventListener("copy", preventCopy);
    return () => {
      document.removeEventListener("copy", preventCopy);
    };
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
      setSelectedItems(data.map((item) => item.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const filteredData = filterOption
    ? data.filter((user) => user[sortBy] === filterOption)
    : data;

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
  const getSortIcon = (column) => {
    const iconStyle = {
      color: "#757575",
      position: "relative",
      top: "18px",
    };
    if (!isSortedBy(column)) return <ArrowDropDownIcon style={iconStyle} />;
    return sortDirection === "asc" ? (
      <ArrowDropDownIcon style={iconStyle} />
    ) : (
      <ArrowDropUpIcon style={iconStyle} />
    );
  };

  return (
    <StyledBox onCopy={preventCopy} overflow="auto">
     <TbaModal open={openModal} handleClose={handleCloseModal} />
      <TbaFilterButton onFilter={handleFilter} />
      <SortContainer>
        <SortItemContainer>
          <SortHeader onClick={() => handleSort("name")}>
            <SortHeaderSpan>Name</SortHeaderSpan>
            {getSortIcon("name")}
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
        <TbaGroupButton />
        <TbaAirdropButton />
      </SortContainer>

      {sortedData.map((user) => (
        <StyledPaper elevation={2} key={user.id} onClick={handleOpenModal}>
          <List>
            <StyledListItem>
              <ListItemAvatar>
                <Avatar src={user.profileImage} />
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
                    primary={<BoldTypography>{user.name}</BoldTypography>}
                  />
                </ItemContainer>
                <ItemContainer>
                  <EllipsisListItemText
                    secondary={<BoldTypography>{user.address}</BoldTypography>}
                  />
                </ItemContainer>
                <ItemContainer>
                  <LevelCircle>
                    <Typography>{user.level}</Typography>
                  </LevelCircle>
                </ItemContainer>
                <CheckboxContainer>
                  <CheckboxStyled
                    checked={selectedItems.includes(user.id)}
                    onChange={() => handleUserCheck(user.id)}
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