import { APIResponse } from "../core/model/apiResponse/ApiResponse";
import Subject from "../core/model/Subject";
import { urlCallback } from "../utils/ApiCall";

export async function getAllSubject(): Promise<APIResponse<Subject[]>> {
    try {
        let response = await urlCallback.UrlAsyncCall('subject/getAllSubject', null, "GET");
        return response.data;
    } catch (error: any) {
        console.error("Error while fetch all Subject", error);
        return {
            success: false,
            message: "Error while fetch all Subject",
            data: [],
        };
    }
}