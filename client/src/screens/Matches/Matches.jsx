import { React, useEffect, useState } from "react";
import { getUserDogsMatches } from "../../services/dogs";

export default function Matches() {
  /** @type {[[{dog: Dog, matches: [Dog]}], ()=>{}]} */
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserDogsMatches = async () => {
      const response = await getUserDogsMatches();
      setData(response);
    };
    fetchUserDogsMatches();
  }, []);

  return (
    <>
      <div>Matches</div>
      {data.map((obj) => {
        return (
          <div>
            {obj.dog.name}
            {obj.matches.map((match) => {
              return <div>hi {match.name}</div>;
            })}
          </div>
        );
      })}
    </>
  );
}
