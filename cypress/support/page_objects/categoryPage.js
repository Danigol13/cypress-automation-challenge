class CategoryPage {
  elements = {
    womenDressLink: () => cy.get('a[href="/category_products/1"]'),
    menTshirtsLink: () => cy.get('a[href="/category_products/3"]'),
    productCards: () => cy.get('.features_items .single-products'),
    categoryTitle: () => cy.get('h2.title.text-center'),
  };

  selectWomenDress() {
    this.elements.womenDressLink().click({ force: true });
  }

  selectMenTshirts() {
    this.elements.menTshirtsLink().click({ force: true });
  }

  assertCategoryProductsVisible(genderText) {
    this.elements.productCards().should('have.length.greaterThan', 0);
    this.elements.categoryTitle().invoke('text').then((text) => {
      expect(text.toUpperCase()).to.include(genderText.toUpperCase());
    });
  }
}

export default new CategoryPage();
