import { ray } from "node-ray";

type Book = {
    title: string;
    pages: number;
    author: string;
    borrowed?: string;
    rating?: number;
}

type Rating = {
    title: string;
    rating: number;
}

export class LibaryManager {
    private books: Book[] = [];
    private ratings: Rating[] = [];

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

    public borrowBook(title: string): void {
        let book = this.books.find(b => b.title === title);
        if(!book)
            throw new Error('Book not found');

        if(book.borrowed === 'not available')
            throw new Error('Book already borrowed');

        this.books.map(function (book) {
            if(book.title === title)
                return book.borrowed = 'not available'
        })
    }

    public returnBook(title: string, rating?: number): void {
        let book = this.books.find(b => b.title === title);
        if(!book)
            throw new Error('Book not found');

        if(book.borrowed === 'available')
            throw new Error('Book already available');

        if(rating) {
            this.ratings.push({title: title, rating: rating})
            this.setRating(title)
        }

        this.books.map(function (book) {
            if(book.title === title)
                return book.borrowed = 'available'
        })
    }

    public getMostPopularBook(): Book {
        let mostPopular = this.books[0]
        this.books.forEach(function (book) {
                if(book.rating)
                    if(mostPopular.rating) {
                        if(book.rating > mostPopular.rating)
                            mostPopular = book
                    } else {
                        mostPopular = book
                    }
        })

        return mostPopular
    }

    private setRating(title: string): void {
        let rating = this.ratings.filter(r => r.title === title);
        let sum = 0;

        rating.forEach(function (r) {
            sum += r.rating;
        })

        let avg = sum / rating.length;

        this.books.map(function (book) {
            if(book.title === title)
                return book.rating = avg
        })
    }


}
