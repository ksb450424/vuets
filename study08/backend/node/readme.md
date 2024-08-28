## Node Express Restful API Project Endpoints

| Method | URL                                      | Parameters         |
|--------|------------------------------------------|--------------------|
| GET    | /board/boards                            |                    |
| GET    | /board/1                                 | no                 |
| POST   | /board/write                             | Board              |
| PUT    | /board/edit/1                            | Board              |
| DELETE | /board/delete/1                          | no                 |
| GET    | /qna/qnas                                |                    |
| GET    | /qna/1                                   | qno                |
| POST   | /qna/write                               | Qna                |
| GET    | /qna/1/answer                            | qno, Qna           |
| POST   | /qna/edit/1                              | qno, Qna           |
| POST   | /qna/delete                              | Qna                |
| GET    | /dataroom/datas                          |                    |
| GET    | /dataroom/1                              | dno                |
| POST   | /dataroom/write                          | Dataroom           |
| PUT    | /dataroom/edit/1                         | dno, DataroomDTO   |
| DELETE | /dataroom/delete/1                       | dno                |
| GET    | /product/products                        |                    |
| GET    | /product/1                               | pno                |
| POST   | /product/write                           | Product            |
| PUT    | /product/edit/1                          | pno, Product       |
| DELETE | /product/delete                          | pno                |
| GET    | /member/members                          |                    |
| GET    | /member/alice                            | id                 |
| POST   | /member/register                         | Member             |
| PUT    | /member/alice                            | id, Member         |
| DELETE | /member/alice                            | id                 |
| POST   | /member/login                            | Member             |
| POST   | /member/logout                           |                    |
| POST   | /sendEmail                               |                    |