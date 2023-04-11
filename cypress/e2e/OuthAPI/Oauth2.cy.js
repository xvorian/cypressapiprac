/// <reference types="Cypress"/>

/**
 *
 * http://coop.apps.symfonycasts.com/token
    Client ID:cypressAppwoodopal
    Client Secret: 3551d1557cd973d23a0545567c9b2285
    Redirect URI: www.woodopalrealty.com

    */
describe('Oauth feature APIs', () => {
    let access_token = ''
    let user_id = ''

    // This would run once only, to generate Token everytime, we have to use beforeEach
    before('Generate the token', () => {
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/token',
            form: true, body: {
                "client_id": "cypressAppwoodopal",
                "client_secret": "3551d1557cd973d23a0545567c9b2285",
                "grant_type": "client_credentials"
            }
        }).then((res) => {
            access_token = res.body.access_token
            cy.log(access_token)
            cy.request({
                method: 'GET',
                url: 'http://coop.apps.symfonycasts.com/api/me',
                headers: {
                    'authorization': 'Bearer ' + access_token
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
                cy.log(res.body.id)
                user_id = res.body.id
            })
        })
    })

    it('Unlock the Barn', () => {
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/api/' + user_id + '/barn-unlock',
            headers: {
                'authorization': 'Bearer ' + access_token
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).has.property("success", true)
        })
    })

    it('Put the Toilet Seat Down', () => {
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/api/' + user_id + '/toiletseat-down',
            headers: {
                'authorization': 'Bearer ' + access_token
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).has.property("success", true)
        })
    })

    it('Feed Your Chickens', () => {
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/api/' + user_id + '/chickens-feed',
            headers: {
                'authorization': 'Bearer ' + access_token
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).has.property("success", true)
        })
    })

    it('Collect Eggs from Your Chickens', () => {
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/api/' + user_id + '/eggs-collect',
            headers: {
                'authorization': 'Bearer ' + access_token
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).has.property("success", true)
        })
    })

    it('Get the Number of Eggs Collected Today', () => {
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/api/' + user_id + '/eggs-count',
            headers: {
                'authorization': 'Bearer ' + access_token
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).has.property("success", true)
        })
    })
})