import React from 'react'
import Chart from "../components/Chart"
import "../../CSS/HeroSection.css";


const AnalysisView = () => {
    return (
        <div className="secondblock" style={{ paddingBottom: "1.8rem" }}>
        <div className="firstBlock graphblock">
          {/* <TodaySales /> */}
          <div className="graphblock" style={{ width: "36rem" }}>
              <Chart blockHading="Total Revenue" />
            </div>

          <div style={{ width: "34rem" }}>
            <Chart blockHading="Visitor Insights" />
          </div>
    
          
          
            <div className="graphblock" style={{ width: "20rem" }}>
              <Chart blockHading="Customer Satisfaction" />
            </div>
            <div className="graphblock" style={{ width: "20rem" }}>
              <Chart blockHading="Target vs Reality" />
            </div>
    
            <div className="graphblock" style={{ width: "36rem" }}>
              <Chart blockHading="Top Products" />
            </div>
       
            <div className="graphblock" style={{ width: "20rem" }}>
              <Chart blockHading="Volume vs Service Level" />
            </div>
          </div>
        </div>
      );
}

export default AnalysisView