import http from "./axios";

export async function getDocument() {
  try {
    const response = await http.get("/document");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getDocumentById(id) {
  try {
    const response = await http.get(`/document/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteDocumentById(id) {
  try {
    const response = await http.delete(`/document/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function addDocument(form) {
  try {
    console.log(form, "form dari service");
    const response = await http.post("/adddocument", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}
