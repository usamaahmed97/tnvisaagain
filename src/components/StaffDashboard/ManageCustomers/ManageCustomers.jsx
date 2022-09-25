import React from "react";
import { Amplify, Auth, API } from "aws-amplify";

// async function addToGroup() {
//   let apiName = "AdminQueries";
//   let path = "/addUserToGroup";
//   let myInit = {
//     body: {
//       username: "usama",
//       groupname: "receptionist",
//     },
//   };
//   await API.post(apiName, path, myInit);
//   console.log("User added to group now.");
// }

// let nextToken;

// async function listEditors(limit) {
//   let apiName = "AdminQueries";
//   let path = "/listUsersInGroup";
//   let myInit = {
//     queryStringParameters: {
//       groupname: "superadmin",
//       limit: limit,
//       token: nextToken,
//     },
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${(await Auth.currentSession())
//         .getAccessToken()
//         .getJwtToken()}`,
//     },
//   };
//   const { NextToken, ...rest } = await API.get(apiName, path, myInit);
//   nextToken = NextToken;
//   return rest;
// }

const ManageCustomers = () => {
  return (
    <div>
      <h1>Manage Customer Page</h1>
      {/* <button onClick={addToGroup}>Add to Group</button> */}
      {/* <button onClick={() => listEditors(10)}>List Editors</button> */}
    </div>
  );
};

export default ManageCustomers;
