import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import endpoint from "./lib/endpoint";
import {Suppliers } from "plugin-books-pro";


const server = new McpServer({
  name: "books-pro",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});


server.tool(
    "get-top-book-for-supplier",
    "Get top book for supplier",
    {
        supplier: z.nativeEnum(Suppliers).describe("The book supplier to query"),
    },
    async ({ supplier }) => {
        try {
            const result = await endpoint.getTop(supplier as Suppliers);
            if (!result) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `No data found for supplier: ${supplier}`
                        }
                    ]
                };
            }
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result)
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`
                    }
                ]
            };
        }
    }
);



server.tool(
    "get-new-book-for-supplier",
    "Get mew book for supplier",
    {
        supplier: z.nativeEnum(Suppliers).describe("The book supplier to query"),
    },
    async ({ supplier }) => {
        try {
            const result = await endpoint.getNew(supplier as Suppliers);
            if (!result) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `No data found for supplier: ${supplier}`
                        }
                    ]
                };
            }
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result)
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`
                    }
                ]
            };
        }
    }
);

server.tool(
    "get-favorite-book-for-supplier",
    "Get favorite book for supplier",
    {
        supplier: z.nativeEnum(Suppliers).describe("The book supplier to query"),
    },
    async ({ supplier }) => {
        try {
            const result = await endpoint.getNew(supplier as Suppliers);
            if (!result) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `No data found for supplier: ${supplier}`
                        }
                    ]
                };
            }
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result)
                    }
                ]
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`
                    }
                ]
            };
        }
    }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});


function formatLargeResponse(data: any): string {
    const stringified = JSON.stringify(data, null, 2);
    const maxLength = 4000; // Reasonable size limit
    
    if (stringified.length <= maxLength) {
        return stringified;
    }

    // For arrays, show length and first few items
    if (Array.isArray(data)) {
        const preview = data.slice(0, 3);
        return JSON.stringify({
            _summary: `Array of ${data.length} items`,
            _preview: preview,
            _note: 'Response truncated due to size'
        }, null, 2);
    }

    // For objects, show keys and truncated content
    if (typeof data === 'object' && data !== null) {
        const keys = Object.keys(data);
        const preview = {};
        keys.slice(0, 5).forEach(key => {
            (preview as Record<string, unknown>)[key] = data[key];
        });
        
        return JSON.stringify({
            _summary: `Object with ${keys.length} keys: ${keys.join(', ')}`,
            _preview: preview,
            _note: 'Response truncated due to size'
        }, null, 2);
    }

    return stringified.slice(0, maxLength) + '\n... (response truncated)';
}
