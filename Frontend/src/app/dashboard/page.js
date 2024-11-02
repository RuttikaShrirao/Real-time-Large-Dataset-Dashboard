"use client";
// import { logout } from "../actions";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalysisView from "../components/AnalysisView";

const Dashboard = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="herosection ">
        <Navbar />
        <AnalysisView />
      </div>
    </div>
  );
};

export default Dashboard;
