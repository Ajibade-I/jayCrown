const Link = require("../model/link");
const express = require("express");
const router = express.Router();
const geoip = require("geoip-lite");
const { v4: uuidv4 } = require("uuid");
const Click = require("../model/click");

router.post("/create-link", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !/^https?:\/\/.+\..+/.test(url)) {
      return res.status(400).send("Invalid URL");
    }

    const slug = uuidv4().slice(0, 6);

    const link = new Link({ slug, url });
    await link.save();

    res.status(200).json({
      message: "Link created successfully",
      link: `http://localhost:3000/${slug}`,
    });
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the link
    const link = await Link.findOne({ slug });
    if (!link) {
      return res.status(404).send("Link not found");
    }

    // Gather click data
    const ipAddress = req.ip || "127.0.0.1";
    const userAgent = req.headers["user-agent"];
    const location = geoip.lookup(ipAddress)?.city || "Unknown";
    const os = userAgent.includes("Windows")
      ? "Windows"
      : userAgent.includes("Mac")
      ? "Mac"
      : "Unknown";

    // Save click data
    const click = new Click({
      linkSlug: slug,
      ipAddress,
      os,
      location,
      userAgent,
    });
    await click.save();

    // Redirect to the original URL
    console.log("link clicked");
    res.redirect(link.url);
  } catch (error) {
    console.error("Error tracking click:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Analytics API
router.get("/analytics/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the link
    const link = await Link.findOne({ slug });
    if (!link) {
      return res.status(404).send("Link not found");
    }

    // Find all clicks for the link
    const clicks = await Click.find({ linkSlug: slug });

    res.status(200).json({ clicks });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
