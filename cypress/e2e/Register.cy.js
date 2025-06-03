describe('SIGNETIC Feature -QA pharmacy.', () => {
  it('Find and book an appointment near you.', () => {
    cy.visit('https://feature.qa.signetic.com/service?lang=en');
    //cy.reload();

    // cy.wait(1000);
    cy.contains('span', 'Welcome To FEATURE-QA Pharmacy').should('be.visible');
    // cy.wait(1000);
    //Click the label using visible text
    cy.contains('label', 'API Covid Vaccine').click();
    // cy.wait(4000);
    //Locate Using button text
    cy.contains('button', 'Continue').click();
    // Select date using id for locator 

    cy.get('#birthYear').select('1998');

    cy.get('#birthDay').select('10');
    cy.get('#birthMonth').select('Mar');
    cy.contains('button', 'Continue').click();
    //Click on search API Vaccine Service

    // cy.contains('button', 'API Vaccine Service').click();
    // cy.get('#location').type('Kamaladi');
    cy.contains('button', 'Continue').click();

    // cy.wait(4000);
    // Click on refresh data from schedule appointment details
    cy.contains('span', 'Refresh Data').click();
    cy.scrollTo('bottom');
    cy.wait(5000);



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
cy.wait(5000);
    cy.scrollTo('bottom');

    //cy.contains('span','Continue to Eligibility and Screening page').click();
    cy.contains('span', 'Continue to Eligibility and Screening Page').click();


    //@. Eligibility and health screening 

    cy.contains('label', 'API eligibility question 1').click();

    //Screening questions
    cy.contains('p', 'API Screening question 1').should('be.visible');
    cy.contains('span', 'No').click();
    // cy.wait(4000);

    cy.get('label[for="fc561fe9-e025-ee11-9cbd-6045bd006239No"]').click();

    // cy.wait(4000);
    cy.scrollTo('bottom');

    // Self declaration criteria
    cy.get('#firstName').type('Sushma');
    cy.get('#lastName').type('Puri');
    // cy.get('svg').click();

    cy.get('#terms-conditions').check({ force: true });
    cy.contains('button', 'Continue').click();

    // cy.wait(4000);

    // 3. Personal Information
    //If you want to interact with the dropdown/select related to "Ethnicity"
    cy.get('#ethnicity').select("I'd prefer not to say");
    // cy.wait(4000);
    cy.get('#race').select("I'd prefer not to say");
    // cy.wait(4000);
    cy.get('#gender').select("Female");
    //cy.wait(4000);
    cy.get('#primaryLanguage').select("Arabic");
    //cy.wait(4000);
    cy.get('#mobileNo').type('9876543211');
    cy.get('#homePhoneNo').type('9876509478');
    //cy.wait(2000);
    cy.get('#email').type('test@gmail.com');
    //cy.wait(2000);
    cy.get('#confirmEmail').type('test@gmail.com');
    //cy.wait(2000);
    cy.get('#referredBy').type('TEsting team');
    //cy.wait(2000);
    cy.get('.manual-address-link').click();
    //cy.wait(4000);

    //Address 
    cy.get('#homeAddress').type('Nagarjun-07');
    //cy.wait(4000);
    cy.get('#aptUnit').type('testingggg');
    //cy.wait(4000);
    cy.get('#city').type('Nagarrjunnnn');
    //cy.wait(4000);
    cy.get('[data-qa="state"]').select('CA');
    cy.get('#county').select('627569c7-fccc-ec11-a7b5-6045bd00dbbc');
    //cy.wait(4000);
    // cy.wait(4000);
    cy.get('#zipCode').type('12345');


    // cy.wait(4000);
    cy.scrollTo('bottom');
    //Primary care physician information
    cy.get('#physicianName').type('Dr. Anna Sharma');
    //cy.wait(4000);
    cy.get('#physicianPhoneNumber').type('5847854785');
    //cy.wait(4000);
    cy.get('#physicianNPI').type('7894561236');
    //cy.wait(4000);
    cy.get('#physicianFaxNumber').type('5847854587');
    //cy.wait(4000);
    cy.get('#physicianAddress').type('Kamaladi');
    //cy.wait(4000);

    //Click on submit button
    cy.get('[data-qa="go-to-clinic-timing"]').click();
    cy.wait(4000);


    //cy.get('[data-qa="allow-merge-for-old-patient"] > .m-0x').click();
    // Step 4 
    //handling the popup
    cy.contains('span', 'Use the original address entered')
      .should('be.visible')
      .click();
    cy.wait(4000);


    cy.get('[data-qa="allow-merge-for-old-patient"] > .m-0x').click();
    cy.wait(4000);
    //4. Patient Information with no insurance
    // cy.contains('label', 'No Insurance').click();
    // cy.wait(2000);
    // cy.contains('a', 'Continue').click();
    // cy.wait(4000);

    //If you have insurance
    cy.get('#insuranceType').select('Commercial');
    cy.get('#company').select('Aetna');
    cy.get('#insurancePlanType').select('PPO');
    cy.get('#subscriberRelationship').select('Self');
    cy.get('#memberID').type('444785');

    //Upload Insurance Card

    //Card Front image 
    cy.get('input[data-qa="insurance-card-front"]')
      .attachFile('1Front.png', { force: true });
    cy.wait(4000);

    cy.get('input[data-qa="insurance-card-back"]')
      .attachFile('2Back.png', { force: true });
    cy.wait(4000);
    cy.contains('a', 'Continue').click();


    //Confirm your appointment details

    cy.contains('label', 'I have read and agree to the above terms and conditions.').click();
    cy.contains('label', 'I have read the CDC Vaccine Information Statement which explains the risks and benefits.').click();
    cy.contains('label', 'I certify that I am at least 18 years of age, or I am the legal guardian or parent of a patient who is under 18.').click();
    cy.get('label[for="c1b9e47b-257a-5cae-bc47-b2cdfe912432_c561e80b-2f2c-495c-ab6f-853a7f631240"]').click();
    // Signature part 

    // Step 1: Click to reveal the canvas
    cy.get('[data-qa="patient-info-signature-add"]')
      .should('be.visible')
      .click();

    // Step 2: Wait for the canvas to appear
    cy.get('canvas.signature-canvas', { timeout: 3000 })
      .should('be.visible')
      .then($canvas => {
        // Step 3: Inject JS to draw "Demo Signature" text on canvas
        cy.window().then(win => {
          const canvas = $canvas[0];
          const ctx = canvas.getContext('2d');


          // Optional: clear the canvas first
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Set font style (adjust as needed)
          ctx.font = '24px cursive';
          ctx.fillStyle = '#000';  // black text
          const text = 'Sushma Puri is Testing';
          // Draw your demo signature text at desired position
          ctx.fillText('Sushma Puri is Testing', 50, 50);
          cy.wait(4000);
          const textWidth = ctx.measureText(text).width;

          // Optionally add some styling or lines for realism
          ctx.beginPath();
          ctx.moveTo(10, 55);
          ctx.lineTo(50 + textWidth, 55);
          ctx.strokeStyle = '#000';
          ctx.stroke();
        });
      });

    cy.get('canvas.signature-canvas').click();

    cy.get('[data-qa="submit-appointment"]').click()
    cy.wait(15000);

    //Click on click button 
    //cy.get('.print-btn').click();
    // Click on book another visit
    cy.get('[data-qa="book-another-appt-btn"] > .m-0x').click();
    cy.wait(5000);




  });




})
