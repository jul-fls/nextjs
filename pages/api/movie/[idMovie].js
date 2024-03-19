import { OrmService } from "/services/OrmService";
import { HttpService } from "/services/HttpService";
import { MongoConfigService } from "/services/MongoConfigService";

export default async function handler(req, res) {
    const movie = await OrmService.getItem(MongoConfigService.collections.movies, req.query.idMovie);
    switch(req.method) {
        case "GET":
            if (!movie) {
                HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                return;
            }else{
                HttpService.return_http_status_code_and_data(res, 200, movie);
            }
            break;
        case "PUT":
            const movie_to_put = req.body;
            const result = await OrmService.updateItem(MongoConfigService.collections.movies, req.query.idMovie, movie_to_put);
            if (result.matchedCount === 0) {
                HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                return;
            }else{
                HttpService.return_http_status_code_and_data(res, 200, "Update Success");
            }
            break;
        case "PATCH":
            const movie_to_patch = req.body;
            const result2 = await OrmService.updateItem(MongoConfigService.collections.movies, req.query.idMovie, movie_to_patch);
            if (result2.matchedCount === 0) {
                HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                return;
            }else{
                HttpService.return_http_status_code_and_data(res, 200, "Update Success");
            }
            break;
        case "DELETE":
            const result3 = await OrmService.deleteItem(MongoConfigService.collections.movies, req.query.idMovie);
            if (result3.deletedCount === 0) {
                HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                return;
            }else{
                HttpService.return_http_status_code_and_data(res, 200, "Delete Success");
            }
            break;
        default:
            HttpService.return_http_status_code_and_data(res, 405, "Method Not Allowed");
            break;
    }
}