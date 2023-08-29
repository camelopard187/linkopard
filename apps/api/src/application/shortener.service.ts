import { Injectable } from "@nestjs/common";
import type { Url } from "@prisma/client";
import { PrismaService } from "@/periphery/persistence/prisma.service";

@Injectable()
export class ShortenerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(url: string): Promise<Url> {
    const found = await this.prisma.url.findUnique({
      where: { full: url },
    });

    return (
      found ??
      (await this.prisma.url.create({
        data: { full: url },
      }))
    );
  }

  async get(short: string): Promise<Url | null> {
    return await this.prisma.url.findUnique({
      where: { id: short },
    });
  }
}
