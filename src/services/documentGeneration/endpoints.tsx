import { HttpService } from "../index";

class DocumentGenerationBaseService extends HttpService {
    private readonly prefix: string = "document";
    /**
     * User
     * @paramdata
     */
    generateDocument = (data: any): Promise<any> => this.put(this.prefix + `/generate`, data);
    generateMeetingBriefDocument = (data: any): Promise<any> => this.post(this.prefix + `/generate-meeting-brief`, data);
    generatePolicyBriefDocument = (data: any): Promise<any> => this.post(this.prefix + `/generate-policy-brief`, data);
    generateLegislativeAnalysisDocument = (data: any): Promise<any> => this.post(this.prefix + `/generate-legislative-analysis`, data);
    addSection = (data: any): Promise<any> => this.post(this.prefix + `/add-section`, data);
    editSection = (data: any): Promise<any> => this.post(this.prefix + `/edit-section`, data);
    deleteSection = (data: any): Promise<any> => this.delete(this.prefix + `/delete-section`, data);
    getUserDocuments = (data: any): Promise<any> => this.get(this.prefix + `/user-documents`, data);
    getSingleDocument = (data: any): Promise<any> => this.get(this.prefix + `/single-document`, data);
    deleteDocument = (data: any): Promise<any> => this.delete(this.prefix + `/delete-document`, data);
    searchDocuments = (data: any): Promise<any> => this.get(this.prefix + `/search-documents`, data);
    filterDocuments = (data: any): Promise<any> => this.post(this.prefix + `/filter-documents`, data);
    exportStatus = (data: any): Promise<any> => this.get(this.prefix + `/export-doc-status`, data);
    exportPDF = (data: any): Promise<any> => this.get(this.prefix + `/export-pdf`, data);
    exportDOCX = (data: any): Promise<any> => this.get(this.prefix + `/export-docx`, data);
}

export const documentGenerationBaseService = new DocumentGenerationBaseService();
