import { ray } from "node-ray";

type Book = {
    title: string;
    pages: number;
    author: string;
}

export class LibaryManager {
    private books: Book[] = [];

    public addBook(book: Book): void {
        if(this.books.find(b => b.title === book.title))
            throw new Error('Book already exists');

        this.books.push(book);
    }

    public removeBook(title: string): void {
        this.books = this.books.filter(b => b.title !== title);
    }

    public findBookByTitle(title: string): Book {
        let b = this.books.find(b => b.title === title);
        if(!b)
            throw new Error('Book not found');

        return b;
    }

    public findBookByAuthor(author: string): Book[] {
        let b = this.books.filter(b => b.author === author);
        if(b.length === 0)
            throw new Error('This author dont write book')
        return b;
    }

    public getAllBooks(): Book[] {
        return this.books;
    }

    public retrieveAuthors(): string[] {
        let authors: string[] = [];

        this.books.forEach(function (book) {
            if(!authors.includes(book.author))
                authors.push(book.author);
        });

        return authors;
    }

    public removeBookByAuthor(author: string): void {
        this.books = this.books.filter(b => b.author !== author);
    }

    public updateTitleBook(oldTitle: string, newTitle: string): void {
        this.books.map(function (book) {
            if(book.title === oldTitle)
                return book.title = newTitle
        })
    }
}
