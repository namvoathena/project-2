interface User {
  id: string;
  email: string;
  phone: string;
  avatar: string;
  password: string;
  dateOfBirth: Date;
  verified: boolean;
  name: { firstName: string; lastName: string };
}

export interface SignInUser {
  username: string;
  password: string;
}

export interface SignUpUser {
  name: string;
  username: string;
  password: string;
}

export default User;
