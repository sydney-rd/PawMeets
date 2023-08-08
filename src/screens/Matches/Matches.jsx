import { React, useEffect, useState } from "react";
import { getUserDogsMatches } from "../../services/dogs";
import Nav from "../../components/Nav/Nav";
import "./Matches.css";

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
      <Nav />
      <div className="matches-container">
        <div className="matches-title">Matches</div>
        {data.map((obj) => (
          <div className="dog-matches" key={obj.dog.id}>
            <div className="dog-name">{obj.dog.name}'s matches</div>
            <div className="matches-list">
              {obj.matches.length > 0 ? (
                obj.matches.map((match) => (
                  <div className="match-dog-name" key={match.id}>
                    <div>
                      <img
                        className="match-image"
                        src={match.image}
                        alt={match.name}
                      />
                      <div>{match.name}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-matches-message">
                  {obj.dog.name} has no matches yet!
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
