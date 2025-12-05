GRPC localhost:50051/match.MatchService/GetMatchStatus
{
  "roomName": "room1",
  "userId": 1
}

HTTP 200
jsonpath "$.currentRound" == 1
jsonpath "$.question.statement" == "2+2"
