import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", { isHome: true });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { isHome: false });
});

router.get("/utilities", (req, res) => {
  res.render("utilities", { isHome: false });
});


export default router;
