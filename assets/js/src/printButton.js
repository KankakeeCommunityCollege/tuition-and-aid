const btn = document.getElementById('printButton');

function printButton() {
  btn.addEventListener('click', () => {
    window.print();
  });
}

export default printButton;
