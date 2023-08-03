const TBA_GROUP = [
  {
    name: "Newbies",
    total: 5,
    tba: [
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C81230",
        level: 1,
        tokenURI: "https://example.com/1.png",
      },
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C81231",
        level: 2,
        tokenURI: "https://example.com/2.png",
      },
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C81232",
        level: 2,
        tokenURI: "https://example.com/3.png",
      },
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C81233",
        level: 2,
        tokenURI: "https://example.com/4.png",
      },
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C81234",
        level: 1,
        tokenURI: "https://example.com/5.png",
      },
    ],
  },
  {
    name: "Active Participants",
    total: 5,
    tba: [
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476D69461235",
        level: 3,
        tokenURI: "https://example.com/1.png",
      },
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476D69461236",
        level: 5,
        tokenURI: "https://example.com/2.png",
      },
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476D69461237",
        level: 3,
        tokenURI: "https://example.com/3.png",
      },
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476D69461238",
        level: 3,
        tokenURI: "https://example.com/4.png",
      },
      {
        address: "0xAdeb833eee668e50761B4BC8b3Ef476D69461239",
        level: 4,
        tokenURI: "https://example.com/5.png",
      },
    ],
  },
];

const CONTRACTS = [
  {
    id: 1,
    name: "SWT",
    type: "ERC721",
    address: "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C86923",
  },
  {
    id: 2,
    name: "WETH",
    type: "ERC20",
    address: "0x236eed76F276A473E96239CEfd42A353A437a0e9",
  },
  {
    id: 3,
    name: "USDS",
    type: "ERC20",
    address: "0x7E42E87B7376dbCA5e9d5E60F3b8125810E8345b",
  },
  {
    id: 4,
    name: "SAT",
    type: "ERC1155",
    address: "0x9d2a6078fA5085F8E9B4C11026cE62C1180a477B",
  },
];

const ADMIN_NFT_LIST = [
  {
    image: "/Dashboarddummy1.png",
    name: "test1",
    type: "ERC-721",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image: "/Dashboarddummy2.png",
    name: "test2",
    type: "ERC-1155",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image: "/Dashboarddummy3.png",
    name: "test3",
    type: "ERC-721",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image: "/Dashboarddummy4.png",
    name: "test4",
    type: "ERC-721",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
];

const COMMUNITY_LIST = [
  {
    communityName: "테스트 커뮤니티1",
    communityAddress: "0x2B839411985B474B725fd5E562E7969172F58f55",
    createdAt: "2023-07-25T02:05:47.530+00:00",
  },
  {
    communityName: "테스트 커뮤니티2",
    communityAddress: "0x2B839411985B474B725fd5E562E7969172F58f55",
    createdAt: "2023-07-25T02:05:47.530+00:00",
  },
  {
    communityName: "테스트 커뮤니티3",
    communityAddress: "0x2B839411985B474B725fd5E562E7969172F58f55",
    createdAt: "2023-07-25T02:05:47.530+00:00",
  },
];

const ADMIN_TOKEN_LIST = [
  {
    token: "ETH",
    amount: "10.34",
  },
  {
    token: "WETH",
    amount: "0.56",
  },
  {
    token: "USDT",
    amount: "100.00",
  },
];

const ADMIN_INFO = {
  address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  ethBalance: "0x00",
  chainId: 11155111,
  email: "chancold123@gmail.com",
  name: "박찬우",
  profileImage:
    "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
  appPubKey:
    "02c20627b0e7993f77e0edc44c150e2ad57c385eb061dd1b953e2920ef9386a975",
  createdAt: "2023-07-25T02:05:47.530+00:00",
};

const baseUsers = [
  {
    id: 1,
    name: "Robert Bacins",
    address: "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C86946",
    level: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    address: "0x4eA79D6c7a3C83f0C71aB90883fDd0e5aA753A4D",
    level: 4,
  },
  {
    id: 3,
    name: "Shelby Goode",
    address: "0x8F6EAcA61f6bC6C7fD11d7C88efDB35e06d8eA2E",
    level: 2,
  },
  {
    id: 4,
    name: "John Doe",
    address: "0x263f1a1c0703b9d5e5E0F34dD8CE6A9c563dEB8F",
    level: 4,
  },
  {
    id: 5,
    name: "Adriene Watson",
    address: "0x5E22031e91C6f30392e2A3Cd6a56f80B48f9fAdA",
    level: 1,
  },
  {
    id: 6,
    name: "Jhon Deo",
    address: "0xB548591C02e09EcFc62E88b0A07a78f6b7C9f4bD",
    level: 3,
  },
  {
    id: 7,
    name: "Mark Ruffalo",
    address: "0x9bC1bC8aAfbaC8bE6E5Cb5C4aAa4F72c17A0a53f",
    level: 3,
  },
  {
    id: 8,
    name: "Bethany Jackson",
    address: "0x39C04a36d10Ab4Cb7a5Ba31a95a7Bd7c3f18Bdf1",
    level: 2,
  },
  {
    id: 9,
    name: "Christine Huston",
    address: "0x0aD5F7382A9aA7b2eAA27D1C69c20eE2183A686b",
    level: 4,
  },
  {
    id: 10,
    name: "Anne Jacob",
    address: "0x3F4d50Fc8eD0dE51383F9Ec6F92E3210A7940c38",
    level: 1,
  },
];

const USERS = baseUsers.map((user) => ({
  ...user,
  profileImage: `https://i.pravatar.cc/300?u=${user.id}`,
}));

export {
  TBA_GROUP,
  CONTRACTS,
  ADMIN_NFT_LIST,
  COMMUNITY_LIST,
  ADMIN_TOKEN_LIST,
  ADMIN_INFO,
  USERS,
};
