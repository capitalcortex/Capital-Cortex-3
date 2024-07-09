import { HttpService } from "../index";

class ChatBaseService extends HttpService {
    private readonly prefix: string = "chat";
    /**
     * User
     * @paramdata
     */
    chatResponse = (data: any): Promise<any> => this.post(this.prefix + `/response`, data, { responseType: 'stream' });
    addChat = (data: any): Promise<any> => this.post(this.prefix + `/add-chat`, data);
    chatHistory = (data: any): Promise<any> => this.get(this.prefix + `/history`, data);
    updateChat = (data: any): Promise<any> => this.post(this.prefix + `/update-chat`, data);
    createList = (data: any): Promise<any> => this.post(this.prefix + `/create-list`, data);
    noteLists = (data: any): Promise<any> => this.get(this.prefix + `/notes`, data);
    addNote = (data: any): Promise<any> => this.post(this.prefix + `/add-note`, data);
    deleteNote = (data: any): Promise<any> => this.delete(this.prefix + `/delete-note`, data);
    deleteChat = (data: any): Promise<any> => this.delete(this.prefix + `/delete-chat`, data);
    uploadPDF = (data: any): Promise<any> => this.post(this.prefix + `/upload-file`, data);
    chatFeedback = (data: any): Promise<any> => this.post(this.prefix + `/feedback`, data);
    documentChat = (data: any): Promise<any> => this.get(this.prefix + `/document-chat`, data);
}

export const chatBaseService = new ChatBaseService();
