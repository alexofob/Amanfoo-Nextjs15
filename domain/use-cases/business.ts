import { safeParseAsync } from "valibot";

import { validateData } from "@/lib/utils";
import { imageUrlSchema } from "@/domain/models/senior";
import { type SeniorRepository } from "@/domain/repositories/senior";

import {
  businessInfoSchema,
  businessSchema,
  locationSchema,
  type Business,
  type BusinessInfo,
  type BusinessLocation,
} from "../models/business";
import { type BusinessRepository } from "../repositories/business";
import { AuthenticationError } from "../utils";

export async function getBusinessesUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  limit = 20
): Promise<Business[]> {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const businesses = await businessRepository.getBusinesses(limit);

  return businesses;
}

export async function getBusinessUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  businessId: string
): Promise<Business> {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const business = await businessRepository.getBusiness(businessId);
  const user = await seniorRepository.getUser(business.seniorId);

  if (!business) {
    throw new Error(`Could not find senior with id: ${currentUser.id}`);
  }

  return { ...business, senior: user };
}

export async function getSeniorBusinessesUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  limit = 20
): Promise<Business[]> {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const businesses = await businessRepository.getSeniorBusinesses(currentUser.id, limit);

  return businesses;
}

export async function createBusinessUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: BusinessInfo
): Promise<void> {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  const result = await safeParseAsync(businessInfoSchema, data);
  if (!result.success) {
    let errorMessage = "";
    result.issues.forEach((issue) => {
      errorMessage += `${issue.path?.at(0)} : ${issue.message}.`;
    });
    throw new Error(errorMessage);
  }

  // Insert business into the DB
  await businessRepository.createBusiness({ ...data, seniorId: currentUser.id });
}

export async function updateBusinessUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: Partial<Business> & { id: string }
): Promise<void> {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const business = await businessRepository.getBusiness(data.id);

  if (!business) {
    throw new Error(`Business with id: ${data.id} does not exist`);
  }

  // Check whether the data is valid
  const result = await safeParseAsync(businessSchema, {
    ...business,
    ...data,
    seniorId: currentUser.id,
  });
  if (!result.success) {
    let errorMessage = "";
    result.issues.forEach((issue) => {
      errorMessage += `${issue.path?.at(0)} : ${issue.message}.`;
    });
    throw new Error(errorMessage);
  }

  await businessRepository.updateBusiness(result.output);
}

export async function saveBusinessLogoUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: { imageUrl: string; businessId: string }
): Promise<void> {
  await saveBusinessFile(
    seniorRepository,
    businessRepository.saveBusinessLogo,
    data.imageUrl,
    data.businessId
  );
}

export async function removeBusinessLogoUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: { imageUrl: string; businessId: string }
): Promise<void> {
  await saveBusinessFile(
    seniorRepository,
    businessRepository.saveBusinessLogo,
    "",
    data.businessId
  );
}

export async function saveBusinessCoverPhotoUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: { imageUrl: string; businessId: string }
): Promise<void> {
  await saveBusinessFile(
    seniorRepository,
    businessRepository.saveBusinessCoverPhoto,
    data.imageUrl,
    data.businessId
  );
}

export async function removeBusinessCoverPhotoUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: { imageUrl: string; businessId: string }
): Promise<void> {
  await saveBusinessFile(
    seniorRepository,
    businessRepository.saveBusinessCoverPhoto,
    "",
    data.businessId
  );
}

export async function saveBusinessCertificateUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: { imageUrl: string; businessId: string }
): Promise<void> {
  await saveBusinessFile(
    seniorRepository,
    businessRepository.saveBusinessCertficate,
    data.imageUrl,
    data.businessId
  );
}

export async function removeBusinessCertficateUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: { imageUrl: string; businessId: string }
): Promise<void> {
  await saveBusinessFile(
    seniorRepository,
    businessRepository.saveBusinessCertficate,
    "",
    data.businessId
  );
}

export async function saveBusinessFile(
  seniorRepository: SeniorRepository,
  repositoryMethod: (businessId: string, imageUrl: string) => Promise<void>,
  imageUrl: string,
  businessId: string
): Promise<void> {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(imageUrlSchema, { imageUrl });

  // Update the business
  await repositoryMethod(businessId, imageUrl);
}

export async function createBusinessLocationUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  data: BusinessLocation
): Promise<void> {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(locationSchema, data);

  // Insert business into the DB
  await businessRepository.createBusinessLocation(data);
}

export async function getBusinessLocationsUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  businessId: string,
  limit = 20
): Promise<BusinessLocation[]> {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const locations = await businessRepository.getBusinessLocations(businessId, limit);

  return locations;
}
