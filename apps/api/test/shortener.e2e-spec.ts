import request from "supertest";
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/periphery/persistence/prisma.service";

describe("ShortenerController e2e test", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    app = await module.createNestApplication().init();
  });

  afterAll(async () => {
    await prisma.url.deleteMany();
    await app.close();
  });

  describe("POST /create", () => {
    it("should provide a short url for a new url", async () => {
      const body = {
        url: "https://en.wikipedia.org/wiki/Edward_III_of_England",
      };

      const response = await request(app.getHttpServer())
        .post("/create")
        .send(body);

      const created = await prisma.url.findUnique({
        where: { full: body.url },
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({
        full: body.url,
      });
      expect(created).not.toBeNull();
    });

    it("should provide a short url for a existing url", async () => {
      const body = {
        url: "https://en.wikipedia.org/wiki/Philip_II_of_France",
      };

      const created = await prisma.url.create({
        data: { full: body.url },
      });

      const response = await request(app.getHttpServer())
        .post("/create")
        .send(body);

      response.body = Object.assign(response.body, {
        createdAt: new Date(response.body.createdAt),
        updatedAt: new Date(response.body.updatedAt),
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({
        full: body.url,
      });
      expect(created).toEqual(response.body);
    });
  });

  describe("GET /:short", () => {
    it("should redirect from the short url to the full one", async () => {
      const url = "https://en.wikipedia.org/wiki/Alexander_III_of_Scotland";

      const created = await prisma.url.create({
        data: { full: url },
      });

      await request(app.getHttpServer())
        .get(`/${created.id}`)
        .expect(301)
        .expect("Location", url);
    });
  });
});
