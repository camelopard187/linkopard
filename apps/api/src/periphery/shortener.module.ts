import { Module } from "@nestjs/common";
import { ShortenerController } from "./presentation/shortener.controller";
import { PrismaService } from "@/periphery/persistence/prisma.service";
import { ShortenerService } from "@/application/shortener.service";

@Module({
  controllers: [ShortenerController],
  providers: [PrismaService, ShortenerService],
})
export class ShortenerModule {}
