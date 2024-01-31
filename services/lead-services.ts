import { API_METHODS, API_PATHS } from '@/utils/constants/common-constants';
import { AxiosRequestConfig } from 'axios';
import { HttpClient, Response } from './axios-base-query';

export class LeadService {
  client;

  constructor(baseUrl?: string) {
    this.client = new HttpClient(baseUrl);
  }

   public getExecutives = async (token: string): Promise<any> => {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    const resp = await this.client.request({
      url: API_PATHS.GetExecutives,
      method: API_METHODS.GET,
      ...config,
    });

    return resp;
  };

  public getExecutivesData = async (setExecutivesOption: any, token: string) => {
      try {
        const response = await this.getExecutives(token);
        const executivesOption = this.createSelectData(response.data.Data.Data);
        setExecutivesOption(executivesOption);
      } catch (error) {
        console.error('Error fetching executives:', error);
      }
    };



  public createSelectData = (items: any): any => {
    const selectOptions: any = [];
    items.map((item: any) => {
      const newItem = { ...item, value: item.name, label: item.name };
      selectOptions.push(newItem);
    });
    return selectOptions;
  };

  public getLeads = async (token: string): Promise<any> => {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    const resp = await this.client.request({
      url: API_PATHS.GetLeads,
      method: API_METHODS.GET,
      ...config,
    });

    return resp;
  };

  public getLeadsData = async (setLeadsData:any, token: string) => {
    try {

      const response = await this.getLeads(token);
      console.log(response);
      const data = response.data.Data.Data;
      setLeadsData(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  
  //! Get single Lead data

  public getUserLead = async (user_id: number, token: string): Promise<any> => {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    const resp = await this.client.request({
      url: `${API_PATHS.LeadView}?lead_id=${user_id}`,
      method: API_METHODS.GET,
      ...config,
    });

    return resp;
  };

  //! Update Lead data

  public updateLead = async (lead_id: number, data: any, token: string): Promise<any> => {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    const resp = await this.client.request({
      url: `${API_PATHS.UpdateLead}?lead_id=${lead_id}`,
      method: API_METHODS.PATCH,
      ...config,
      data,
    });

    return resp;
  };

  //! Delete Lead data

  public deleteLead = async (lead_id: number, token: string): Promise<any> => {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    const resp = await this.client.request({
      url: `${API_PATHS.DeleteLead}?lead_id=${lead_id}`,
      method: API_METHODS.DELETE,
      ...config,
    });

    return resp;
  };
 
}
