import { HttpService } from "../index";

class StakeholderBaseService extends HttpService {
    private readonly prefix: string = "stakeholders";
    /**
     * User
     * @paramdata
     */
    getStakeholders = (data: any): Promise<any> => this.get(this.prefix + ``, data);
    addStakeholder = (data: any): Promise<any> => this.post(this.prefix + `/add-stakeholder`, data);
    editStakeholder = (data: any): Promise<any> => this.put(this.prefix + `/edit-stakeholder`, data);
    deleteStakeholder = (data: any): Promise<any> => this.delete(this.prefix + `/delete-stakeholder`, data);
    addAssistant = (data: any): Promise<any> => this.post(this.prefix + `/add-assistant`, data);
    addNotesTouchpoints = (data: any): Promise<any> => this.post(this.prefix + `/add-notes-touchPoints`, data);
    deleteNotesTouchpoints = (data: any): Promise<any> => this.delete(this.prefix + `/delete-notes-touchPoints`, data);
    editNotesTouchpoints = (data: any): Promise<any> => this.put(this.prefix + `/edit-notes-touchPoints`, data);
    filterStakeholders = (data: any): Promise<any> => this.post(this.prefix + `/filter-stakeholders`, data);
    searchStakeholders = (data: any): Promise<any> => this.get(this.prefix + `/search-stakeholders`, data);
}

export const stakeholderBaseService = new StakeholderBaseService();
