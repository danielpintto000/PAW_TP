//Estrutura de um objeto livro (book)
export class Book {
    //ID do livro (book)
    public _id!: string;

    //Nome (name) do livro (book)
    public name!: string;

    //Descrição (description) do livro (book)
    public description!: string;

    //Autor (author) do livro (book)
    public author!: string;

    //ISBN do livro (book)
    public isbn!: number;

    //Capa (cover) do livro (book)
    public cover!: string;

    //Preço (price) do livro (book)
    public price!: number;

    public file!: any;

    //Stock de um livro (book)
    public stock!: number;

    //Estado de um livro (book)
    public state!: string;
}