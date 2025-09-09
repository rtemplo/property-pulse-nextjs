import { Session } from 'next-auth';

export interface IPropertyPulseSession extends Session {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
