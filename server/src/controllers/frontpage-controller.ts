import express, { Request, Response } from "express";
import { buildPath } from "../common.js";

export default function setup(html: string) {
  const router = express.Router({ caseSensitive: false });

  router.use(express.static(buildPath, { index: false }));
  router.use((req: Request, res: Response) => {
    res.send(html);
  });

  return router;
}
