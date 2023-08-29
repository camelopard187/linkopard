import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CacheOptionsFactory } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-store";

@Injectable()
export class CacheOptions implements CacheOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  async createCacheOptions(): Promise<unknown> {
    return {
      store: await redisStore({
        url: this.config.get<string>("REDIS_URL"),
        ttl: this.config.get<number>("CACHE_TTL"),
      }),
    };
  }
}
