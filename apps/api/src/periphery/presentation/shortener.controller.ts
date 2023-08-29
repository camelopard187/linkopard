import {
  NotFoundException,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  HttpCode,
  Body,
} from "@nestjs/common";
import { ShortenerService } from "@/application/shortener.service";

@Controller()
export class ShortenerController {
  constructor(private readonly shortener: ShortenerService) {}

  @Get("/:short")
  @Redirect("/", 301)
  async redirect(@Param("short") short: string) {
    const url = await this.shortener.get(short);

    if (!url)
      throw new NotFoundException(
        "The short URL doesn't correspond to any full URL"
      );

    return { url: url.full };
  }

  @Post("/create")
  @HttpCode(201)
  async create(@Body("url") url: string) {
    return await this.shortener.create(url);
  }
}
