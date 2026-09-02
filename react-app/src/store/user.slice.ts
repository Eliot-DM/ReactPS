import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  isLogined: boolean;
}

interface UserState {
  users: User[];
  name: string;
  currentUser: User | null;
}

// Загрузка данных из localStorage
const loadUsersFromStorage = (): User[] => {
  try {
    const data = localStorage.getItem("data");
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading users from localStorage:", error);
  }
  return [];
};

// Поиск залогиненного пользователя
const findLoggedUser = (users: User[]): User | null => {
  return users.find((u) => u.isLogined === true) || null;
};

const initialState: UserState = {
  users: loadUsersFromStorage(),
  name: "",
  currentUser: findLoggedUser(loadUsersFromStorage()),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Установка имени для нового пользователя
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    // Сохранение нового пользователя
    saveName: (state) => {
      if (state.name.trim()) {
        // Делаем всех пользователей неактивными
        state.users = state.users.map((user) => ({
          ...user,
          isLogined: false,
        }));

        // Проверяем, существует ли уже такой пользователь
        const existingUserIndex = state.users.findIndex(
          (user) => user.name === state.name.trim(),
        );

        if (existingUserIndex !== -1) {
          // Если пользователь существует, просто логиним его
          state.users[existingUserIndex].isLogined = true;
          state.currentUser = state.users[existingUserIndex];
        } else {
          // Создаем нового пользователя
          const newUser: User = {
            name: state.name.trim(),
            isLogined: true,
          };
          state.users.push(newUser);
          state.currentUser = newUser;
        }

        // Очищаем поле ввода
        state.name = "";

        // Сохраняем в localStorage
        localStorage.setItem("data", JSON.stringify(state.users));
      }
    },

    // Выход пользователя
    logoutCurrentUser: (state) => {
      if (state.currentUser) {
        const userIndex = state.users.findIndex(
          (u) => u.name === state.currentUser?.name,
        );

        if (userIndex !== -1) {
          state.users[userIndex].isLogined = false;
          state.currentUser = null;

          // Сохраняем изменения в localStorage
          localStorage.setItem("data", JSON.stringify(state.users));
        }
      }
    },

    // Переключение между пользователями
    switchUser: (state, action: PayloadAction<string>) => {
      const userName = action.payload;

      // Делаем всех пользователей неактивными
      state.users = state.users.map((user) => ({
        ...user,
        isLogined: false,
      }));

      // Находим и активируем выбранного пользователя
      const userIndex = state.users.findIndex((u) => u.name === userName);
      if (userIndex !== -1) {
        state.users[userIndex].isLogined = true;
        state.currentUser = state.users[userIndex];

        localStorage.setItem("data", JSON.stringify(state.users));
      }
    },

    // Установка текущего пользователя (для инициализации)
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },

    // Синхронизация с localStorage
    syncWithStorage: (state) => {
      const storedUsers = loadUsersFromStorage();
      state.users = storedUsers;
      state.currentUser = findLoggedUser(storedUsers);
    },
  },
});

export const {
  setName,
  saveName,
  logoutCurrentUser,
  switchUser,
  setCurrentUser,
  syncWithStorage,
} = userSlice.actions;

export default userSlice.reducer;
