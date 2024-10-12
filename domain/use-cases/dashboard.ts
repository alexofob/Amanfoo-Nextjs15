import { isAdmin } from "@/lib/utils";

import { type User } from "../models/senior";
import { type BusinessRepository } from "../repositories/business";
import { type SeniorRepository } from "../repositories/senior";
import { AuthenticationError } from "../utils";

export async function getDashboardCountsUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository
) {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser || !currentUser.role || !isAdmin(currentUser.role)) {
    throw new AuthenticationError();
  }

  const seniorsCount = await seniorRepository.getUsersCount();
  const businessesCount = await businessRepository.getBusinessesCount();
  const adminsCount = await seniorRepository.getAdminsCount();

  return {
    seniorsCount,
    businessesCount,
    adminsCount,
  };
}

export async function getPaginatedSeniorsUseCase(
  seniorRepository: SeniorRepository,
  { limit = 20, offset = 0 }: { limit: number; offset: number }
) {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser || !currentUser.role || !isAdmin(currentUser.role)) {
    throw new AuthenticationError();
  }

  const paginatedSeniors = await seniorRepository.getPaginatedSeniors(limit, offset);

  return paginatedSeniors;
}

export async function getPaginatedBusinessesUseCase(
  seniorRepository: SeniorRepository,
  businessRepository: BusinessRepository,
  { limit = 20, offset = 0 }: { limit: number; offset: number }
) {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser || !currentUser.role || !isAdmin(currentUser.role)) {
    throw new AuthenticationError();
  }

  const paginatedBusinesses = await businessRepository.getPaginatedBusinesses(limit, offset);

  return paginatedBusinesses;
}

export async function getAdminsUseCase(
  repository: SeniorRepository,
  limit: number
): Promise<User[]> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const admins = await repository.getAdmins(limit);

  return admins;
}
