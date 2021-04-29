class PortfolioView {
  constructor(api) {
    this.api = api;
    this.portfolio = {};
    this.title = document.getElementById("title");
    this.stockInfo = [];
    this.content = $('#summernote').summernote('code');
    this.submitBtn = document.querySelector(".submit-portfolio");
  }

  submitPortfolio() {
    this.submitBtn.addEventListener("click", event => {
      event.preventDefault();
      this.saveContent();

    })
  }

  saveContent() {
    let summernoteContent = $($("#summernote").summernote("code")).text()  
    console.log("summernoteContent : " + summernoteContent);
    this.getPortfolioInfo(summernoteContent);
  }

  getPortfolioInfo(content) {
    let stockName = document.querySelectorAll(".stock-name");
    let stockCount = document.querySelectorAll(".stock-count");
    let stockAmount = document.querySelectorAll(".stock-amount");
    for (let i = 0; i < stockName.length; i++) {
      this.stockInfo.push({ "stock_name": stockName[i].value, 
                          "stock_count": stockCount[i].value,
                          "stock_amount": stockAmount[i].value })
    }
    
    this.portfolio.title = this.title.value;
    this.portfolio.content = content;
    this.portfolio.stock = this.stockInfo;

    console.log(this.portfolio);
    this.api.postPortfolio(this.portfolio);
    
  }
}

export default PortfolioView;