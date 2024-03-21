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
                const idComment = req.query.idComment;
                if (idComment) {
                    const comment = await OrmService.getItem(MongoConfigService.collections.comments, idComment);
                    if (!comment) {
                        HttpService.return_http_status_code_and_data(res, 404, "Comment Not Found");
                    }else {
                        HttpService.return_http_status_code_and_data(res, 200, comment);
                    }
                }
            }
            break;
        case "PUT":
            if (!movie) {
                HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                return;
            }else{
                const comment = req.body;
                const comment_to_put = await OrmService.updateItem(MongoConfigService.collections.comments, req.query.idComment, comment);
                if (comment_to_put.matchedCount === 0) {
                    HttpService.return_http_status_code_and_data(res, 404, "Comment Not Found");
                }else if(comment_to_put.modifiedCount === 0){
                    HttpService.return_http_status_code_and_data(res, 500, "Put Failed");
                }else{
                    HttpService.return_http_status_code_and_data(res, 200, "Put Success");
                }
            }
            break;
        case "PATCH":
            const updates = req.body;
            let updateSuccess = false;
        
            for (const [key, value] of Object.entries(updates)) {
                const result = await OrmService.updateKeyValueItem(MongoConfigService.collections.comments, req.query.idComment, key, value);
                
                if (result.matchedCount === 0) {
                    HttpService.return_http_status_code_and_data(res, 404, "Comment Not Found");
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
            if (!movie) {
                HttpService.return_http_status_code_and_data(res, 404, "Movie Not Found");
                return;
            }else{
                const result3 = await OrmService.deleteItem(MongoConfigService.collections.comments, req.query.idComment);
                if (result3.deletedCount === 0) {
                    HttpService.return_http_status_code_and_data(res, 404, "Comment Not Found");
                }else{
                    HttpService.return_http_status_code_and_data(res, 200, "Delete Success");
                }
            }
            break;
        default:
            HttpService.return_http_status_code_and_data(res, 405, "Method Not Allowed");
            break;
        }
    }
