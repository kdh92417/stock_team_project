class PortfolioView {
  constructor(api) {
    this.api = api;
    this.portfolio = {};
    this.title = document.getElementById("title");
    this.stockInfo = [];
    this.content = $("#summernote").summernote("code");
    this.submitBtn = document.querySelector(".submit-portfolio");
  }

  submitPortfolio() {
    this.submitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.saveContent();
    });
  }

  saveContent() {
    let summernoteContent = $($("#summernote").summernote("code")).text();
    this.getPortfolioInfo(summernoteContent);
  }

  getPortfolioInfo(content) {
    let stockName = document.querySelectorAll(".stock-name");
    let stockCount = document.querySelectorAll(".stock-count");
    let stockAmount = document.querySelectorAll(".stock-amount");

    if(this.isDataValid(this.title.value, stockName, stockCount, stockAmount) === true) {
      for (let i = 0; i < stockName.length; i++) {
        this.stockInfo.push({
          stock_name: stockName[i].value,
          stock_count: stockCount[i].value,
          stock_amount: stockAmount[i].value,
        });
      }
  
        this.portfolio.title = this.title.value;
        this.portfolio.content = content;
        this.portfolio.stock = this.stockInfo;

        this.api.postPortfolio(this.portfolio);
    }
  }

  isDataValid(title, stockName, stockCount, stockAmount) {
    const regex = /^[0-9]*$/;

    try {
      if (title === "") {
        throw "제목을 입력해주세요.";
      }
      
      for (let i = 0; i < stockName.length; i++) {
        if (stockName[i].value === '') {
          throw "기업명을 입력해주세요."
        } else if (stockCount[i].value === '' || !regex.test(stockCount[i].value)) {
          throw "올바른 주식 수량을 입력해주세요."
        } else if (stockAmount[i].value === '' || !regex.test(stockAmount[i].value)) {
          throw "올바른 주식 가격을 입력해주세요."
        } 
      }

      return true;

    } catch (error) { 
      alert(error);
      return false;
    } 
  }
}

export default PortfolioView;