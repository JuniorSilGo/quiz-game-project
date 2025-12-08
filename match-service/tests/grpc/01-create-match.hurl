GRPC localhost:50051/match.MatchService/CreateMatch
{
  "roomName": "room1",
  "userId": 1,
  "userPlayersIds": [1,2,3],
  "difficulty": "easy",
  "topic": "math",
  "questions": [
    {
      "statement": "2+2",
      "alternatives": { "a": "3", "b": "4" },
      "correctAnswer": "b"
    },
    {
      "statement": "3+5",
      "alternatives": { "a": "9", "b": "8" },
      "correctAnswer": "b"
    }
  ]
}

HTTP 200
jsonpath "$.currentRound" == 1
jsonpath "$.difficulty" == "easy"
jsonpath "$.totalRounds" == 2
