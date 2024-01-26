import { getAveragePrice } from '../app/BookService';

jest.mock('../app/BookService');

describe('BookService', () => {
    it('should return the mocked price', () => {
        const mockedPrice = 20;
        (getAveragePrice as jest.Mock).mockImplementationOnce((title: string, country: string) => mockedPrice);

        const result = getAveragePrice('Book 1', 'US');

        expect(result).toBe(mockedPrice);
    });
});
