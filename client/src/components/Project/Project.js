import React from "react";
import Library from "../Library/Library";

export default function Project() {
  return (
    <div>
      <a href="/api/logout"><button type="button" className="btn btn-dark">Logout</button></a>
      <a href="/api/current_user"><button type="button" className="btn btn-primary">Current User</button></a>
      <h5>Project</h5>
      <Library />
    </div>
  );
}
