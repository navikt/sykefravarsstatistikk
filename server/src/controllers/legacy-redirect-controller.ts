import express from "express";
import { z } from "zod";
import { BASE_PATH } from "../common.js";


function getKalkulatorRedirectUrl() {
  try {
    return z.string().url().parse(process.env.FOREBYGGE_FRAVAR_URL) + '/kalkulator';
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return 'https://arbeidsgiver.ekstern.dev.nav.no/forebygge-fravar/kalkulator';
    }
    //Fail fast if not dev
    throw err;
  }
}

export default function setup() {
  const router = express.Router();

  router.get('/historikk', (req, res) => {
    res.redirect( BASE_PATH + '/');
  });

  router.get('/kalkulator', (req, res) => {
    res.redirect(getKalkulatorRedirectUrl());
  });

  return router;
}