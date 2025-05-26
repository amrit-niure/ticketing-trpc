import { ActivityType } from '@prisma/client';
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
export declare const generateToken: (userId: string) => string;
export declare const createActivityLog: (ticketId: string, userId: string, action: ActivityType, details?: string) => Promise<void>;
export declare const validateEmail: (email: string) => boolean;
export declare const sanitizeUser: (user: any) => any;
//# sourceMappingURL=helpers.d.ts.map