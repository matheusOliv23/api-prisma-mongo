import { PrismaClient } from "@prisma/client";
import express from "express";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/users", async (req: Request, resp: Response) => {
  const users = await prisma.user.findUnique({
    where: {
      email: "elsa@prisma.io",
    },
  });
  return resp.json({ users });
});

app.post("/users", async (req: Request, resp: Response) => {
  const { nome, email } = req.body;
  const users = await prisma.user.create({
    data: { nome, email },
  });
  return resp.json({ users });
});

app.listen(3000, () => console.log("Server is running on PORT 3000"));
