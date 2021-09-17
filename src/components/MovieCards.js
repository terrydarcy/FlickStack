import React, { useState, useEffect, useContext, useCallback } from "react";
import TinderCard from "react-tinder-card";
import styles from "./styles/MovieCards.module.css";
import requests from "../config/requests";
import axios from "axios";
import firebase from "../config/fire";
import { UserContext } from "../providers/UserProvider";

function MovieCards() {
  const [movies, setMovies] = useState([]);
  const [groups, setGroups] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [functionsTest, setFunctionsTest] = useState("not working");

  const fetchUrl = requests.fetchGroupMovies;
  const keywordFetchUrl = requests.fetchKeyword;
  const base_url = "https://api.themoviedb.org/3";
  const image_url = "https://image.tmdb.org/t/p/original/";
  const user = useContext(UserContext);

  const fetchKeywordsAggregate = useCallback(
    async (groups) => {
      var result = "";

       for (var i = 0; i < groups.length; i++) {
        if (groups[i].group.keywords !== undefined)
          result += groups[i].group.keywords;
      }

      var keywordArrayFromString = result.split(",");


      //TODO: only use users keywords
      var keywordIDs = "";
      await Promise.all(
        keywordArrayFromString.map(async (keyword) => {
          if (keyword.length > 0) {
            await axios(base_url + keywordFetchUrl + keyword + "&page=1", {
              method: "GET",
            })
              .then((response) => {
                keywordIDs += getKeywordIDs(response.data.results);
                if (keywordIDs.length !== 0) keywordIDs += ",";
              })
              .catch((error) => {
                console.log("imdb API call problem", error);
              });
          }
        })
      );
      setKeywords(result);
      fetchMovies(keywordIDs);
    },
    [groups, keywordFetchUrl]
  );

  const getKeywordIDs = (keywords_) => {
    var result = "";
    for (var i = 0; i < keywords_.length; i++) {
      if (i >= keywords_.length - 1) {
        result += keywords_[i].id;
      } else {
        result += keywords_[i].id + ",";
      }
    }

    return result;
  };

  const fetchGroups = useCallback(async () => {
    var tempGroups = [];
    await firebase
      .firestore()
      .collection("groups")
      .where("members", "array-contains", user.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        tempGroups = snapshot.docs.map((doc) => ({
          id: doc.id,
          group: doc.data(),
        }));
        console.log(tempGroups)
        setGroups(tempGroups);
        fetchKeywordsAggregate(tempGroups);
      });
  }, [user, fetchKeywordsAggregate]);

  const queryMovieApi = async (keyword) => {
    return axios(base_url + fetchUrl + keyword, {
      method: "GET",
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("imdb API call problem", error);
      });
  };

  const fetchMovies = useCallback(
    async (keywordIDs) => {
      var keywords = keywordIDs.split(",");
      keywords.forEach(async (keyword) => {
         var movieResultsFromKeyword;
        queryMovieApi(keyword).then((data) => {
          movieResultsFromKeyword = data.results;
          setMovies((movies) => [...movies, ...movieResultsFromKeyword]);
        });
      });
    },
    [fetchUrl, keywords, movies, queryMovieApi]
  );

  useEffect(() => {
    if (user) fetchGroups();
    // keywords && fetchMovies();

    const testFunction = firebase.functions().httpsCallable("doTest");
    testFunction().then((response) => setFunctionsTest(response.data));
    setFunctionsTest();
  }, [user, keywords]);

  return (
    <div className={styles.absolute_size_fixer}>
      {movies.map((movie, key) => (
        <TinderCard
          className={styles.swipe}
          key={key}
          preventSwipe={["up", "down"]}
        >
          <div
            className={styles.card}
            style={{
              backgroundImage: `url(${image_url + movie.poster_path})`,
            }}
          ></div>
        </TinderCard>
      ))}
    </div>
  );
}

export default MovieCards;
