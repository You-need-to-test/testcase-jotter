import React from "react";
import Library from "../Library/Library";

export default function Project() {
  return (
    <div>
      <a href="http://localhost:5000/api/logout"><button type="button" className="btn btn-dark">Logout</button></a>
      <a href="http://localhost:5000/api/current_user"><button type="button" className="btn btn-primary">Current User</button></a>
      <h1>Project</h1>
      <Library />
    </div>
  );
}
