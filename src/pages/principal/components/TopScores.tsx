import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StudentMarks from "../../../core/model/StudentMarks";
import { apiCall } from "../../../utils/ApiCall";

interface TopScorerProps {}

const TopScores: React.FC<TopScorerProps> = () => {
  const [topScorers, setTopScorers] = useState<StudentMarks[] | any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(0);
  const studentsPerPage = 100;
  const fetchStudentScores = async () => {
    try {
      var response = await apiCall(
        `http://192.168.159.81:8082/exam/getAllTop3SubjectScore`,
        "GET"
      );
      if (response && response.data) {
        var studentRes = response.data;
        setTopScorers(studentRes);
      }
    } catch (err) {
      setError("Failed to fetch student scores.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudentScores();
  }, []);

  return (
    <div className="p-4">
      {Object.values(topScorers).map((scores: any, key: any) => {
        return (
          <div key={key} className="mb-4">
            <Typography variant="subtitle1" gutterBottom>
              {scores[0]?.subjectName} - Class {scores[0]?.className}
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((score: any, index: any) => {
                    // console.log("scores: ", score);
                    // console.log("key: ", index);

                    return (
                      <TableRow key={index}>
                        <TableCell>{score.className}</TableCell>
                        <TableCell>{score.subjectName}</TableCell>
                        <TableCell>{score.studentName}</TableCell>
                        <TableCell>{score.score}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      })}
    </div>
  );
};

export default TopScores;
