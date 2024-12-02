import { Controller, Get, Param, Query, Req, Sse, UseGuards } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';

@Controller('models')
@ApiTags('Models')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Пользователь не авторизован',
  example: {
    message: 'Unauthorized',
    statusCode: 401,
  }
})
@UseGuards(JwtAuthGuard)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @ApiOkResponse({
    description: 'Список доступных моделей',
    example: ['chatgpt', 'claude']
  })
  @ApiNoContentResponse({
    description: 'Нет доступных моделей',
  })
  @ApiOperation({ 
    summary: 'Список доступных моделей', 
    description: 'Возвращает массив имен доступных моделей для взаимодействия'  
  })
  @Get()
  getAvailableAgents() {
    return this.agentsService.getAvailableAgents();
  }
  
  @ApiOperation({ 
    summary: 'Получение потокового ответа от агента',
    description: 'Возвращает поток событий в формате text/event-stream.',
  })
  @ApiParam({
    name: 'agent', 
    description: 'Идентификатор агента (напр., chatgpt, claude)', 
    example: 'claude'
  })
  @ApiQuery({
    name: 'prompt', 
    description: 'Текстовый запрос к агенту', 
    example: 'Расскажи о погоде в Москве'
  })
  @ApiOkResponse({
    description: 'Список доступных моделей',
    example: ['Server sent events']
  })
  @Sse('stream/:agent')
  sse(
    @Req() req: any, 
    @Param('agent') agent: string, 
    @Query('prompt') prompt: string
  ): Promise<Observable<String>> {
    return this.agentsService.getStream(req.user, agent, prompt);
  }
}
