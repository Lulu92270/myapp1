import React from "react";
import { MDBCol } from "mdbreact";

const SearchPage = () => {
  return (
    <MDBCol className="pl-0">
      <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
    </MDBCol>
  );
}

export default SearchPage;
