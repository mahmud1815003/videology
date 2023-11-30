import React from 'react'
import { useSelector } from 'react-redux'
import Verification from '../Component/verification';
import PcDashboard from '../Component/PcDashboard';

const Dashboard = () => {
  const user = useSelector(state => state.auth);
  return !user?.verified ? <Verification /> : <PcDashboard />
}

export default Dashboard