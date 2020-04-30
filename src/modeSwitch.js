export default function switchModeInstructions(mode) {
  let geistInstructions = "Geist Instructions\r\n \r\n...use SPACE to open an input space on the canvas\r\n \r\n...type to provide a discursive unit of text: reference or response\r\n \r\n...use ENTER to emit the input into the discourse\r\n \r\n...or use ESCAPE to remove yourself from the situation"
  let relationsInstructions = "Relations Instructions\r\n \r\n...MOUSECLICK on two discourse units to manifest a relation between them"
  let element = document.getElementById('instructions')
  switch (mode) {
    case 1:
      element.textContent = geistInstructions
      break;
    case 2:
      element.textContent = relationsInstructions
      break;
    default:
      element.textContent = ""
  }
}
