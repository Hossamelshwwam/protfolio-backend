import { Response } from 'express';
export declare const sendSuccess: <T>(res: Response, message: string, data?: T, statusCode?: number) => Response;
export declare const sendError: (res: Response, message: string, statusCode?: number, errors?: unknown) => Response;
//# sourceMappingURL=response.d.ts.map