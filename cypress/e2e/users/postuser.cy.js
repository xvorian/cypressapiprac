/// <reference types="Cypress"/>

const userprofile = require('../../fixtures/userprofile.json')

describe('Post User', () => {
    let name = "john doe"
    let email = ''

    it('Sending Post Request', () => {

        let randomPattern = Math.floor(Math.random() * (100 - 0 + 1) + 1)
        email = 'john.doe.' + randomPattern + '@john.doe.com'
        let idcreated=0

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
                expect(res.body).has.property('email', email)
                expect(res.body).has.property('gender', userprofile.gender)
                expect(res.body).has.property('status', userprofile.status)
            }).then((res) =>{
                idcreated = res.body.id
                cy.log('Id created:'+idcreated)

                cy.request({
                    method:'GET',
                    url:sitevar.siteurl+'/'+idcreated,
                    headers: {
                        'authorization': sitevar.accessToken
                   }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('id',idcreated)
                })
            }) 
        })
    })
})