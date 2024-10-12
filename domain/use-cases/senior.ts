import { nanoid } from "nanoid";

import { isAdmin, validateData } from "@/lib/utils";
import {
  emailSchema,
  imageUrlSchema,
  personalInfoSchema,
  professionInfoSchema,
  schoolInfoSchema,
  type AuthUser,
  type Profession,
  type School,
  type Senior,
  type User,
} from "@/domain/models/senior";
import { type EmailRepository } from "@/domain/repositories/email";
import { type SeniorRepository } from "@/domain/repositories/senior";

import { AuthenticationError } from "../utils";

export async function getSeniorUseCase(repository: SeniorRepository): Promise<Senior> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const senior = await repository.getSenior(currentUser.id);

  if (!senior) {
    throw new Error(`Could not find senior with id: ${currentUser.id}`);
  }

  return senior;
}

export async function getUserUseCase(repository: SeniorRepository): Promise<User> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const user = await repository.getUser(currentUser.id);

  if (!user) {
    throw new Error(`Could not find user with id: ${currentUser.id}`);
  }

  return user;
}

export async function getCurrentUserUseCase(repository: SeniorRepository): Promise<AuthUser> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  return currentUser;
}

export async function inviteSeniorUseCase(
  repository: SeniorRepository,
  emailRepository: EmailRepository,
  emailAddress: string
): Promise<void> {
  const currentUser = await repository.getCurrentUser();

  // Check whether user is Admin
  if (!isAdmin(currentUser?.role)) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(emailSchema, { email: emailAddress });

  // check whether senior with the specified email already exists
  const existingUser = await repository.getUserByEmail(emailAddress);

  if (existingUser) {
    throw new Error(`User ${emailAddress} already exists.`);
  }

  // Insert user into the DB
  await repository.createUserByEmail({
    id: nanoid(),
    email: emailAddress,
    role: "user",
    invitedById: currentUser.id,
  });

  // Send email notification to the user

  await emailRepository.sendInviteSeniorEmail(emailAddress);
}

export async function createProfessionUseCase(
  repository: SeniorRepository,
  data: Profession
): Promise<void> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(professionInfoSchema, data);

  // Insert profession into the DB
  await repository.createProfession({ ...data, seniorId: currentUser.id });
}

export async function createSchoolUseCase(
  repository: SeniorRepository,
  data: School
): Promise<void> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(schoolInfoSchema, data);

  // Insert school into the DB
  await repository.createSchool({ ...data, seniorId: currentUser.id });
}

export async function updateSchoolUseCase(
  repository: SeniorRepository,
  data: School
): Promise<void> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(schoolInfoSchema, data);

  // Update the user
  await repository.updateSchool({ ...data, seniorId: currentUser.id });
}

export async function updateProfessionUseCase(
  repository: SeniorRepository,
  data: Profession
): Promise<void> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(professionInfoSchema, data);

  // Update the user
  await repository.updateProfession({ ...data, seniorId: currentUser.id });
}

export async function updateUserUseCase(repository: SeniorRepository, data: User): Promise<void> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(personalInfoSchema, data);

  // Update the user
  await repository.updateUser({
    ...data,
    name: `${data.firstname} ${data.surname}`,
    id: currentUser.id,
  });
}

export async function saveProfilePictureUseCase(
  repository: SeniorRepository,
  imageUrl: string
): Promise<void> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  // Check whether the data is valid
  validateData(imageUrlSchema, { imageUrl });

  // Update the user
  await repository.saveProfilePicture(currentUser.id, imageUrl);
}

export async function getSeniorsUseCase(
  repository: SeniorRepository,
  limit: number
): Promise<Senior[]> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const seniors = await repository.getSeniors(limit);

  return seniors;
}

/*
export async function getSeniorUseCase(repository: SeniorRepository): Promise<Senior> {
  const currentUser = await repository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }

  const [user, school, profession] = await Promise.all([
    repository.getUser(currentUser.id),
    repository.getSchool(currentUser.id),
    repository.getProfession(currentUser.id),
  ]);

  if (!user) {
    throw new Error(`Could not find senior with id: ${currentUser.id}`);
  }

  return {
    ...user,
    school: school,
    profession: profession,
  };
}
 */
