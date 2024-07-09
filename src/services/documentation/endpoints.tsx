import { HttpService } from "../index";

class DocumentationBaseService extends HttpService {
    private readonly prefix: string = "documentation";
    /**
     * User
     * @paramdata
     */
    getDocumentationData = (data: any): Promise<any> => this.get(this.prefix + ``, data);
    updateDocumentationData = (data: any): Promise<any> => this.post(this.prefix + `/update-documentation`, data);
}

export const documentationBaseService = new DocumentationBaseService();
