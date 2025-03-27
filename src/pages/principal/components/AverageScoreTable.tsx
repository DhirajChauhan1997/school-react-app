import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StudentMarks from "../../../core/model/StudentMarks";
import { apiCall } from "../../../utils/ApiCall";

const AverageScoreTable = () => {
  const [students, setStudents] = useState<StudentMarks[] | any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(0);
  const studentsPerPage = 100;
  const fetchStudentScores = async () => {
    try {
      var response = await apiCall(
        `http://192.168.159.81:8082/exam/getAllSubjectScoreAvg/${currentPage}/${studentsPerPage}`,
        "GET"
      );
      if (response && response.data) {
        var studentRes = response.data;
        setStudents(studentRes);
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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Class</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Average Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((row: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{row.className}</TableCell>
            <TableCell>{row.subjectName}</TableCell>
            <TableCell>{row.avgScore}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AverageScoreTable;
