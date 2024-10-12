import {
  email,
  literal,
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  object,
  omit,
  optional,
  pick,
  picklist,
  pipe,
  regex,
  string,
  union,
  url,
  type InferOutput,
} from "valibot";

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export const userSchema = object({
  id: string("Id should not be empty"),
  firstname: pipe(
    string("First name is required."),
    minLength(2, "First name must be at least 2 characters"),
    maxLength(30, "First name must not be longer than 30 characters")
  ),
  surname: pipe(
    string("Surname is required."),
    minLength(2, "Surname must be at least 2 characters"),
    maxLength(30, "Surname must not be longer than 30 characters")
  ),
  phoneNumber: pipe(
    string("Phone number is required."),
    regex(phoneRegex, "Invalid phone number!")
  ),
  email: pipe(string("Email cannot be empty"), email("Invalid email")),
  otherNames: optional(
    pipe(string(), maxLength(30, "Other names must not be longer than 30 characters"))
  ),
  name: optional(pipe(string(), maxLength(60, "Name must not be longer than 60 characters"))),
  imageUrl: union([pipe(string(), url("Image field must be a valid URL")), literal("")]),
  bio: optional(pipe(string(), maxLength(150, "Bio must not be longer than 150 characters"))),
  role: picklist(["user", "admin", "super_admin"], "Please add role."),
  invitedById: optional(string()),
});

export const emailSchema = pick(userSchema, ["email"]);

export const invitedUserSchema = pick(userSchema, ["id", "email", "role", "invitedById"]);

export const schoolSchema = object({
  id: string("Id should not be empty"),
  senior: optional(userSchema),
  seniorId: string("Senior Id should not be empty"),
  yearEntered: pipe(
    number("Year entered is required."),
    minValue(1949, "Year completed cannot be before 1949."),
    maxValue(currentYear, `Year entered cannot be after ${currentYear}.`)
  ),
  monthEntered: optional(
    pipe(
      number(),
      minValue(1, "Month must be between January and December."),
      maxValue(12, "Month must be between January and December.")
    )
  ),
  yearCompleted: pipe(
    number("Year completed is required."),
    minValue(1949, "Year completed cannot be before 1949."),
    maxValue(currentYear, `Year completed cannot be after ${currentYear}.`)
  ),
  monthCompleted: optional(
    pipe(
      number(),
      minValue(1, "Month must be between January and December."),
      maxValue(12, "Month must be between January and December.")
    )
  ),
  finalYearClass: pipe(
    string("Final Year Class is required."),
    minLength(2, "Final Year Class must be at least 2 characters"),
    maxLength(20, "Final Year Class must not be longer than 20 characters")
  ),
  house: picklist(
    [
      "Serwaa",
      "Freeman",
      "Aggrey",
      "Opoku Ware",
      "Guggisberg",
      "Butler",
      "Ramseyer",
      "Pearson",
      "Osei Tutu",
    ],
    "Please select a house"
  ),
  educationSystem: picklist(
    ["SHS", "A-level", "O-level", "SSS"],
    "Please select an education system"
  ),
});

export const professionSchema = object({
  id: string("Id should not be empty"),
  senior: optional(userSchema),
  seniorId: string("Senior Id should not be empty"),
  profession: pipe(
    string("Profession is required."),
    minLength(2, "Profession must be at least 2 characters"),
    maxLength(50, "Profession must not be longer than 50 characters")
  ),
  professionType: picklist(
    ["Private", "Government", "Student", "Self-Employed", "Unemployed"],
    "Please select a profession"
  ),
  company: optional(
    pipe(string(), maxLength(50, "Company name must not be longer than 50 characters"))
  ),
  position: optional(
    pipe(string(), maxLength(50, "Position must not be longer than 50 characters"))
  ),
  address: optional(
    pipe(string(), maxLength(100, "Address must not be longer than 100 characters"))
  ),
});

export const seniorSchema = object({
  ...userSchema.entries,
  ...object({
    invitedBy: optional(userSchema),
    school: optional(schoolSchema),
    profession: optional(professionSchema),
  }).entries,
});

export const personalInfoSchema = pick(userSchema, [
  "firstname",
  "surname",
  "otherNames",
  "imageUrl",
  "phoneNumber",
  "bio",
]);

export const imageUrlSchema = pick(userSchema, ["imageUrl"]);

export const professionInfoSchema = omit(professionSchema, ["seniorId"]);

export const schoolInfoSchema = omit(schoolSchema, ["seniorId"]);

export type User = InferOutput<typeof userSchema>;

export type AuthUser = Pick<User, "email" | "id" | "name" | "imageUrl" | "role">;

export type InvitedUser = InferOutput<typeof invitedUserSchema>;

export type Email = InferOutput<typeof emailSchema>;

export type School = InferOutput<typeof schoolSchema>;

export type Profession = InferOutput<typeof professionSchema>;

export type Senior = InferOutput<typeof seniorSchema>;

export type Role = Senior["role"];

export type House = School["house"];

export type EducationSystem = School["educationSystem"];

export type ProfessionType = Profession["professionType"];

export type ImageUrl = InferOutput<typeof imageUrlSchema>;
