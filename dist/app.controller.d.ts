import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getTools(): ({
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                url: {
                    type: string;
                    description: string;
                };
                language: {
                    type: string;
                    description: string;
                };
                text?: undefined;
            };
            required: string[];
        };
    } | {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: {
                text: {
                    type: string;
                    description: string;
                };
                url?: undefined;
                language?: undefined;
            };
            required: string[];
        };
    })[];
    invokeTool(body: {
        tool_name: string;
        input: any;
    }): Promise<any>;
}
