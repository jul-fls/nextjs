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
                HttpService.return_http_status_code_and_data(res, 200, "Put Success");
            }
            break;
        case "PATCH":
            const updates = req.body;
            let updateSuccess = false;
        
            for (const [key, value] of Object.entries(updates)) {
                const result = await OrmService.updateKeyValueItem(MongoConfigService.collections.movies, req.query.idMovie, key, value);
                
                if (result.matchedCount === 0) {
                    HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                    return;
                } else {
                    updateSuccess = true;
                }
            }
        
            if (updateSuccess) {
                HttpService.return_http_status_code_and_data(res, 200, "Patch Success");
            } else {
                HttpService.return_http_status_code_and_data(res, 500, "Patch Failed");
            }
            break;
        case "DELETE":
            // const result3 = await OrmService.deleteItem(MongoConfigService.collections.movies, req.query.idMovie); // This is the original line
            // make a fake line to test the code
            const result3 = {deletedCount: 1};
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