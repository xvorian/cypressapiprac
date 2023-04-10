/// <reference types="Cypress"/>

describe("All Countries Gets", () => {
    let region = 'Asia'
    it('Get All Countries in Region', () => {
        cy.fixture('sitevars').then((sitevar) => {

            cy.request({
                method: 'GET',
                url: sitevar.rest_country + 'region/' + region + '?fields=name'
            }).then((resp) => {
                let name = resp.body[0].name.common

                cy.request({
                    method: 'GET',
                    url: sitevar.rest_country + 'name/' + name + '?fullText=true'
                }).then((resp) => {
                    expect(resp.body[0].name.official).to.eq('Republic of Kazakhstan')
                    cy.log(JSON.stringify(resp.body[0].name))
                })
            })
        })
    })

// Parsing through the loop and verifying the property
    it('Iterate through the countries', () => {
        cy.fixture('sitevars').then((sitevar) => {
            cy.request({
                method: 'GET',
                url: sitevar.rest_country + 'region/' + region + '?fields=name'
            }).then((resp) => {
                let countries = resp.body
                return countries
            }).then((location)=>{
                for (const element of location) {
                    cy.log(element.name.common)
                    cy.request({
                        method: 'GET',
                        url: sitevar.rest_country + 'name/' + element.name.common + '?fullText=true'
                    }).then((resp) => {
                        cy.log(JSON.stringify(resp.body[0].name.official))
                    })
                }
            })

        })
    })
})