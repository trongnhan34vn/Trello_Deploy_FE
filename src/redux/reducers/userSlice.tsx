import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  User,
  UserDTO,
  UserRequestRegister,
  UserResponseLogin,
} from '../../types/User.type';

// const initState: UserResponseLogin = {
//   user: null,
//   accessToken: null,
// };

interface UserState {
  loginResponse: UserResponseLogin;
  search: User[];
  user: User | null;
  users: User[];
  loginFailed: string;
}

const initState: UserState = {
  loginResponse: {
    user: null,
    accessToken: null,
  },
  search: [],
  user: null,
  users: [],
  loginFailed: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    login: (state, action: PayloadAction<UserDTO>) => {},
    register: (state, action: PayloadAction<UserRequestRegister>) => {},
    getResult: (state, action: PayloadAction<UserResponseLogin>) => {
      state.loginResponse.accessToken = action.payload.accessToken;
      state.loginResponse.user = action.payload.user;
    },
    searchByEmail: (state, action: PayloadAction<string>) => {},
    getByEmail: (state, action: PayloadAction<User[]>) => {
      state.search = action.payload;
    },
    findById: (state, action: PayloadAction<number>) => {},
    getById: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    findAll: () => {},
    getAll: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    getMessage: (state, action: PayloadAction<string>) => {
      state.loginFailed = action.payload;
    }
  },
});

export default userSlice.reducer;
export const {
  register,
  getResult,
  login,
  searchByEmail,
  getByEmail,
  findById,
  getById,
  findAll,
  getAll,
  getMessage,
} = userSlice.actions;
