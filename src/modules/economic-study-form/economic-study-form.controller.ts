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
import { EconomicStudyFormService } from './economic-study-form.service';
import { EconomicStudyForm } from '../../models/economicStudyForm.entity';

@Controller('economic-study-form')
export class EconomicStudyFormController {

    constructor(private readonly economicStudyFormService: EconomicStudyFormService) { }
    
    @Post('create-economic-study-form')
    @UseGuards(AuthGuard())
    public async createBeneficiary(@Body() newEconomicStudyForm : EconomicStudyForm,@Request() req): Promise<ServerMessages> {
        return this.economicStudyFormService.createEconomicStudyForm( newEconomicStudyForm );
    }
}
