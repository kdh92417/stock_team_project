class SearchCtrl {
  constructor(service, view) {
    this.service = service;
    this.view = view;
    this.view.getSearchCompanyName(this.getCompanyName);
  }

  getCompanyName = () => {
    this.company = {};
    const save = this.company;
    const getName = this.view.searchInput.value;

    save.name = getName;
    this.service.sendSearchCompany(this.company);
  }

}

export default SearchCtrl;