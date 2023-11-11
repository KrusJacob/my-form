export interface IUser {
  id?: number;
  login: string;
  password: string;
  role: TypeRole;
  sex: TypeSex;
  name?: string;
  birthday?: string;
  banned?: boolean;
}

type TypeRole = "admin" | "user";

type TypeSex = "male" | "female" | undefined;
