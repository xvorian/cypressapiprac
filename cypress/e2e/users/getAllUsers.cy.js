/// <reference types ="Cypress"/>


describe('Get API User', () => {
    it('Get All Users', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'authorization': "Bearer 68c077b27205db0b2c7513611483f25ddc84331397ecf2e0f9f14e4035a90561"
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
        })
    })
})




