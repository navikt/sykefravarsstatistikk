import { Express } from "express";
import { BASE_PATH } from "./common.js";

export const setupIsAlive = async (server: Express) => {
  server.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
}

export const setupIsReady = async (server: Express) => {
  server.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));
}
