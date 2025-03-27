import BaseModel from "../baseModel/BaseModel";
import SchoolClass from "../SchoolClass";


export default interface User extends BaseModel {
    username: string;
    email: string;
    password: string;
    mobileNo: string;
    name: string;
    jwtToken: string;
    role: "PRINCIPAL" | "CLASS" | "CHILD";
    schoolClass?: SchoolClass;
    classId: number;
};
