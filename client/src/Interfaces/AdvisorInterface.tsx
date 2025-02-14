export default interface Advisor {
  name: string;
  totalassets?: string | number | undefined;
  bio?: string;
  email: string;
  phone?: string;
  photourl?: string;
  custodians: { name: string; repId: string }[];
}
