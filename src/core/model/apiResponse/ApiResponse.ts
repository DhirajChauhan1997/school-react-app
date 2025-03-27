export interface APIResponse<Type> {
    success: boolean;
    message: string;
    data: Type | any;
}
