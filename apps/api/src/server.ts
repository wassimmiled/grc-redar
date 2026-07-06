import Fastify from "fastify";
import cors from "@fastify/cors";
import { createDocument, listDocuments, getDocument, validateDocument } from "./db.js";

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

app.get("/health", async () => ({ status: "ok" }));

app.get("/documents", async () => listDocuments());

app.get("/documents/:id", async (req, reply) => {
  const { id } = req.params as { id: string };
  const doc = getDocument(id);
  if (!doc) return reply.code(404).send({ error: "not_found" });
  return doc;
});

app.post("/documents", async (req, reply) => {
  const body = req.body as { filename?: string; content?: string };
  if (!body?.content || !body?.filename) {
    return reply.code(400).send({ error: "filename and content are required" });
  }
  const doc = createDocument(body.filename, body.content);
  return reply.code(201).send(doc);
});

app.post("/documents/:id/validate", async (req, reply) => {
  const { id } = req.params as { id: string };
  const doc = validateDocument(id);
  if (!doc) return reply.code(404).send({ error: "not_found" });
  return doc;
});

const port = Number(process.env.PORT ?? 3333);
app.listen({ port, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
