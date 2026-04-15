declare interface ApiError {
    status?: number;
    message: string;
    stack?: string;
}

declare interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}

declare interface ApiRequest {
    body?: any;
    query?: any;
    params?: any;
    headers?: any;
}

export type { ApiError, ApiResponse, ApiRequest };