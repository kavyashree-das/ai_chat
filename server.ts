import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import fs from "fs";

// Mock Database
interface Message {
  id: number;
  text: string | null;
  fileUrl: string | null;
  createdAt: string;
}

let messages: Message[] = [];
let nextId = 1;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Setup Multer for local storage
  const uploadDir = 'uploads/';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });

  app.use(express.json());
  app.use('/uploads', express.static(uploadDir));

  // --- API Routes (Mirroring Spring Boot API) ---

  app.get("/api/messages", (req, res) => {
    res.json(messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
  });

  app.post("/api/message", upload.single('file'), (req, res) => {
    const text = req.body.text || null;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newMessage: Message = {
      id: nextId++,
      text,
      fileUrl,
      createdAt: new Date().toISOString()
    };

    messages.push(newMessage);
    res.json(newMessage);
  });

  // Reset App (Logo click behavior)
  app.post("/api/reset", (req, res) => {
    messages = [];
    nextId = 1;
    res.json({ status: "ok" });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
