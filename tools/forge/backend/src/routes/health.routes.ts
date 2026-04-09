import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    status: "Forge backend running",
    timestamp: new Date()
  });
});

export default router;