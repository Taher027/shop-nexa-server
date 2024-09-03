export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

interface IUser {
  name: TUserName;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: 'user' | 'admin';
  gender?: 'male' | 'female' | 'others';
  profileImage?: string;
}
export default IUser;
