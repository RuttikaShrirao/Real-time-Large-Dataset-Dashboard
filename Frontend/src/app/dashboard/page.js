"use client";
// import dynamic from 'next/dynamic';
// const Chart = dynamic(() => import('../components/Chart'), { ssr: false });
// const DataTable = dynamic(() => import('../components/DataTable'), { ssr: false });
import { logout } from "../actions";
const Dashboard = () => {
  // const data = [{ name: 'Jan', value: 30 }, { name: 'Feb', value: 50 }];  // Replace with real data

  return (
    <div>
    <button onClick={()=>logout()}>logout</button>
      <h2>Admin Dashboard</h2>
      {/* <Chart data={data} />
      <DataTable data={data} /> */}
    </div>
  );
};

export default Dashboard;
