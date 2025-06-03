describe('SIGNETIC Feature -QA pharmacy UI Testing.', () => {
  let userData;
  const env = 'qa'
  const qaBaseUrl = Cypress.env(env).baseUrl;
  beforeEach(() => {
    cy.fixture('userData').then((data) => {
      userData = data;
    });
  });

  it('Find and book an appointment near you.', () => {
    cy.intercept('GET', '/service').as('getservice');
    cy.visit(`${qaBaseUrl}/service`);
    //response code add
    cy.wait('@getservice').then((interception) => {
      expect(interception.response.statusCode).to.eq(200); // Assert status code is 200
    });
    //Page 1 : Services
    cy.contains('Welcome To FEATURE-QA Pharmacy');
    cy.get('.nlanding-page__brand-title__placeholder').should('be.visible');
    cy.contains('API Covid Vaccine').click();
    cy.contains('Continue').click();

    //Page 2: Prescreening page
    cy.url().should('include', '/prescreening')
    cy.get('#birthYear').select(userData.birthYear),
      cy.get('#birthDay').select(userData.birthDay),
      cy.get('#birthMonth').select(userData.birthMonth)
    cy.contains('Continue').click();
    //Location Page
    cy.contains('Continue').click();
    //Clinic and timing page
    cy.contains('Refresh Data').click();
    cy.scrollTo('bottom');
    // cy.get('.react-datepicker__day--025').click();
    // cy.get('span.text-demibold').contains("05:25 pm").click();
// Step 1: Pick a random enabled date and click it
cy.get('div.react-datepicker__day')
  .filter((_, el) => el.getAttribute('aria-disabled') !== 'true')
  .then((enabledDates) => {
    const count = enabledDates.length;
    cy.log(`Found ${count} enabled dates`);

    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      cy.wrap(enabledDates[randomIndex]).click();

      // Step 2: After clicking the date, check the Continue button status
      cy.get('button[data-qa="btn-continue"]').then(($btn) => {
        if ($btn.is(':disabled')) {
          cy.log('Continue button is disabled, selecting enabled time slot');

          // Step 3: Select an enabled time slot
          cy.get('span.select-time__item:not(.select-time__item--disabled)')
            .last()
            .click();
        } else {
          cy.log('Continue button is enabled');
        }
      });
    } else {
      cy.log('No enabled dates found');
    }
  });
//Above case checks the date is enabled and disabled.
    cy.scrollTo('bottom');
    cy.get('[data-qa="btn-continue"]').click();

    //Page 2: Eligibility and health Screening.
    cy.get('[data-qa="1-eligibility"]').check({ force: true })
    cy.get('[data-qa="2-eligibility"]').check({ force: true })
    cy.get('[data-qa="0-screening-no"]').check({ force: true })
    cy.get('[data-qa="1-screening-no"]').check({ force: true })
    cy.clock(); // Freeze the clock
    cy.tick(5000);
    cy.scrollTo('bottom');
    cy.get('#firstName').type(userData.firstName);
    cy.get('#lastName').type(userData.lastName);
    cy.get('#terms-conditions').check({ force: true });
    cy.contains('button', 'Continue').click();

    //Page 3: Patient Information page

    cy.get('#ethnicity').select(userData.ethnicity);
    cy.get('#race').select(userData.race);
    cy.get('#gender').select(userData.gender);
    cy.get('#primaryLanguage').select(userData.primaryLanguage);
    cy.get('#mobileNo').type(userData.mobileNo);
    cy.get('#homePhoneNo').type(userData.homePhoneNo);
    cy.get('#email').type(userData.email);
    cy.get('#confirmEmail').type(userData.confirmEmail);
    cy.get('#referredBy').type(userData.referredBy);
    cy.get('.manual-address-link').click();
    cy.get('#homeAddress').type(userData.homeAddress);
    cy.get('#aptUnit').type(userData.aptUnit);
    cy.get('#city').type(userData.city);
    cy.get('[data-qa="state"]').select(userData.state);
    cy.get('#county').select(userData.country);
    cy.get('#zipCode').type(userData.zipCode);
    cy.scrollTo('bottom');
    cy.get('#physicianName').type(userData.physicianName);
    cy.get('#physicianPhoneNumber').type(userData.physicianPhoneNumber);
    cy.get('#physicianNPI').type(userData.physicianNPI);
    cy.get('#physicianFaxNumber').type(userData.physicianFaxNumber);
    cy.get('#physicianAddress').type(userData.physicianAddress);
    cy.clock();
    cy.tick(5000);
    cy.get('[data-qa="go-to-clinic-timing"]').click();

    //Page 4: Payment information Page
    cy.contains('button', 'Use the original address entered').should('be.visible').click();

    cy.handleConfirmationModal();

    cy.get('[data-qa="allow-merge-for-old-patient"] > .m-0x').click();
    cy.get('#insuranceType').select(userData.insuranceType);
    cy.get('#company').select(userData.company);
    cy.get('#insurancePlanType').select(userData.insurancePlanType);
    cy.get('#subscriberRelationship').select(userData.subscriberRelationship);
    cy.get('#otherInsuranceCompany').type(userData.insuranceName);
    cy.get('#memberID').type(userData.memberID);

    cy.get('input[data-qa="insurance-card-front"]')
      .attachFile('1Front.png', { force: true });

    cy.get('input[data-qa="insurance-card-back"]')
      .attachFile('2Back.png', { force: true });

    cy.contains('Continue').click();

    cy.get('[data-qa^="terms-condition-"]').check({ force: true })
    cy.get('[data-qa="guardian-first-name"]').type(userData.firstName)
    cy.get('[data-qa="guardian-last-name"]').type(userData.lastName)

    cy.get('[data-qa="patient-info-signature-add"]').should('be.visible').click();

    cy.get('canvas.signature-canvas').click();
    cy.get('[data-qa="submit-appointment"]').click();

    // Wait for the network request to complete
    cy.intercept('POST', 'https://feature-qa-api.azurewebsites.net/api/v2/appointment')
      .as('appointment')
    cy.wait('@appointment')

    cy.contains(userData.email)
    //cy.get('[data-qa="book-another-appt-btn"] > .m-0x').should('be.visible').click();  
  });
});
