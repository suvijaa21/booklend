import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Fileupload() {
  return (
    <div>
      <form
        action="http://localhost:3001/api/uploadimage"
        method="POST"
        encType="multipart/form-data"
      >
        <input type="file" name="image" id="" />
        <input type="submit" name="" id="" />
      </form>
    </div>
  );
}

export default Fileupload;
