import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import type { Url } from "@prisma/client";
import { PrismaService } from "@/periphery/persistence/prisma.service";
@Injectable()
export class ShortenerService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

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
    const url = await this.cache.get<Url>("url");
    if (url) return url;

    const found = await this.prisma.url.findUnique({
      where: { id: short },
    });
    await this.cache.set("url", found);

    return found;
  }
}
