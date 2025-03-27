import BaseModel from "./baseModel/BaseModel";
import SubjectScore from "./SubjectScore";

export default interface StudentMarks extends BaseModel {
    studentName: string;
    studentId: number;
    subjects: SubjectScore[];
};
