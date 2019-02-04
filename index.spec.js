const request = require('supertest');
const server = require('./index')
describe('Test the root path', () => {
    test('GET request and respond with Status 200', (done) => {
        request(server)
        .get('/games')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
    test('GET request and respond with JSON', (done) => {
        request(server)
        .get('/games')
        .then((response) => {
            expect(response.type).toMatch(/json/i)
            done();
        });
    });
    test('Add entry and Status 201', (done) => {

        const body =         {  
            title: 'Gears of War',
            genre: 'Third-person shooter',
            releaseYear: 2006
        };
        request(server)
        
        .post('/games')
        .send(body)
        .then((response) => {
            expect(response.statusCode).toBe(201);
            expect(response.type).toMatch(/json/i)
            done();
        });
    });
    test('Submit empty body and return status 500', (done) => {
        request(server)
        .post('/games',{})
        .then((response) => {
            expect(response.statusCode).toBe(500);
            done();
        });
    });
    test('Submit empty strings and return status 422', (done) => {
        request(server)
        .post('/games')
        .send({  
            title: 'Pacman', 
            genre: 'Arcade',
            releaseYear: ""
        })
        .then((response) => {
            expect(response.statusCode).toBe(422);
            done();
        });
    });
    test('Submit missing keys and return status 422', (done) => {
        request(server)
        .post('/games')
        .send({  
            genre: 'Arcade',
            releaseYear: "1980"
        })
        .then((response) => {
            expect(response.statusCode).toBe(422);
            done();
        });
    });
    test('Delete entry and return Status 200', (done) => {
        request(server)
        .delete('/games/1')
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toMatch(/json/i)
            expect(response.body[0].id).not.toEqual(1)
            done();
        });
    });
    test('Return status 404 because the entry does not exist', (done) => {
        request(server)
        .delete('/games/1000')
        .then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});