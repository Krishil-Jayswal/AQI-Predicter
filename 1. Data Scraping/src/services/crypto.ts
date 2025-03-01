type JSONValue = string | number | boolean | null | JSONArray | JSONObject;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

export const Base64ToJSON = (data: string) => {
  const original: JSONObject = JSON.parse(atob(data));
  return original;
};

export const JSONToBase64 = (data: JSONObject) => {
  const encoded = btoa(JSON.stringify(data));
  return encoded;
};
