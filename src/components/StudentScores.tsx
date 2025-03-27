import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import StudentMarks from "../core/model/StudentMarks";

interface StudentScoresProps {
  students: StudentMarks[];
}

const StudentScores: React.FC<StudentScoresProps> = ({ students }) => {
  const subjectNames = students.length
    ? students[0].subjects.map((subject: any) => subject.subjectName)
    : [];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>Student Name</b>
            </TableCell>
            {subjectNames.map((subject: any) => (
              <TableCell key={subject}>
                <b>{subject}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.studentName}</TableCell>
              {student.subjects.map((subject: any, index: any) => (
                <TableCell key={index}>{subject.score}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentScores;
