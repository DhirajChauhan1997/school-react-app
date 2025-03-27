import BaseModel from "./baseModel/BaseModel";

export default interface ClassTeacher extends BaseModel {
    teacherName: string;
    className: string;
};
