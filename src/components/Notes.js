import React, { useEffect, useState, useContext } from "react";

import SingleNote from "./SingleNote";

import {SimpleGrid } from "@chakra-ui/react";

import userContext from "../context/userContext";

export default function Notes() {
  const info = useContext(userContext);
  const { userState} = info;

  const [notes, setNotes] = useState([]);
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchAllnotes = async () => {
      const response = await fetch("api/notes/fetchAllNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setNotes(data);
      setFetched(true);
    };
    fetchAllnotes();
  }, [userState]);
  
  return (
    <>
      <SimpleGrid spacing={10} minChildWidth="350px" justifyItems="center">
        {isFetched &&
          notes.map((note) => {
            return (
              <SingleNote
                key={note._id}
                title={note.title}
                description={note.description}
                tag={note.tag}
                date={note.date}
                id={note._id}
              />
            );
          })}
      </SimpleGrid>
    </>
  );
}
