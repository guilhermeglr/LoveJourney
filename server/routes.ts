import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get site content
  app.get("/api/content", async (req, res) => {
    try {
      const content = await storage.getSiteContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to get content" });
    }
  });

  // Update site content
  app.put("/api/content", async (req, res) => {
    try {
      const content = await storage.updateSiteContent(req.body);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to update content" });
    }
  });

  // File upload endpoint for images and music
  app.post("/api/upload", async (req, res) => {
    // For now, return a placeholder URL
    // In production, you'd implement actual file upload to cloud storage
    const { type, file } = req.body;
    
    if (type === "image") {
      res.json({ url: `https://placeholder-image-url/${Date.now()}.jpg` });
    } else if (type === "music") {
      res.json({ url: `https://placeholder-music-url/${Date.now()}.mp3` });
    } else {
      res.status(400).json({ error: "Invalid file type" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
