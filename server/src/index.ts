// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import ticketRoutes from './routes/tickets';
import userRoutes from './routes/users';

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter, createTRPCContext } from './routers';

const app = express();
const PORT = process.env.PORT || 5000;

export const prisma = new PrismaClient();

app.use(helmet());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    }),
);
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);

app.use(
    "/trpc",
    createExpressMiddleware({
        router: appRouter,
        createContext: createTRPCContext,
    }),
);

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        console.error(err.stack);
        res.status(500).json({
            error: "Something went wrong!",
            message:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : "Internal server error",
        });
    },
);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
});

process.on("SIGINT", async () => {
    console.log("🛑 Shutting down gracefully...");
    await prisma.$disconnect();
    process.exit(0);
});

export default app;
