export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  country?: string;
  preferred_categories?: string[];
}
