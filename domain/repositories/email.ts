import { type Mail } from "../models/mail";

export interface EmailRepository {
  sendEmail(mail: Mail): Promise<void>;
  sendInviteSeniorEmail(emailAddress: string): Promise<void>;
}
