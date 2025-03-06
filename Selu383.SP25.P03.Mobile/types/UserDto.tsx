import React, { ReactNode, useContext, useEffect, useState } from "react";

export interface UserDto {
  name: String;
}

const UserContext = React.createContext<UserDto | null>(null);

export interface UserProviderProps {
  children: ReactNode;
  value: UserDto | null;
}
export function UserProvider({ children, value }: UserProviderProps) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserDto | null {
  const userContextValue = useContext(UserContext);

  return userContextValue;
}

export function useMe() {
  const [user, setUser] = useState<UserDto | null>(null);
  useEffect(() => {
    fetch("https://tadpole-merry-eminently.ngrok-free.app/api/authentication/me")
      .then((response) => response.json())
      .then((data: UserDto) => setUser(data));
  }, []);
}
