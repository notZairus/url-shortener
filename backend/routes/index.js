import { Router } from "express";
import { body, param, validationResult, matchedData } from "express-validator";
import { nanoid } from "nanoid";
import Link from "../models/link.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: "hello from /",
  });
});

router.post(
  "/url",
  body("url")
    .isURL()
    .withMessage("Invalid URL.")
    .notEmpty()
    .withMessage("URL is required.")
    .isString(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.status(400).json({ errors: result.array() });

    const data = matchedData(req);

    const link = await Link.findOne({ originalUrl: data.url });

    if (link) {
      return res.status(200).send({ shortUrl: link.shortUrl });
    }

    const newLink = new Link({
      originalUrl: data.url,
      shortUrl: `${nanoid(6)}`,
      visits: 0,
    });

    const _link = await newLink.save();
    return res
      .status(200)
      .send({ shortUrl: `${process.env.APP_URL}/${_link.shortUrl}` });
  }
);

router.get(
  "/:id",
  param("id")
    .notEmpty()
    .withMessage("ID is required.")
    .isLength({ min: 6, max: 6 })
    .withMessage("ID must be 6 characters long."),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.status(400).json({ errors: result.array() });

    const data = matchedData(req);

    const url = await Link.findOne({
      shortUrl: data.id,
    });

    if (!url) {
      return res.status(404).send({ message: "URL not found." });
    }

    url.visits++;
    await url.save();

    return res.redirect(url.originalUrl);
  }
);

export default router;
