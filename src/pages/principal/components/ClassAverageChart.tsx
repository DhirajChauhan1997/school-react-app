import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { apiCall } from "../../../utils/ApiCall";

const ClassAverageChart = () => {
  const [chartData, setChartData] = useState<any>({});
  useEffect(() => {
    fetchAverageScores();
  }, []);

  const fetchAverageScores = async () => {
    try {
      const response = await apiCall(
        "http://192.168.159.81:8082/exam/getAverageScores",
        "GET"
      );
      console.log("response: ", response);
      if (response && response.data) {
        setChartData(JSON.parse(response.data));
      }
    } catch (error) {
      console.error("Failed to fetch average scores:", error);
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <ResponsiveContainer width="50%" height={150}>
        <BarChart data={chartData.classWiseAverage}>
          <XAxis dataKey="className" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="averageScore" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="50%" height={150}>
        <BarChart data={chartData.subjectWiseAverage}>
          <XAxis dataKey="subjectName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="averageScore" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClassAverageChart;
