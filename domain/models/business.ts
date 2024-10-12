import { boolean, checkAsync, date, email, enumType, literal, maxLength, maxValue, minLength, minValue, number, object, objectAsync, optional, pickAsync, regex, string, string, transformAsync, union, url, type InferOutput, pipe } from "valibot"

import { userSchema } from "./senior";

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const sluggify = (slug: string) => slug.replace(/\s+/g, "-").toLowerCase();

const isValidPublicUrl = async (input: string) => {
  if (!input) return false;
  const result = await fetch(`/api/business/checkPublicUrl?publicUrl=${sluggify(input)}`);
  const data = await result.json();
  return data.valid;
};

export const businessSchema = objectAsync({
  id: string("Id should not be empty"),
  senior: optional(userSchema),
  seniorId: string("Senior Id should not be empty"),
  name: pipe(string("Business name is required."), minLength(2, "Business name must be at least 2 characters") , maxLength(30, "Business name must not be longer than 30 characters") ,),
  tagline: pipe(string("Tagline is required."), minLength(2, "Tagline name must be at least 2 characters") , maxLength(200, "First name must not be longer than 200 characters") ,),
  industryType: pipe(string("Industry Type is required."), minLength(2, "Industry Type must be at least 2 characters") , maxLength(30, "Industry Type must not be longer than 30 characters") ,),
  phoneNumber: pipe(string("Phone number is required."), regex(phoneRegex, "Invalid phone number!")),
  publicUrl: transformAsync(
    pipe(string("Public Url is required."), minLength(2, "Public Url must be at least 2 characters") , maxLength(30, "Public Url must not be longer than 30 characters") , checkAsync<string>(
        isValidPublicUrl,
        "This Public Url is already chosen. Please choose another one."
      ) ,),
    sluggify
  ),
  emailAddress: union([pipe(string(), email()), literal("")], "Invalid email address"),
  description: optional(
    pipe(string(), maxLength(500, "Business name must not be longer than 500 characters"))
  ),
  website: union([pipe(string(), url()), literal("")], "Website field must be a valid URL"),
  status: optional(
    enumType(["Registered", "Not Registered"], "Please select your business status.")
  ),
  tin: optional(pipe(string(), maxLength(200, "First name must not be longer than 200 characters"))),
  coverPhotoUrl: union([pipe(string(), url("Image field must be a valid URL")), literal("")]),
  logoUrl: union([pipe(string(), url("Image field must be a valid URL")), literal("")]),
  businessCertificateUrl: union([pipe(string(), url("Image field must be a valid URL")), literal("")]),
  published: optional(boolean()),
  createdAt: optional(date()),
});

export const locationSchema = object({
  address: string("Address is required"),
  lat: optional(
    pipe(number("Latitude is required."), minValue(-180, "Not a valid latitude") , maxValue(180, "Not a valid latitude") ,)
  ),
  lng: optional(
    pipe(number("Longitude is required."), minValue(-90, "Not a valid longitude") , maxValue(90, "Not a valid longitude") ,)
  ),
  street: optional(string()),
  region: optional(string()),
  city: optional(string()),
  country: optional(string()),
  branchName: optional(string()),
  id: string("Id should not be empty"),
  businessId: string("BusinessId should not be empty"),
});

export const businessInfoSchema = pickAsync(businessSchema, [
  "id",
  "name",
  "tagline",
  "industryType",
  "phoneNumber",
  "publicUrl",
]);

export const businessDetailsSchema = pickAsync(businessSchema, [
  "emailAddress",
  "description",
  "website",
  "status",
  "tin",
  "id",
]);

export type BusinessDetails = InferOutput<typeof businessDetailsSchema>;

export type BusinessInfo = InferOutput<typeof businessInfoSchema>;

export type CreateBusinessInfo = BusinessInfo & { seniorId: string };

export type Business = InferOutput<typeof businessSchema>;

export type BusinessLocation = InferOutput<typeof locationSchema>;
