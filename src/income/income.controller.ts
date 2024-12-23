import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
    constructor(private readonly incomeService: IncomeService){}

    @Get('/:type')
    getAllReports(){
        
    }

    //Search
    @Get(':id')
    getIncomeById() {
        return this.incomeService.getIncomeById();
    }

    @Post()
    createReport(){
        return {message: "Created"}
        return 'created';
    }

    @Put('/:id')
    updateReport(){
        return {message: "Updated"}
    }

}
