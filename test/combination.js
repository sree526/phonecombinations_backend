var expect  = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
chai.use(chaiHttp);
describe("Testing the combinations API", function() {
    it("returns status 201", async function() {
        let res = await chai.request(server)
            .post('/combinations/0')
            .send({phonenumber:'1231231231'});
        expect(res).to.have.status(201);
        expect(res.body.combinations.length).to.equal(10);
        expect(res.body.totalCombinations).to.equal(1093);
    });

});




