/// <reference types="Cypress"/>

const userprofile = require('../../fixtures/userprofile.json')

describe('Delete User', () => {
    it('Delete a User after Creation', () => {
        let name = 'John Doe'
        let randomPattern = Math.floor(Math.random() * (100 - 0 + 1) + 1)
        let email = 'john.doe.' + randomPattern + '@john.doe.com'
        let idcreated = 0

        cy.fixture('sitevars').then((sitevar) => {
            cy.request({
                method: 'POST',
                url: sitevar.siteurl,
                headers: {
                    'authorization': sitevar.accessToken
                },
                body: {
                    "name": name,
                    "email": email,
                    "gender": userprofile.gender,
                    "status": userprofile.status
                }
            }).then((res) => {
                expect(res.status).to.eq(201)
            }).then((res) => {
                idcreated = res.body.id
                cy.request({
                    method: 'DELETE',
                    url: sitevar.siteurl + '/' + idcreated,
                    headers: {
                        'authorization': sitevar.accessToken
                    }
                }).then((res) => {
                    expect(res.status).to.eq(204)
                })
            })

        })
    })
})