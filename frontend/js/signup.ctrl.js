class Controller {
  constructor(view) {
    console.log(view);
    this.view = view
    console.log(this.view.signUp());
    this.view.signUp();
  }
}

export default Controller;