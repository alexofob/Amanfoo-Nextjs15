import { flatten, parse, type ValiError } from "valibot";

import {
  seniorSchema,
  type Profession,
  type Role,
  type School,
  type Senior,
  type User,
} from "@/domain/models/senior";

type ValidatedFields =
  | "id"
  | "firstname"
  | "surname"
  | "name"
  | "email"
  | "otherNames"
  | "emailVerified"
  | "imageUrl"
  | "phoneNumber"
  | "bio"
  | "role"
  | "invitedBy"
  | "school"
  | "profession";

export class SeniorEntityValidationError extends Error {
  private errors: Record<ValidatedFields, string | undefined>;

  constructor(errors: Record<ValidatedFields, string | undefined>) {
    super("An error occured validating a senior entity");
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}

export class SeniorEntity {
  private id: string;
  private firstname: string;
  private surname: string;
  private name?: string;
  private otherNames?: string;
  private email: string;
  private emailVerified?: boolean;
  private imageUrl?: string;
  private phoneNumber: string;
  private bio?: string;
  private role: Role;
  private invitedBy?: User | null;
  private school?: School;
  private profession?: Profession;

  constructor({
    id,
    firstname,
    surname,
    otherNames = "",
    name = "",
    email,
    imageUrl = "",
    phoneNumber,
    bio = "",
    role,
    invitedBy = undefined,
    school = undefined,
    profession = undefined,
  }: Senior) {
    this.id = id;
    this.firstname = firstname;
    this.surname = surname;
    this.otherNames = otherNames;
    this.email = email;
    this.imageUrl = imageUrl;
    this.phoneNumber = phoneNumber;
    this.bio = bio;
    this.role = role;
    this.invitedBy = invitedBy;
    this.school = school;
    this.profession = profession;
    this.name = name
      ? name
      : otherNames
      ? `${firstname} ${otherNames} ${surname}`
      : `${firstname} ${surname}`;

    this.validate();
  }

  getId() {
    return this.id;
  }

  getFirstname() {
    return this.firstname;
  }

  getSurname() {
    return this.surname;
  }

  getemail() {
    return this.email;
  }

  getOtherNames() {
    return this.otherNames;
  }

  getName() {
    return this.name;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getEmailVerified() {
    return this.emailVerified;
  }

  getImageUrl() {
    return this.imageUrl;
  }

  getRoles() {
    return this.role;
  }

  getBio() {
    return this.bio;
  }

  getInvitedBy() {
    return this.invitedBy;
  }

  getSchool() {
    return this.school;
  }

  getProfession() {
    return this.profession;
  }

  private validate() {
    try {
      parse(seniorSchema, this);
    } catch (err) {
      const error = err as ValiError;
      const errors = flatten(error.issues).nested;
      throw new SeniorEntityValidationError({
        id: errors.id?.[0],
        firstname: errors.firstname?.[0],
        surname: errors.surname?.[0],
        otherNames: errors.otherNames?.[0],
        email: errors.email?.[0],
        emailVerified: errors.emailVerified?.[0],
        imageUrl: errors.imageUrl?.[0],
        name: errors.name?.[0],
        phoneNumber: errors.phoneNumber?.[0],
        bio: errors.bio?.[0],
        role: errors.role?.[0],
        invitedBy: errors.invitedby?.[0],
        school: errors.school?.[0],
        profession: errors.profession?.[0],
      });
    }
  }
}
