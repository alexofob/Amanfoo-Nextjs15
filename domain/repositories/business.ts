import type { Business, BusinessLocation, CreateBusinessInfo } from "@/domain/models/business";

export interface BusinessRepository {
  getBusiness(id: string): Promise<Business>;
  getBusinesses(limit: number): Promise<Business[]>;
  createBusiness(business: CreateBusinessInfo): Promise<void>;
  updateBusiness(business: Business): Promise<void>;
  getBusinessesCount(): Promise<number>;
  getPaginatedBusinesses(limit: number, offset: number): Promise<Business[]>;
  getSeniorBusinesses(id: string, limit?: number): Promise<Business[]>;
  saveBusinessLogo(businessId: string, logoUrl: string): Promise<void>;
  saveBusinessCoverPhoto(businessId: string, coverPhotoUrl: string): Promise<void>;
  saveBusinessCertficate(businessId: string, businessCertifateUrl: string): Promise<void>;
  createBusinessLocation(LocationData: BusinessLocation): Promise<void>;
  updateBusinessLocation(LocationData: BusinessLocation): Promise<void>;
  getBusinessLocation(id: string): Promise<BusinessLocation>;
  getBusinessLocations(businessId: string, limit: number): Promise<BusinessLocation[]>;
}
