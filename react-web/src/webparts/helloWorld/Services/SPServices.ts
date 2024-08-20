import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import {WebPartContext} from "@microsoft/sp-webpart-base";

export class SPOperations {
    private context: WebPartContext;

    constructor(context: WebPartContext) {
        this.context = context;
    }

    // Implement GetAllList method if needed
    public GetAllList() {
        // Implementation here
    }

    public get value(): Promise<string> {
        let restApiUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists?select=Title";

        // Assuming context is accessible in this scope
        // Use SPHttpClient to make a GET request to the REST API URL
        return this.context.spHttpClient.get(restApiUrl, SPHttpClient.configurations.v1, {})
            .then((response: SPHttpClientResponse) => {
                // Handle the response here
                // Example: return response.json();
                return "Success"; // Return a value or handle response data
            })
            .catch((error: any) => {
                // Handle errors here
                return Promise.reject("Error occurred: " + error);
            });
    }
}
