export declare class AppService {
    getToolMetadata(): ({
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
    invokeTool(toolName: string, input: any): Promise<any>;
}
