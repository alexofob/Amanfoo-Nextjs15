import type {
  AuthUser,
  InvitedUser,
  Profession,
  School,
  Senior,
  User,
} from "@/domain/models/senior";

export interface SeniorRepository {
  getCurrentUser(): Promise<AuthUser>;
  getUser(id: string): Promise<User>;
  getSchool(id: string): Promise<School>;
  getProfession(id: string): Promise<Profession>;
  getUsers(): Promise<User[]>;
  getSenior(id: string): Promise<Senior>;
  getSeniors(limit: number): Promise<Senior[]>;
  getUserByEmail(email: string): Promise<User | null>;
  createUserByEmail(user: InvitedUser): Promise<void>;
  createSchool(school: School): Promise<void>;
  createProfession(profession: Profession): Promise<void>;
  updateUser(user: User): Promise<void>;
  updateSchool(school: School): Promise<void>;
  updateProfession(profession: Profession): Promise<void>;
  removeProfilePicture(userId: string): Promise<void>;
  saveProfilePicture(userId: string, imageUrl: string): Promise<void>;
  getUsersCount(): Promise<number>;
  getAdminsCount(): Promise<number>;
  getPaginatedSeniors(limit: number, offset: number): Promise<User[]>;
  getAdmins(limit: number): Promise<User[]>;
}
