import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('mcp')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Step 1: Return tools metadata for Claude/GPT
  @Get('tools')
  getTools() {
    return this.appService.getToolMetadata();
  }

  // Step 2: Handle Claude/GPT tool call
  @Post('invoke')
  async invokeTool(@Body() body: { tool_name: string; input: any }) {
    return this.appService.invokeTool(body.tool_name, body.input);
  }
}
