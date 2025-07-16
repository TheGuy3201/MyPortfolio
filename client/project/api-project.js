import queryString from "query-string";

const create = async (params, credentials, project) => {
  try {
    let response = await fetch("/api/project/by/" + params.shopId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: project,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const read = async (params, signal) => {
  try {
    let response = await fetch("/api/project/" + params.projectId, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const update = async (params, credentials, project) => {
  try {
    let response = await fetch(
      "/api/project/" + params.shopId + "/" + params.projectId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: project,
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      "/api/project/" + params.shopId + "/" + params.projectId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const list = async (params, signal) => {
  const query = queryString.stringify(params);
  try {
    let response = await fetch("/api/projects?" + query, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
export {
  create,
  read,
  update,
  remove,
  list,
};
