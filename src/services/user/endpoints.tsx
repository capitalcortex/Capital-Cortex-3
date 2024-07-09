import { HttpService } from "../index";

class UserBaseService extends HttpService {
  private readonly prefix: string = "user";

  /**
   * User
   * @paramdata
   */
  profileSetup = (data: any): Promise<any> =>
    this.put(this.prefix + `/profile-setup`, data);
  profileMetaData = (data: any): Promise<any> =>
    this.get(`/profile-metadata` , data);
  newsAlerts = (data: any): Promise<any> =>
    this.get(this.prefix + `/news-alerts` , data);
  editProfile = (data: any): Promise<any> =>
    this.post(this.prefix + `/edit-profile`, data);
  changePassword = (data: any): Promise<any> =>
    this.post(this.prefix + `/change-password`, data);
  updateAlerts = (data: any): Promise<any> =>
    this.post(this.prefix + `/update-alerts`, data);
  newsLetter = (data: any): Promise<any> =>
    this.post(this.prefix + `/add-newsletter`, data);
  linkedIn = (data: any): Promise<any> =>
    this.custom_post(`https://www.linkedin.com/oauth/v2/accessToken`, data);
  canadianBills = (data: any): Promise<any> =>
    this.post(this.prefix + `/canadian-bills`, data);
  canadianReports = (data: any): Promise<any> =>
    this.post(this.prefix + `/canadian-reports`, data);
}

export const userBaseService = new UserBaseService();
