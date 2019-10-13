import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories = [
            { id: 1 ,name:"Moradia", description:"Pagamento de Contas da Casa"},
            { id: 2 ,name:"Lazer", description:"Cinema, Saúde, praia, etc"}
        ];
        return { categories };
    }
}