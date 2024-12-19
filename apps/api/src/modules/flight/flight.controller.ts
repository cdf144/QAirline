import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { COOKIE_NAMES } from 'src/common/constants';
import { ConditionalApiCookieAuth } from 'src/common/decorators/conditional-api-cookie-auth.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { FlightService } from './flight.service';
import { Flight } from './schemas/flight.schema';

const INVALID_IDENTIFIER_MESSAGE =
  'Invalid identifier provided. Must be a valid 24-character hexadecimal string, or a valid 5-character flight code consisting of uppercase letters and digits';

@ApiTags('flight')
@ConditionalApiCookieAuth(COOKIE_NAMES.ACCESS_TOKEN)
@Controller('v1/flight')
export class FlightController {
  constructor(private flightService: FlightService) {}
  // TODO: Implement GET /search API for searching flights by departure and destination airports, departure time, and price range

  @Public()
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    const flights = await this.flightService.findAll();
    res.send(flights);
  }

  @Public()
  @Get(':identifier')
  async findOne(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
  ): Promise<void> {
    const identifierType = this.flightService.getIdentifierType(identifier);
    let flight: Flight;

    switch (identifierType) {
      case 'mongoId':
        flight = await this.flightService.findOneById(identifier);
        break;
      case 'flightCode':
        flight = await this.flightService.findOneByCode(identifier);
        break;
      default:
        throw new BadRequestException(INVALID_IDENTIFIER_MESSAGE);
    }

    res.send(flight);
  }

  @Roles(Role.Admin)
  @Post()
  async create(
    @Res() res: FastifyReply,
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<void> {
    const newFlight = await this.flightService.create(createFlightDto);
    res.send(newFlight);
  }

  @Patch(':identifier')
  async update(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<void> {
    const identifierType = this.flightService.getIdentifierType(identifier);
    let updatedFlight: Flight;

    switch (identifierType) {
      case 'mongoId':
        updatedFlight = await this.flightService.updateById(
          identifier,
          updateFlightDto,
        );
        break;
      case 'flightCode':
        updatedFlight = await this.flightService.updateByCode(
          identifier,
          updateFlightDto,
        );
        break;
      default:
        throw new BadRequestException(INVALID_IDENTIFIER_MESSAGE);
    }

    res.send(updatedFlight);
  }

  @Delete(':identifier')
  async deleteById(
    @Res() res: FastifyReply,
    @Param('identifier') identifier: string,
  ): Promise<void> {
    const identifierType = this.flightService.getIdentifierType(identifier);
    let deletedFlight: Flight;

    switch (identifierType) {
      case 'mongoId':
        deletedFlight = await this.flightService.deleteById(identifier);
        break;
      case 'flightCode':
        deletedFlight = await this.flightService.deleteByCode(identifier);
        break;
      default:
        throw new BadRequestException(INVALID_IDENTIFIER_MESSAGE);
    }

    res.send(deletedFlight);
  }
}
