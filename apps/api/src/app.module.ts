import { Module } from "@nestjs/common";
import { ShortenerModule } from "@/periphery/shortener.module";

@Module({
  imports: [ShortenerModule],
})
export class AppModule {}
