GRPC localhost:50051/match.MatchService/GetMatchRanking
{
  "roomName": "room1",
  "userId": 1
}

HTTP 200
jsonpath "$.userRankings[0].userId" == 1
