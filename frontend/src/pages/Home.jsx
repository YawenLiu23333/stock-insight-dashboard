import React from "react";
import { useState } from "react";
import SearchBar from "../component/SearchBar";

function Home({ onSearch }) {
    return <SearchBar onSearch={onSearch}/>
}


export default Home;
