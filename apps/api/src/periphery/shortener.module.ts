import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { ShortenerController } from "./presentation/shortener.controller";
import { PrismaService } from "@/periphery/persistence/prisma.service";
import { ShortenerService } from "@/application/shortener.service";
import { CacheOptions } from "@/periphery/persistence/redis.options";

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useClass: CacheOptions,
    }),
  ],
  controllers: [ShortenerController],
  providers: [
    PrismaService,
    ShortenerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class ShortenerModule {}
