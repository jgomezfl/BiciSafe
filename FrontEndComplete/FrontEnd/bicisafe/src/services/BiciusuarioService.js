import http from "../http-common";

class BiciusuarioService{
    getAll(){
        return http.get("/all");
    }
}

export default new BiciusuarioService();