import { OrmService } from "/services/OrmService";
import { HttpService } from "/services/HttpService";
import { MongoConfigService } from "/services/MongoConfigService";

export default async function handler(req, res) {
    let movie = await OrmService.getItem(MongoConfigService.collections.movies, req.query.idMovie);
    switch(req.method) {
        case "GET":
            if (!movie) {
                HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                return;
            }else{
                const comments = await OrmService.getItems(MongoConfigService.collections.comments, {movie_id: req.query.idMovie});
                if (comments.length > 0) {
                    HttpService.return_http_status_code_and_data(res, 200, comments);
                }else{
                    HttpService.return_http_status_code_and_data(res, 404, "Comments Not Found");
                }
            }
            break;
        case "POST":
            const comment = req.body;
            comment.movie_id = req.query.idMovie;
            let createdItem = await OrmService.createItem(MongoConfigService.collections.comments, comment);
            if (!movie) {
                HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                return;
            }else{
                if (createdItem.insertedId) {
                    movie.num_mflix_comments++;
                    await OrmService.updateItem(MongoConfigService.collections.movies, req.query.idMovie, movie);

                    HttpService.return_http_status_code_and_data(res, 201, createdItem.insertedId);
                }else{
                    HttpService.return_http_status_code_and_data(res, 500, "Insert Failed");
                }
            }
            break;
        default:
            HttpService.return_http_status_code_and_data(res, 405, "Method Not Allowed");
            break;
    }
}