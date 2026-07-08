class CategoryPage {
  selectWomenDress() {
    cy.get('a[href="/category_products/1"]').click({ force: true });
  }

  selectMenTshirts() {
    cy.get('a[href="/category_products/3"]').click({ force: true });
  }

  assertCategoryProductsVisible(genderText) {
    cy.get('.features_items .single-products').should('have.length.greaterThan', 0);
    cy.get('h2.title.text-center').invoke('text').then((text) => {
      expect(text.toUpperCase()).to.include(genderText.toUpperCase());
    });
  }
}

export default new CategoryPage();
