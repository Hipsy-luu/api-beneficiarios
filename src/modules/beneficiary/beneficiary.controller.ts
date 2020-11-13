import { Beneficiary } from './../../models/beneficiary.entity';
import {
    Controller,
    Request,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
} from '@nestjs/common';
import { User } from '../../models/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { ServerMessages } from '../../utils/serverMessages.util';
import { BeneficiaryService } from './beneficiary.service';

@Controller('beneficiary')
export class BeneficiaryController {
    constructor(private readonly beneficiaryService: BeneficiaryService) { }
    
    @Post('create-beneficiary')
    @UseGuards(AuthGuard())
    public async createBeneficiary(@Body() newBeneficiary : Beneficiary,@Request() req): Promise<ServerMessages> {
        newBeneficiary.idUserRegister = req.user.idUser;
        newBeneficiary.idBeneficiary
        return this.beneficiaryService.createBeneficiary( newBeneficiary );
    }

    @Post('update-beneficiary')
    @UseGuards(AuthGuard())
    public async updateUser(@Body() body): Promise<ServerMessages> {
        return this.beneficiaryService.updateBeneficiary(body);
    }

    @Get('get-beneficiary/:idBeneficiary')
    @UseGuards(AuthGuard())
    public async getBeneficiaryData(@Param('idBeneficiary') idBeneficiary: number): Promise<ServerMessages> {
        return this.beneficiaryService.getBeneficiaryData(idBeneficiary);
    }

    @Get('delete-beneficiary/:idBeneficiary')
    @UseGuards(AuthGuard())
    public async deteleBeneficiaryData(@Param('idBeneficiary') idBeneficiary: number): Promise<ServerMessages> {
        return this.beneficiaryService.deleteBeneficiaryData(idBeneficiary);
    }

    @Get('beneficiary-list')
    @UseGuards(AuthGuard())
    public async getBeneficiarysList(): Promise<ServerMessages> {
        return this.beneficiaryService.getBeneficiarysList();
    }

    @Post('beneficiary-name-list')
    @UseGuards(AuthGuard())
    public async getBeneficiaryListByName( @Body() body ): Promise<ServerMessages> {
        return this.beneficiaryService.getBeneficiaryListByName(body);
    }
}
