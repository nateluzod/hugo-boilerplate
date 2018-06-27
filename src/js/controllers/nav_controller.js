// Nav controller
import { Controller } from "stimulus"

export default class extends Controller {

  static targets = [ "menu", "trigger" ] 
  
  toggle(e) {
    e.preventDefault()
    this.menuTarget.classList.toggle("active")
    this.triggerTarget.classList.toggle("is-active")
  }
}