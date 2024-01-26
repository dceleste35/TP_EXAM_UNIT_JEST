import { LibaryManager } from '../app/Libary';

describe('LibaryManager', () => {
    let libaryManager: LibaryManager;

    beforeEach(() => {
        libaryManager = new LibaryManager();
        libaryManager.addBook({title: 'Book 1', pages: 100, author: 'Author 1', borrowed: 'available'});
        libaryManager.addBook({title: 'Book 2', pages: 150, author: 'Author 2', borrowed: 'available'});
    });

    it('can add a book', () => {
        libaryManager.addBook({title: 'Book 3', pages: 200, author: 'Author 3'});

        expect(libaryManager.getAllBooks().length).toBe(3);
    });

    it('cannot add a book twice', () => {
        const book = () => libaryManager.addBook({title: 'Book 1', pages: 100, author: 'Author 1'});

        expect(book).toThrow('Book already exists');
    });

    it('can remove a book', () => {
        libaryManager.removeBook('Book 1');

        expect(libaryManager.getAllBooks().length).toBe(1);
    });

    it('can find a book by title', () => {
        const book = libaryManager.findBookByTitle('Book 1');

        expect(book.title).toBe('Book 1');
    });

    it('cannot find a book by title', () => {
        const book = () => libaryManager.findBookByTitle('Book 3');

        expect(book).toThrow('Book not found');
    });

    it('can find a book by author', () => {
        const books = libaryManager.findBookByAuthor('Author 1');

        expect(books.length).toBe(1);
    });

    it('cannot find a book by author', () => {
        const books = () => libaryManager.findBookByAuthor('Author 3');

        expect(books).toThrow('This author dont write book');
    });

    it('can retrieve all authors', () => {
        const authors = libaryManager.retrieveAuthors();

        expect(authors.length).toBe(2);
    });

    it('can retrieve 2 authors if 2 books have the same author', () => {
        libaryManager.addBook({title: 'Book 3', pages: 200, author: 'Author 2'});
        const authors = libaryManager.retrieveAuthors();

        expect(authors.length).toBe(2);
    });

    it('can delete all books by author', () => {
        libaryManager.addBook({title: 'Book 3', pages: 200, author: 'Author 1'});
        libaryManager.removeBookByAuthor('Author 1');

        expect(libaryManager.getAllBooks().length).toBe(1);
    });

    it('can update title of an existing book', () => {
        libaryManager.updateTitleBook('Book 1', 'NewTitle');

        expect(libaryManager.findBookByTitle('NewTitle').author).toBe('Author 1');
    })

    it('can borrow a book', () => {
        libaryManager.borrowBook('Book 1');

        expect(libaryManager.findBookByTitle('Book 1').borrowed).toBe('not available');
    });

    it('cannot borrow a book because book doesnt exist', () => {
        const book = () => libaryManager.borrowBook('Book 3');

        expect(book).toThrow('Book not found');
    });

    it('cannot borrow a book because book already borrowed', () => {
        libaryManager.borrowBook('Book 1');
        const book = () => libaryManager.borrowBook('Book 1');

        expect(book).toThrow('Book already borrowed');
    });

    it('can return a book', () => {
        libaryManager.borrowBook('Book 1');
        libaryManager.returnBook('Book 1');

        expect(libaryManager.findBookByTitle('Book 1').borrowed).toBe('available');
    });

    it('cannot return a book because book doesnt exist', () => {
        const book = () => libaryManager.returnBook('Book 3');

        expect(book).toThrow('Book not found');
    });

    it('cannot return a book because book already available', () => {
        const book = () => libaryManager.returnBook('Book 1');

        expect(book).toThrow('Book already available');
    });

    it('can rate a book when return book', () => {
        libaryManager.borrowBook('Book 1');
        libaryManager.returnBook('Book 1', 5);

        expect(libaryManager.findBookByTitle('Book 1').rating).toBe(5);
    })

    it('can get avg for one book', () => {
        libaryManager.borrowBook('Book 1');
        libaryManager.returnBook('Book 1', 5);

        libaryManager.borrowBook('Book 1');
        libaryManager.returnBook('Book 1', 10);

        libaryManager.borrowBook('Book 1');
        libaryManager.returnBook('Book 1', 9);

        expect(libaryManager.findBookByTitle('Book 1').rating).toBe(8);
    })

    it('can get the most popular book', () => {
        libaryManager.borrowBook('Book 1');
        libaryManager.returnBook('Book 1', 5);

        libaryManager.borrowBook('Book 1');
        libaryManager.returnBook('Book 1', 10);

        libaryManager.borrowBook('Book 1');
        libaryManager.returnBook('Book 1', 10);

        libaryManager.borrowBook('Book 2');
        libaryManager.returnBook('Book 2', 8);

        libaryManager.borrowBook('Book 2');
        libaryManager.returnBook('Book 2', 7);

        expect(libaryManager.getMostPopularBook().title).toBe('Book 1');
    })

});
