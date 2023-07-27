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
    image:
      "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
    name: "test1",
    type: "ERC-721",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
    name: "test2",
    type: "ERC-1155",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
    name: "test3",
    type: "ERC-721",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
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

export {
  TBA_GROUP,
  CONTRACTS,
  ADMIN_NFT_LIST,
  COMMUNITY_LIST,
  ADMIN_TOKEN_LIST,
  ADMIN_INFO,
};
