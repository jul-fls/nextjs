// pages/api/movies.js
import { OrmService } from "/services/OrmService";
import { HttpService } from "/services/HttpService";
import { MongoConfigService } from "/services/MongoConfigService";
export default async function handler(req, res) {
    
    switch(req.method) {
        case "GET":
            let movies = await OrmService.getItems(MongoConfigService.collections.movies);
            if (movies.length > 0) {
                HttpService.return_http_status_code_and_data(res, 200, movies);
            }
            break;
        case "POST":
            let movie = req.body;
            let result = await OrmService.createItem(MongoConfigService.collections.movies, movie);
            if (result.insertedId) {
                HttpService.return_http_status_code_and_data(res, 201, result.insertedId);
            }else{
                HttpService.return_http_status_code_and_data(res, 500, "Insert Failed");
            }
            break;
        default:
            HttpService.return_http_status_code_and_data(res, 405, "Method Not Allowed");
            break;
    }
}