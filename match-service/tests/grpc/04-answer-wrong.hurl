GRPC localhost:50051/match.MatchService/Answer
{
  "roomName": "room1",
  "userId": 2,
  "answer": "a"
}

HTTP 200
jsonpath "$.isRight" == false
