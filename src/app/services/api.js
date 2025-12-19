// services/api.js
 
export const BASEURL = "https://dwdm-psw-heroes-api.onrender.com/api";
 
export const PUBLICID = "7BnFkhVJ";
export const PRIVATEID = "K5d6TRHY1VVXif-s";
 
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
 

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
 
  const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");
 
  if (!res.ok) {
    const details =
      body && typeof body === "object"
        ? JSON.stringify(body)
        : String(body ?? "");
 
    
  }
 
  return body;
}
 
export async function getUsers() {
  const res = await fetch(`${BASEURL}/users`, { headers });
  return parseResponse(res);
}
 
export async function getHeroesByPublicId(publicId = PUBLICID) {
  const res = await fetch(`${BASEURL}/users/${publicId}`, { headers });
  return parseResponse(res);
}
 
export async function getTopByPublicId(publicId = PUBLICID) {
  const res = await fetch(`${BASEURL}/users/${publicId}/top`, { headers });
  return parseResponse(res);
}
 
export async function saveHeroes(heroesArray) {
  const res = await fetch(`${BASEURL}/users/${PRIVATEID}`, {
    method: "POST",
    headers,
    body: JSON.stringify(heroesArray),
  });
 
  return parseResponse(res);
}
 
export async function saveTop(topArray) {
  const res = await fetch(`${BASEURL}/users/${PRIVATEID}/top`, {
    method: "POST",
    headers,
    body: JSON.stringify(topArray),
  });
 
  return parseResponse(res);
}