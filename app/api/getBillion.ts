import { API_URL, API_PERSON_URL } from "./constants";

export async function getBillions() {
  const res = await fetch(API_URL);
  const json = await res.json();
  return json;
}

export async function getBillion(id: string) {
  const res = await fetch(API_PERSON_URL(id));

  const json = await res.json();
  return json;
}
