GRPC localhost:50051/match.MatchService/Answer
{
  "roomName": "room1",
  "userId": 1,
  "answer": "b"
}

HTTP 200
jsonpath "$.isRight" == true
