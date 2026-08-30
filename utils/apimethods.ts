import { APIRequestContext } from "@playwright/test";




class petAPI{


constructor(private request:APIRequestContext){
}

async createPet(petData:object){
    return await this.request.post('/pet',{
        data:petData
    })
}

async getPet(){
    
}
async updatePet(){
    
}

async deletePet(){
    
}






}