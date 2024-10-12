import { type FileRepository } from "@/domain/repositories/file";
import { type SeniorRepository } from "@/domain/repositories/senior";

import { AuthenticationError } from "../utils";

export async function removeImageFromCDNUseCase(
  seniorRepository: SeniorRepository,
  fileRepository: FileRepository,
  imageUrl: string
) {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }
  await fileRepository.removeImageFromCDN(imageUrl);
}

export async function removeOldUserImageUseCase(
  seniorRepository: SeniorRepository,
  fileRepository: FileRepository
) {
  const currentUser = await seniorRepository.getCurrentUser();

  if (!currentUser) {
    throw new AuthenticationError();
  }
  const { imageUrl, id } = currentUser;

  await fileRepository.removeImageFromCDN(imageUrl);
  await seniorRepository.removeProfilePicture(id);
}
