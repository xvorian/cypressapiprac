/// <reference types="Cypress"/>

const userprofile = require('../../fixtures/userprofile.json')

describe('Post Put Example', () => {
    it('Get Post Put Example', () => {
        let name='John Doe'
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
            }).then((res)=>{
                expect(res.status).to.eq(201)
            }).then((res)=>{
                idcreated = res.body.id
                cy.log('Id Created:'+idcreated)

                cy.request({
                    method: 'PUT',
                    url: sitevar.siteurl+'/'+idcreated,
                    headers:{
                        'authorization':sitevar.accessToken
                    },
                    body: {
                        "name": 'Jane Doe',
                        "email": email,
                        "gender": userprofile.gender,
                        "status": userprofile.status
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('name','Jane Doe')
                })
            })
        })
    })
})
