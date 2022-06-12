//Estrutura de um objeto pontos (points)
export class Points {
    public _id!: string;

    //ID do utilizador (user) que detém os pontos
    public userId!: string;

    //Quantidade de pontos
    public amount!: number;
    public bookId!: string;
}