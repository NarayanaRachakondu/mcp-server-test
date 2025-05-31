export interface MCPRequest {
    message: string;
    context: {
        url?: string;
        language?: string;
        text?: string;
    };
    tools: MCPTool[];
}
export interface MCPTool {
    name: string;
    description: string;
    parameters: {
        type: string;
        properties: {
            [key: string]: any;
        };
        required: string[];
    };
}
