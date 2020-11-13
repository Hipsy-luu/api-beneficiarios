import {
    Controller,
    Request,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServerMessages } from '../../utils/serverMessages.util';
import { RegistryService } from './registry.service';
import { Registry } from '../../models/registry.entity';

@Controller('registry')
export class RegistryController {
    constructor(private readonly registryService: RegistryService) { }

    @Post('create-registry')
    @UseGuards(AuthGuard())
    public async createRegistry(@Body() newRegistry : Registry,@Request() req): Promise<ServerMessages> {
        newRegistry.idUserRegister = req.user.idUser;
        newRegistry.idBeneficiary
        return this.registryService.createRegistry( newRegistry );
    }

    @Get('registry-list/:year')
    @UseGuards(AuthGuard())
    public async getRegistryListByYear(@Param('year') year: string): Promise<ServerMessages> {
        return this.registryService.getRegistryListByYear(year);
    }
}
