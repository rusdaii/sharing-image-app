export type AuthPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  data: {
    username: string;
    avatarUrl: string;
    accessToken: string;
  };
};

export type RegisterResponse = {
  data: {
    username: string;
    password: string;
  };
};
