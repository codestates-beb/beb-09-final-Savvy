import React from 'react';
import TbaList from './TbaList';

function TbaListParent() {
  const baseUsers = [
    {
      id: 1,
      name: 'Robert Bacins',
      address: '0xAdeb833eee668e50761B4BC8b3Ef476Dc2C86946',
      level: 5
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '0x4eA79D6c7a3C83f0C71aB90883fDd0e5aA753A4D',
      level: 4
    },
    {
      id: 3,
      name: 'Shelby Goode',
      address: '0x8F6EAcA61f6bC6C7fD11d7C88efDB35e06d8eA2E',
      level: 2
    },
    {
      id: 4,
      name: 'John Doe',
      address: '0x263f1a1c0703b9d5e5E0F34dD8CE6A9c563dEB8F',
      level: 4
    },
    {
      id: 5,
      name: 'Adriene Watson',
      address: '0x5E22031e91C6f30392e2A3Cd6a56f80B48f9fAdA',
      level: 1
    },
    {
      id: 6,
      name: 'Jhon Deo',
      address: '0xB548591C02e09EcFc62E88b0A07a78f6b7C9f4bD',
      level: 3
    },
    {
      id: 7,
      name: 'Mark Ruffalo',
      address: '0x9bC1bC8aAfbaC8bE6E5Cb5C4aAa4F72c17A0a53f',
      level: 3
    },
    {
      id: 8,
      name: 'Bethany Jackson',
      address: '0x39C04a36d10Ab4Cb7a5Ba31a95a7Bd7c3f18Bdf1',
      level: 2
    },
    {
      id: 9,
      name: 'Christine Huston',
      address: '0x0aD5F7382A9aA7b2eAA27D1C69c20eE2183A686b',
      level: 4
    },
    {
      id: 10,
      name: 'Anne Jacob',
      address: '0x3F4d50Fc8eD0dE51383F9Ec6F92E3210A7940c38',
      level: 1
    },
  ];

  const users = baseUsers.map(user => ({
    ...user,
    profileImage: `https://i.pravatar.cc/300?u=${user.id}`
  }));

  return <TbaList data={users} />;
}

export default TbaListParent; 