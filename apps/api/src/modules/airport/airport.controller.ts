import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { COOKIE_NAMES } from 'src/common/constants';
import { ConditionalApiCookieAuth } from 'src/common/decorators/conditional-api-cookie-auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { Airport } from './schemas/airport.schema';

const INVALID_IDENTIFIER_MESSAGE =
  'Invalid identifier provided. Must be a valid 24-character hexadecimal string, or a valid Vietnam airport code';

@ApiTags('airport')
@ConditionalApiCookieAuth(COOKIE_NAMES.ACCESS_TOKEN)
@Controller('v1/airport')
export class AirportController {
  constructor(private airportService: AirportService) {}

  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createAirportDto: CreateAirportDto,
  ): Promise<void> {
    const newAirport = await this.airportService.create(createAirportDto);
    res.send(newAirport);
  }

  @Public()
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const airports = await this.airportService.findAll();
    res.send(airports);
  }

  @Public()
  @Get(':identifier')
  async findOneById(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
  ): Promise<void> {
    const identifierType = this.airportService.getIdentifierType(identifier);
    let airport: Airport;

    switch (identifierType) {
      case 'mongoId':
        airport = await this.airportService.findOneById(identifier);
        break;
      case 'code':
        airport = await this.airportService.findOneByCode(identifier);
        break;
      default:
        throw new BadRequestException(INVALID_IDENTIFIER_MESSAGE);
    }

    res.send(airport);
  }
}
