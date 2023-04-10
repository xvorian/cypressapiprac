/// <reference types="Cypress"/>

describe("Get All users and parse through details",()=>{
    it('User Handling',()=>{
        cy.fixture('sitevars').then((sitevar)=>{
            cy.request({
                method:'GET',
                url: sitevar.siteurl
            }).then((res) =>{
                let users = res.body
                return users
            }).then((users)=>{
                for(const user of users){
                    cy.request({
                        method:'GET',
                        url:sitevar.siteurl+'/'+user.id
                    }).then((res)=>{
                        expect(res.status).to.eq(200)
                        expect(res.body).has.property('name', user.name)
                        expect(res.body).has.property('email',user.email)
                    })
                }
            })
        })
    })
}) // end desc
