import { BASE_URL } from "@/constants/BaseUrl";
import { useState, useEffect } from "react";

export interface TheaterDto {
  id: number;
  name: String;
  address: String;
  seatCount: number;
}
export function useTheaters() {
  const [theaters, setTheaters] = useState<TheaterDto[] | null>(null);
  useEffect(() => {
    console.log(BASE_URL);
    fetch(`${BASE_URL}/api/theaters`)
      .then((response) => response.json())
      .then((data: TheaterDto[]) => setTheaters(data));
  }, []);
  return theaters;
}
