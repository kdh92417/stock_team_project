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
      if (stockName[i].value !== '' && stockCount[i].value !== '' && stockAmount[i].value !== '') {
        this.stockInfo.push({ "stock_name": stockName[i].value, 
                          "stock_count": stockCount[i].value,
                          "stock_amount": stockAmount[i].value })
      }
    }
    
    this.portfolio.title = this.title.value;
    this.portfolio.content = content;
    this.portfolio.stock = this.stockInfo;

    this.isValidTitle(this.title.value, stockName, stockCount, stockAmount);

    console.log(stockName[0].value)
    console.log(this.portfolio);
    
  }

  isValidTitle(title, stockName, stockCount, stockAmount) {
    try{
      if (title === '') {
        throw "제목을 입력해주세요";
      } else this.isValidStockName(stockName, stockCount, stockAmount)
    } catch (error) {
      alert(error);
    }
    
  }

  isValidStockName(stockName, stockCount, stockAmount) {
    for (let i = 0; i < stockName.length; i++) {
      try {
        if (stockName[i].value === "") {
          throw "기업명을 입력해주세요"
        } else this.isValidCount(stockCount, stockAmount)
      } catch (error) {
        alert(error);
      }
    }
  }

  isValidCount(stockCount, stockAmount) {
    for (let i = 0; i < stockCount.length; i++) {
      try {
        if (stockCount[i].value === "") {
          throw "주식 수량을 입력해주세요"
        } else this.isValidAmount(stockAmount)
      } catch (error) {
        alert(error);
      }
    }
  }

  isValidAmount(stockAmount) {
    for (let i = 0; i < stockAmount.length; i++) {
      try {
        if (stockAmount[i].value === "") {
          throw "주식 가격을 입력해주세요"
        } 
        else this.api.postPortfolio(this.portfolio);
      } catch (error) {
        alert(error);
      } 
    }
  }

  

}

export default PortfolioView;