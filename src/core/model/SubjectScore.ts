import BaseModel from "./baseModel/BaseModel";

export default interface SubjectScore extends BaseModel {
    subjectName: string;
    score: number;
    examName: string;
    totalMarks: number;
};
